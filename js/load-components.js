// Debug funkce pro více informací v konzoli
function debug(message) {
    console.log('%c[Component Loader] ' + message, 'background: #f0f0f0; color: #333; padding: 2px 4px; border-radius: 2px;');
}

// Funkce pro načtení HTML komponent
document.addEventListener('DOMContentLoaded', function() {
    debug('DOM je načtený, začínám načítat komponenty');
    
    // Kontrola kontejnerů
    const navContainer = document.getElementById('navigation-container');
    const footerContainer = document.getElementById('footer-container');
    
    if (!navContainer) {
        console.error('Kontejner pro navigaci (navigation-container) nebyl nalezen!');
    } else {
        debug('Navigation container nalezen');
    }
    
    if (!footerContainer) {
        console.error('Kontejner pro patičku (footer-container) nebyl nalezen!');
    } else {
        debug('Footer container nalezen');
    }
    
    // Pomocná funkce pro načítání komponent
    function loadComponent(url, containerId, callback) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Kontejner ' + containerId + ' neexistuje!');
            return;
        }
        
        debug('Načítám komponentu: ' + url + ' do kontejneru: ' + containerId);
        
        const xhr = new XMLHttpRequest();
        
        // Zkušební cesty - zkusíme absolutní i relativní
        url = url; // Odstraníme './' pro použití absolutní cesty
        
        debug('Používám cestu: ' + url);
        xhr.open('GET', url, true);
        
        xhr.onreadystatechange = function() {
            debug('XHR stav změněn na: ' + xhr.readyState + ', status: ' + (xhr.readyState === 4 ? xhr.status : 'ještě neznámý'));
            
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    debug('Komponenta úspěšně načtena: ' + url);
                    container.innerHTML = xhr.responseText;
                    debug('Obsah vložen do kontejneru: ' + containerId);
                    
                    if (callback) {
                        debug('Volám callback pro: ' + containerId);
                        callback();
                    }
                } else {
                    console.error('Chyba při načítání komponenty z ' + url + ': ' + xhr.status);
                    // Zobrazit chybovou hlášku přímo v kontejneru pro lepší viditelnost problému
                    container.innerHTML = '<div style="padding: 20px; background: #f8d7da; color: #721c24; border-radius: 5px;">' +
                        '<h3>Chyba při načítání komponenty</h3>' +
                        '<p>Nepodařilo se načíst: ' + url + '</p>' +
                        '<p>Status: ' + xhr.status + '</p>' +
                        '</div>';
                }
            }
        };
        
        xhr.send();
    }
    
    // Načtení navigace
    loadComponent('/components/nav.html', 'navigation-container', function() {
        debug('Navigace načtena, kontroluji Alpine.js');
        
        // Spuštění Alpine.js po načtení navigace
        if (typeof Alpine !== 'undefined') {
            debug('Alpine.js je definován, hledám nav element pro inicializaci');
            // Najdeme navigaci a znovu inicializujeme Alpine.js prvky
            const navElement = document.querySelector('#navigation-container nav');
            
            if (navElement && navElement.hasAttribute('x-data')) {
                debug('Nav element s x-data nalezen, pokus o inicializaci Alpine.js');
                
                if (typeof Alpine.initTree === 'function') {
                    debug('Volám Alpine.initTree()');                    
                    Alpine.initTree(navElement);
                    debug('Alpine.initTree() dokončeno');
                } else {
                    debug('Alpine.js je načten, ale nemá metodu initTree. Dostupné metody Alpine: ' + 
                          Object.keys(Alpine).join(', '));
                }
            } else {
                debug('Nav element s x-data nebyl nalezen nebo nemá atribut x-data!');
                if (navElement) {
                    debug('Nav element existuje, ale nemá x-data atribut.');
                } else {
                    debug('Nav element vůbec neexistuje!');
                }
            }
        } else {
            console.error('Alpine.js není definován! Nav menu nebude plně funkční.');
        }
    });

    // Načtení patičky
    loadComponent('/components/footer.html', 'footer-container');
    
    debug('Inicializace komponent dokončena');
});
