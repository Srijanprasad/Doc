import { Helmet } from "react-helmet-async";

const SITE_NAME = "Srijan Prasad";

function SEO({
  title,
  description,
  keywords = [],
  type = "website",
  image,
  canonicalPath,
  structuredData,
  noIndex = false,
}) {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
  ).replace(/\/$/, "");
  const canonicalUrl = `${siteUrl}${canonicalPath || window.location.pathname}`;
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const safeStructuredData = structuredData
    ? JSON.stringify(structuredData).replace(/</g, "\\u003c")
    : null;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="description" content={description || ""} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <meta name="author" content={SITE_NAME} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description || ""} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Srijanprasad" />
      <meta name="twitter:creator" content="@Srijanprasad" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description || ""} />
      {image && <meta name="twitter:image" content={image} />}
      {safeStructuredData && (
        <script type="application/ld+json">{safeStructuredData}</script>
      )}
    </Helmet>
  );
}

export default SEO;
