// Proxy the public-domain Einstein portrait from Wikimedia Commons
// so the client can load it without CORS issues for PDF generation.
// Source: https://commons.wikimedia.org/wiki/File:Albert_Einstein_Head.jpg
// Licence: public domain (1921 photograph)
export async function GET() {
  try {
    const url =
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg";
    const upstream = await fetch(url, { next: { revalidate: 86400 } });
    if (!upstream.ok) {
      return new Response("upstream error", { status: 502 });
    }
    const buffer = await upstream.arrayBuffer();
    return new Response(buffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch {
    return new Response("fetch failed", { status: 502 });
  }
}
