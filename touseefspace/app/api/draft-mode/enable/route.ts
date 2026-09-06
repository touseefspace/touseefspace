import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const returnTo = searchParams.get("returnTo");

  (await draftMode()).enable();

  const redirectUrl = slug || returnTo || "/";
  redirect(redirectUrl);
}
