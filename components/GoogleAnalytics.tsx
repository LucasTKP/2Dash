import React from 'react';
import Script from 'next/script';

export default function GoogleAnalytics() {
    const gaTagID = process.env.GA_MEASUREMENT_ID;

    return (
        <div className="container">
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaTagID}`} />
            <Script id="google-analytics">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
            
                    gtag('config', ${gaTagID});
                `}
            </Script>
        </div>
    )
}
