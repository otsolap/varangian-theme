import Script from 'next/script';

const AnalyticsTagManager = () => {
  return (
    <Script 
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var _mtm = window._mtm = window._mtm || [];
          _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
          (function() {
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src='https://cdn.matomo.cloud/your-matomo-domain/container_your-container-id.js'; s.parentNode.insertBefore(g,s);
          })();
        `,
      }}
    />
  );
};

export default AnalyticsTagManager;
