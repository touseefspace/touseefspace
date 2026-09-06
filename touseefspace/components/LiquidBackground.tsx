"use client";

import React, { useEffect, useRef, useState } from "react";

export interface LiquidBackgroundProps {
  /** Master intensity multiplier for the wave contrast (0.5 - 2.0). Default: 1.0 */
  intensity?: number;
  /** Speed of continuous ambient fluid motion. Default: 0.22 */
  speed?: number;
  /** Whether the background is fixed to the viewport or absolute. Default: true */
  fixed?: boolean;
  /** Optional custom CSS classes */
  className?: string;
}

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 v_uv;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_theme;     // 0.0 = light mode, 1.0 = dark mode
uniform float u_intensity;
uniform float u_speed;

// Organic harmonic fluid wave generating visible, silky liquid currents
float getLiquidWave(vec2 p, float t) {
  vec2 q = p;
  
  // Layer 1: Broad oceanic swell
  float w1 = sin(q.x * 1.35 + t * 0.50) * cos(q.y * 1.20 + t * 0.42);
  
  // Layer 2: Warped cross-current
  vec2 warp1 = vec2(
    sin(q.y * 1.70 + t * 0.55 + w1 * 1.5),
    cos(q.x * 1.50 - t * 0.48 + w1 * 1.5)
  );
  float w2 = sin(dot(q + warp1 * 0.5, vec2(1.25, 0.95)) + t * 0.70);
  
  // Layer 3: Silky fluid ribbons
  vec2 warp2 = vec2(
    cos(q.x * 2.30 + t * 0.42 - warp1.y),
    sin(q.y * 2.00 + t * 0.46 + warp1.x)
  );
  float w3 = sin((q.x + warp2.x * 0.4) * 1.9 + (q.y + warp2.y * 0.4) * 1.5 + t * 0.60);

  return (w1 * 0.45 + w2 * 0.38 + w3 * 0.22);
}

void main() {
  vec2 uv = v_uv;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = uv;
  p.x *= aspect;

  float t = u_time * u_speed;

  // Compute fluid surface height
  float h = getLiquidWave(p * 1.25, t);
  
  // Gradient estimation for specular sheen and crest contours
  float eps = 0.025;
  float hx = getLiquidWave((p + vec2(eps, 0.0)) * 1.25, t);
  float hy = getLiquidWave((p + vec2(0.0, eps)) * 1.25, t);
  vec2 normal2D = vec2(hx - h, hy - h) / eps;
  
  // Specular sheen along fluid ridges
  vec3 lightDir = normalize(vec3(0.35, 0.65, 0.70));
  vec3 surfaceNorm = normalize(vec3(-normal2D * 1.4, 1.0));
  float specular = pow(clamp(dot(surfaceNorm, lightDir), 0.0, 1.0), 3.0);
  float slope = clamp(length(normal2D), 0.0, 1.0);

  // Normalized wave factor [0.0, 1.0]
  float wave = clamp(h * 0.5 + 0.5, 0.0, 1.0);

  // ==========================================
  // DARK MODE PALETTE
  // Deep luxury obsidian with distinctly visible smoky-silver fluid ribbons
  // ==========================================
  vec3 darkBase   = vec3(0.025, 0.025, 0.028); // #060607 (very deep true black)
  vec3 darkSwell  = vec3(0.055, 0.060, 0.075); // #0e0f13 (barely-there midnight body)
  vec3 darkCrest  = vec3(0.120, 0.140, 0.180); // #2e333d (soft, refined luminous crest)

  
  vec3 darkColor = mix(darkBase, darkSwell, wave * u_intensity);
  darkColor += darkCrest * ((specular * 0.55 + slope * 0.28) * u_intensity);

  // ==========================================
  // LIGHT MODE PALETTE
  // Crisp pearl white with distinctly visible cool-silver liquid ripples
  // ==========================================
  vec3 lightBase   = vec3(0.985, 0.985, 0.988); // #fbfbfc clean pearl base
  vec3 lightTrough = vec3(0.700, 0.730, 0.780); // #ccd4e0 visible soft silver-blue liquid flow
  vec3 lightCrest  = vec3(1.000, 1.000, 1.000); // pure white specular highlights
  
  vec3 lightColor = mix(lightTrough, lightBase, wave);
  // Soft shading along slopes and gleam on crests for organic liquid silk depth
  lightColor -= vec3(0.09, 0.10, 0.12) * (slope * 0.5 * u_intensity);
  lightColor += (lightCrest - lightColor) * (specular * 0.55 * u_intensity);

  // Seamless cross-fade between light and dark modes
  vec3 finalColor = mix(lightColor, darkColor, clamp(u_theme, 0.0, 1.0));

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export default function LiquidBackground({
  intensity = 2.0,
  speed = 1.75,
  fixed = true,
  className = "",
}: LiquidBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  const propsRef = useRef({ intensity, speed });
  useEffect(() => {
    propsRef.current = { intensity, speed };
  }, [intensity, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Feature Detection for WebGL
    const gl = (canvas.getContext("webgl2", { powerPreference: "default", alpha: true }) ||
      canvas.getContext("webgl", { powerPreference: "default", alpha: true }) ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;

    if (!gl) {
      setIsSupported(false);
      return;
    }
    setIsSupported(true);

    // 2. Compile Shaders
    function createShader(type: number, source: string) {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error("LiquidBackground shader error:", gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("LiquidBackground program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // 3. Fullscreen Quad Geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // 4. Cache Uniform Locations
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uTheme = gl.getUniformLocation(program, "u_theme");
    const uIntensity = gl.getUniformLocation(program, "u_intensity");
    const uSpeed = gl.getUniformLocation(program, "u_speed");

    // 5. Robust Theme Synchronization
    const getTargetTheme = () => {
      const themeAttr = document.documentElement.getAttribute("data-theme");
      if (themeAttr === "light") return 0.0;
      if (themeAttr === "dark") return 1.0;
      return window.matchMedia("(prefers-color-scheme: light)").matches ? 0.0 : 1.0;
    };

    let targetTheme = getTargetTheme();
    let currentTheme = targetTheme;

    const onThemeChange = () => {
      targetTheme = getTargetTheme();
    };

    const themeObserver = new MutationObserver(onThemeChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    window.addEventListener("theme-change", onThemeChange);
    const mediaQueryDark = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQueryDark.addEventListener("change", onThemeChange);

    // 6. Responsive Resize with Resolution Optimization
    const resizeCanvas = () => {
      if (!canvas) return;
      const width = window.innerWidth || canvas.clientWidth;
      const height = window.innerHeight || canvas.clientHeight;
      if (width === 0 || height === 0) return;

      const scale = Math.min(0.65, 1080 / Math.max(width, 1));
      const displayWidth = Math.max(320, Math.floor(width * scale));
      const displayHeight = Math.max(180, Math.floor(height * scale));

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(document.documentElement);
    resizeCanvas();

    // 7. Reduced motion check
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReducedMotion = motionQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // 8. Animation Loop
    let animationFrameId: number | null = null;
    let startTime = performance.now();
    let isRunning = false;

    const render = (now: number) => {
      // Smooth theme cross-fade
      currentTheme += (targetTheme - currentTheme) * 0.18;
      if (Math.abs(currentTheme - targetTheme) < 0.004) {
        currentTheme = targetTheme;
      }

      // If reduced motion is requested, use very slow serene drift rather than freezing theme transitions
      const elapsedSeconds = isReducedMotion
        ? (now - startTime) * 0.0001
        : (now - startTime) * 0.001;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsedSeconds);
      gl.uniform1f(uTheme, currentTheme);

      const { intensity: curIntensity, speed: curSpeed } = propsRef.current;
      gl.uniform1f(uIntensity, curIntensity);
      gl.uniform1f(uSpeed, curSpeed);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (isRunning) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const startLoop = () => {
      if (!isRunning && !document.hidden) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      isRunning = false;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    let idleId: any = null;
    let timerId: any = null;

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = (window as any).requestIdleCallback(
        () => {
          startLoop();
        },
        { timeout: 350 }
      );
    } else {
      timerId = setTimeout(startLoop, 150);
    }

    // 9. Cleanup
    return () => {
      if (idleId && typeof window !== "undefined" && "cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(idleId);
      }
      if (timerId) {
        clearTimeout(timerId);
      }
      stopLoop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionQuery.removeEventListener("change", handleMotionChange);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("theme-change", onThemeChange);
      mediaQueryDark.removeEventListener("change", onThemeChange);

      if (gl) {
        gl.deleteBuffer(positionBuffer);
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
      }
    };
  }, []);

  if (isSupported === false) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`${
        fixed ? "fixed inset-0" : "absolute inset-0"
      } z-0 pointer-events-none overflow-hidden select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full block"
        style={{
          opacity: isSupported ? 1 : 0,
          transition: "opacity 0.4s ease",
          imageRendering: "auto",
        }}
      />
    </div>
  );
}
