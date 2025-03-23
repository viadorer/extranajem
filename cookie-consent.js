document.addEventListener('DOMContentLoaded', function() {
    // Kontrola, zda uživatel již dal souhlas s cookies
    if (localStorage.getItem('cookieConsent') !== 'true') {
        // Pokud ne, zobrazit banner
        showCookieConsent();
    }
});

function showCookieConsent() {
    // Vytvoření banneru
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.className = 'fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-4 px-6 shadow-lg z-[200]';
    
    // Obsah banneru
    banner.innerHTML = `
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div class="mb-4 md:mb-0 text-center md:text-left">
                <p class="text-sm md:text-base">
                    Tento web používá cookies pro zlepšení vaší uživatelské zkušenosti a analytiku návštěvnosti. 
                    <a href="/cookies.html" class="text-blue-400 hover:text-blue-300 underline">Více informací</a>
                </p>
            </div>
            <div class="flex space-x-4">
                <button id="cookie-accept" class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors text-sm md:text-base">
                    Souhlasím
                </button>
                <button id="cookie-decline" class="bg-transparent border border-gray-500 hover:border-white text-white py-2 px-4 rounded transition-colors text-sm md:text-base">
                    Odmítnout
                </button>
            </div>
        </div>
    `;
    
    // Přidání banneru do stránky
    document.body.appendChild(banner);
    
    // Event Listenery
    document.getElementById('cookie-accept').addEventListener('click', function() {
        acceptCookies();
        hideCookieBanner();
    });
    
    document.getElementById('cookie-decline').addEventListener('click', function() {
        declineCookies();
        hideCookieBanner();
    });
}

function acceptCookies() {
    // Uložit informaci o souhlasu
    localStorage.setItem('cookieConsent', 'true');
    
    // Povolit Google Analytics
    window['ga-disable-G-CEGZ6Y8BJW'] = false;
}

function declineCookies() {
    // Uložit informaci o odmítnutí
    localStorage.setItem('cookieConsent', 'false');
    
    // Zakázat Google Analytics
    window['ga-disable-G-CEGZ6Y8BJW'] = true;
}

function hideCookieBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
        banner.remove();
    }
}
