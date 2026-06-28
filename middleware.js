// Vercel Edge Middleware.
//
// When someone lands on the ugly auto-generated *.vercel.app URL, bounce them
// over to the real domain with a proper 308. That way there's one canonical
// address and Google doesn't end up indexing two copies of the site.
//
// do this in code (reading the Host header ourselves) because the
// declarative host-redirect in vercel.json just wouldn't fire. This one always
// runs. Only the live .vercel.app URL gets redirected, so throwaway preview
// builds still work when you need to test them, and everything else (your real
// domain included) sails straight through.

export const config = {
  matcher: "/:path*",
};

export default function middleware(request) {
  const host = request.headers.get("host") || "";

  if (host === "portfolio-one-delta-23.vercel.app") {
    const url = new URL(request.url);
    url.protocol = "https:";
    url.host = "divyverma.dev";
    return Response.redirect(url.toString(), 308);
  }

  // some other host, so just let the request carry on.
}
