// export default withAuth({
//   pages: {
//     signIn: "/auth/signin",
//   },
// });

import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  // Get pathname of request (e.g. /blog-slug)
  const { pathname } = req.nextUrl;
  // Get hostname of request (e.g. demo.vercel.pub)
  const hostname = req.headers.get("host");
  if (!hostname)
    return new Response(null, {
      status: 400,
      statusText: "No hostname found in request headers",
    });
  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname
          .replace(`.reetail-store-app.vercel.app`, "")
          .replace(`.reetail.store`, "")
      : hostname.replace(`.localhost:3000`, "");
  console.log({ currentHost });
  if (currentHost === "app") {
    // url.hostname = `localhost:3000${pathname}`;
    // return NextResponse.rewrite(url);
    return NextResponse.next();
  }
  if (
    !pathname.includes(".") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/stores")
  ) {
    console.log({ pathname }, { hostname });
    url.pathname = `/_stores/${currentHost}${pathname}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.rewrite(url);
}
