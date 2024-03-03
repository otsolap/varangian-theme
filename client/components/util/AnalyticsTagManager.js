import { useContext } from 'react';
import Script from 'next/script';
import { GlobalContext } from '@/pages/_app.js'; 

const AnalyticsTagManager = () => {
  const { globalData } = useContext(GlobalContext);
  const { analytics } = globalData;
  const AnalyticsTagManagerURL = analytics.data.attributes.analyticsTagManagerURL || '';

  if(!AnalyticsTagManagerURL) return null;

  return (
    <Script 
      id="analytics-tag-manager"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var _mtm = window._mtm = window._mtm || [];
          _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
          (function() {
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src=\`${AnalyticsTagManagerURL}\`; s.parentNode.insertBefore(g,s);
          })();
        `,
      }}
    />
  );
};

export default AnalyticsTagManager;