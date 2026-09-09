/** Cloudflare's public site beacon ID, never an account API credential. */
export function enableVisitAnalytics() {
  const token = import.meta.env.VITE_CLOUDFLARE_WEB_ANALYTICS_TOKEN?.trim();
  const productionHosts = new Set(['fountain.lol', 'fountainslop.netlify.app']);
  if (!import.meta.env.PROD || !productionHosts.has(location.hostname) || !token) return;
  if (!/^[a-f0-9]{32}$/i.test(token)) {
    console.warn('Cloudflare Web Analytics: invalid public site token.');
    return;
  }
  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  script.dataset.cfBeacon = JSON.stringify({ token });
  document.head.appendChild(script);
}
