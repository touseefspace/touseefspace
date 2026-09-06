import React from "react";

interface BrandIconProps {
  name?: string;
  url?: string;
  size?: number;
  className?: string;
}

function detectNetwork(name?: string, url?: string): string {
  const target = `${name || ""} ${url || ""}`.toLowerCase();
  if (target.includes("whatsapp") || target.includes("wa.me")) return "whatsapp";
  if (target.includes("github")) return "github";
  if (target.includes("linkedin")) return "linkedin";
  if (target.includes("twitter") || target.includes("x.com")) return "x";
  if (target.includes("instagram")) return "instagram";
  if (target.includes("facebook")) return "facebook";
  if (target.includes("mail") || target.includes("@")) return "email";
  return "generic";
}

export function BrandIcon({ name, url, size = 32, className = "" }: BrandIconProps) {
  const network = detectNetwork(name, url);

  switch (network) {
    case "whatsapp":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <circle cx="16" cy="16" r="16" fill="#25D366" />
          <path
            d="M16 6.5C10.76 6.5 6.5 10.76 6.5 16C6.5 17.82 7.02 19.53 7.92 20.98L6.85 24.89L10.89 23.84C12.3 24.69 13.95 25.17 15.7 25.17C20.94 25.17 25.2 20.91 25.2 15.67C25.2 10.43 21.24 6.5 16 6.5ZM20.73 19.51C20.53 20.07 19.74 20.54 19.12 20.67C18.69 20.76 18.14 20.82 16.27 20.04C13.88 19.04 12.33 16.63 12.21 16.47C12.1 16.32 11.23 15.17 11.23 13.97C11.23 12.77 11.84 12.19 12.08 11.94C12.28 11.73 12.61 11.64 12.91 11.64C13.01 11.64 13.1 11.64 13.18 11.65C13.42 11.66 13.54 11.67 13.7 12.05C13.9 12.53 14.39 13.72 14.45 13.84C14.51 13.96 14.57 14.12 14.49 14.28C14.41 14.44 14.34 14.52 14.22 14.66C14.1 14.8 13.98 14.9 13.86 15.05C13.73 15.19 13.6 15.34 13.75 15.6C13.9 15.86 14.42 16.71 15.19 17.4C16.19 18.29 17 18.57 17.29 18.69C17.58 18.81 17.75 18.78 17.92 18.58C18.09 18.38 18.66 17.72 18.87 17.43C19.07 17.14 19.28 17.18 19.56 17.28C19.85 17.38 21.39 18.14 21.71 18.3C22.02 18.45 22.23 18.53 22.31 18.66C22.39 18.79 22.39 19.35 22.19 19.91L20.73 19.51Z"
            fill="white"
          />
        </svg>
      );

    case "github":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <circle cx="16" cy="16" r="16" fill="#181717" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 7C11.03 7 7 11.03 7 16C7 19.98 9.58 23.35 13.16 24.54C13.61 24.62 13.77 24.34 13.77 24.11C13.77 23.9 13.76 23.36 13.76 22.61C11.26 23.15 10.73 21.41 10.73 21.41C10.32 20.37 9.73 20.1 9.73 20.1C8.91 19.54 9.79 19.56 9.79 19.56C10.69 19.62 11.17 20.48 11.17 20.48C11.97 21.85 13.28 21.46 13.79 21.23C13.87 20.65 14.1 20.25 14.36 20.03C12.36 19.8 10.26 19.03 10.26 15.58C10.26 14.6 10.61 13.8 11.19 13.17C11.1 12.94 10.79 12.02 11.28 10.79C11.28 10.79 12.03 10.55 13.75 11.71C14.47 11.51 15.24 11.41 16 11.41C16.76 11.41 17.53 11.51 18.25 11.71C19.97 10.55 20.72 10.79 20.72 10.79C21.21 12.02 20.9 12.94 20.81 13.17C21.39 13.8 21.74 14.6 21.74 15.58C21.74 19.04 19.63 19.8 17.62 20.02C17.95 20.3 18.24 20.86 18.24 21.71C18.24 22.94 18.23 23.93 18.23 24.11C18.23 24.34 18.39 24.63 18.85 24.54C22.42 23.35 25 19.97 25 16C25 11.03 20.97 7 16 7Z"
            fill="white"
          />
        </svg>
      );

    case "linkedin":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <circle cx="16" cy="16" r="16" fill="#0A66C2" />
          <path
            d="M11.67 13.43H9.17V21.5H11.67V13.43ZM10.42 9.5C9.62 9.5 8.97 10.15 8.97 10.95C8.97 11.75 9.62 12.4 10.42 12.4C11.22 12.4 11.87 11.75 11.87 10.95C11.87 10.15 11.22 9.5 10.42 9.5ZM23 17.47C23 14.7 21.52 13.41 19.55 13.41C17.96 13.41 17.25 14.28 16.85 14.9V13.43H14.35C14.38 14.13 14.35 21.5 14.35 21.5H16.85V16.99C16.85 16.75 16.87 16.51 16.94 16.33C17.14 15.83 17.6 15.31 18.37 15.31C19.38 15.31 19.78 16.08 19.78 17.21V21.5H22.28V17.06C22.28 17.2 23 17.33 23 17.47Z"
            fill="white"
          />
        </svg>
      );

    case "x":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <circle cx="16" cy="16" r="16" fill="#000000" />
          <path
            d="M20.9 9.5H22.74L18.72 14.09L23.45 20.35H19.74L16.84 16.55L13.51 20.35H11.67L15.96 15.45L11.45 9.5H15.26L17.88 12.97L20.9 9.5ZM20.25 19.25H21.27L14.7 10.54H13.61L20.25 19.25Z"
            fill="white"
          />
        </svg>
      );

    case "instagram":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="instaGrad" cx="30%" cy="107%" r="150%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="5%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <circle cx="16" cy="16" r="16" fill="url(#instaGrad)" />
          <rect
            x="10"
            y="10"
            width="12"
            height="12"
            rx="3.5"
            stroke="white"
            strokeWidth="1.6"
            fill="none"
          />
          <circle cx="16" cy="16" r="2.8" stroke="white" strokeWidth="1.6" fill="none" />
          <circle cx="19.4" cy="12.6" r="0.8" fill="white" />
        </svg>
      );

    case "facebook":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <circle cx="16" cy="16" r="16" fill="#1877F2" />
          <path
            d="M18.25 16.5H16V24H12.89V16.5H11.41V13.88H12.89V12.18C12.89 10.72 13.58 9 16.32 9L18.59 9.01V11.55H16.94C16.29 11.55 16 11.87 16 12.56V13.88H18.62L18.25 16.5Z"
            fill="white"
          />
        </svg>
      );

    case "email":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <circle cx="16" cy="16" r="16" fill="#EA4335" />
          <path
            d="M10 11.5C9.17 11.5 8.5 12.17 8.5 13V19C8.5 19.83 9.17 20.5 10 20.5H22C22.83 20.5 23.5 19.83 23.5 19V13C23.5 12.17 22.83 11.5 22 11.5H10ZM10 13H22L16 16.75L10 13ZM10 14.54L15.54 18.01C15.82 18.19 16.18 18.19 16.46 18.01L22 14.54V19H10V14.54Z"
            fill="white"
          />
        </svg>
      );

    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <circle cx="16" cy="16" r="16" fill="#374151" />
          <path
            d="M16 10C12.69 10 10 12.69 10 16C10 19.31 12.69 22 16 22C19.31 22 22 19.31 22 16C22 12.69 19.31 10 16 10ZM16 20.5C13.51 20.5 11.5 18.49 11.5 16C11.5 13.51 13.51 11.5 16 11.5C18.49 11.5 20.5 13.51 20.5 16C20.5 18.49 18.49 20.5 16 20.5Z"
            fill="white"
          />
        </svg>
      );
  }
}
