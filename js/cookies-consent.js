document.addEventListener('alpine:init', () => {
    Alpine.data('cookieConsent', () => ({
        consentGiven: false,
        showSettings: false,
        cookies: {
            necessary: true,  // vždy zapnuto
            analytics: false,
            marketing: false
        },
        
        init() {
            // Načtení existujícího nastavení z localStorage
            const savedConsent = localStorage.getItem('cookieConsent');
            if (savedConsent) {
                try {
                    const savedSettings = JSON.parse(savedConsent);
                    this.consentGiven = true;
                    if (savedSettings.analytics !== undefined) this.cookies.analytics = savedSettings.analytics;
                    if (savedSettings.marketing !== undefined) this.cookies.marketing = savedSettings.marketing;
                    
                    this.applySettings();
                } catch(e) {
                    console.error('Chyba při načítání nastavení cookies:', e);
                    localStorage.removeItem('cookieConsent');
                }
            }
        },
        
        acceptAll() {
            this.cookies.analytics = true;
            this.cookies.marketing = true;
            this.saveSettings();
        },
        
        acceptNecessary() {
            this.cookies.analytics = false;
            this.cookies.marketing = false;
            this.saveSettings();
        },
        
        saveSettings() {
            this.consentGiven = true;
            this.showSettings = false;
            
            // Uložení nastavení do localStorage
            localStorage.setItem('cookieConsent', JSON.stringify(this.cookies));
            
            // Aplikace nastavení
            this.applySettings();
        },
        
        applySettings() {
            // Tady by se prováděla faktická implementace podle nastavení cookies
            // Například aktivace/deaktivace Google Analytics, Facebook Pixelu, atd.
            
            if (this.cookies.analytics) {
                console.log('Analytické cookies povoleny');
                // Zde by se aktivoval kód pro analytické cookies (např. Google Analytics)
                this.enableGoogleAnalytics();
            } else {
                console.log('Analytické cookies zakázány');
                // Zde by se deaktivoval kód pro analytické cookies
                this.disableGoogleAnalytics();
            }
            
            if (this.cookies.marketing) {
                console.log('Marketingové cookies povoleny');
                // Zde by se aktivoval kód pro marketingové cookies (např. Facebook Pixel)
                this.enableMarketingCookies();
            } else {
                console.log('Marketingové cookies zakázány');
                // Zde by se deaktivoval kód pro marketingové cookies
                this.disableMarketingCookies();
            }
        },
        
        // Přidané metody pro konkrétní implementaci cookies
        enableGoogleAnalytics() {
            // Kód pro aktivaci Google Analytics
            // Příklad:
            if (typeof window.dataLayer !== 'undefined') {
                window.dataLayer = window.dataLayer || [];
                function gtag() { dataLayer.push(arguments); }
                gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
            }
        },
        
        disableGoogleAnalytics() {
            // Kód pro deaktivaci Google Analytics
            // Příklad:
            if (typeof window.dataLayer !== 'undefined') {
                window.dataLayer = window.dataLayer || [];
                function gtag() { dataLayer.push(arguments); }
                gtag('consent', 'update', {
                    'analytics_storage': 'denied'
                });
            }
        },
        
        enableMarketingCookies() {
            // Kód pro aktivaci marketingových cookies
            // Příklad pro Facebook Pixel:
            if (typeof fbq !== 'undefined') {
                fbq('consent', 'grant');
            }
        },
        
        disableMarketingCookies() {
            // Kód pro deaktivaci marketingových cookies
            // Příklad pro Facebook Pixel:
            if (typeof fbq !== 'undefined') {
                fbq('consent', 'revoke');
            }
        }
    }));
});
