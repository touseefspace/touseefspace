import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type?: string;
  slug?: string | { current?: string };
};

const TAG_MAP: Record<string, string> = {
  project: "projects",
  experience: "experiences",
  post: "posts",
  skillCategory: "skill-categories",
  socialLink: "social-links",
  homePage: "home-global",
};

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid signature" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!body?._type) {
      return new NextResponse(
        JSON.stringify({ message: "Missing _type in payload" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const _type = body._type;
    const slug = typeof body.slug === "string" ? body.slug : body.slug?.current;
    const revalidatedTags: string[] = [];
    const revalidatedPaths: string[] = [];

    // 1. Revalidate relevant cache tag
    const tag = TAG_MAP[_type];
    if (tag) {
      revalidateTag(tag, { expire: 0 });
      revalidatedTags.push(tag);
    }

    // 2. Revalidate paths
    // Home page relies on projects, experiences, skills, and homePage data
    revalidatePath("/");
    revalidatedPaths.push("/");

    if (_type === "project") {
      revalidatePath("/projects");
      revalidatedPaths.push("/projects");
      if (slug) {
        revalidatePath(`/projects/${slug}`);
        revalidatedPaths.push(`/projects/${slug}`);
      }
    } else if (_type === "post") {
      revalidatePath("/blog");
      revalidatedPaths.push("/blog");
      if (slug) {
        revalidatePath(`/blog/${slug}`);
        revalidatedPaths.push(`/blog/${slug}`);
      }
    } else if (_type === "experience") {
      revalidatePath("/experiences");
      revalidatedPaths.push("/experiences");
    } else if (_type === "skillCategory") {
      revalidatePath("/skills");
      revalidatedPaths.push("/skills");
    }

    return NextResponse.json({
      revalidated: true,
      tags: revalidatedTags,
      paths: revalidatedPaths,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[Webhook Error]", err);
    return new NextResponse(
      JSON.stringify({ message: (err as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
