export const loader = ({ request }) => {
  const url = new URL(request.url);

  return new Response(robotsTxtData({ url: url.origin }), {
    status: 200,
    headers: {
      'content-type': 'text/plain',
      // Cache for 24 hours
      'cache-control': `max-age=${60 * 60 * 24}`,
    },
  });
};

function robotsTxtData({ url }) {
  const sitemapUrl = url ? `${url}/sitemap.xml` : undefined;

  return `
User-agent: *
Disallow: /admin
Disallow: /cart
Disallow: /orders
Disallow: /checkouts/
Disallow: /checkout
Disallow: /account
${sitemapUrl ? `Sitemap: ${sitemapUrl}` : ''}

# Allow Google AdsBot to access all content
User-agent: adsbot-google
Allow: /

User-agent: Pinterest
Crawl-delay: 1
`.trim();
}
