const fallbackSiteUrl = 'https://transferfiles.pro';

function normalizeUrl(url: string) {
  return url.replace(/\/$/, '');
}

export const siteUrl = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl);

export const siteDomain =
  process.env.NEXT_PUBLIC_SITE_DOMAIN || new URL(siteUrl).hostname;

export const analyticsDomain =
  process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN || siteDomain;
