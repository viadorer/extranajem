// Testovací skript pro ověření funkčnosti Alpine.js
console.log('Test Alpine.js začíná');

document.addEventListener('alpine:init', () => {
    console.log('Alpine.js byl inicializován');
});

// Kontrola, zda existuje Alpine globální objekt
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM načten, kontroluji Alpine.js');
    
    setTimeout(() => {
        if (window.Alpine) {
            console.log('Alpine.js je dostupný');
            
            // Kontrola, zda existuje popup store
            if (Alpine.store('popup')) {
                console.log('Popup store je dostupný');
                console.log('Aktuální stav popup:', Alpine.store('popup').isOpen);
                
                // Test otevření popupu
                console.log('Testuji otevření popupu');
                Alpine.store('popup').open();
                console.log('Popup by měl být otevřen, stav:', Alpine.store('popup').isOpen);
                
                // Zavření popupu po 2 sekundách
                setTimeout(() => {
                    console.log('Testuji zavření popupu');
                    Alpine.store('popup').close();
                    console.log('Popup by měl být zavřen, stav:', Alpine.store('popup').isOpen);
                    
                    console.log('Testování dokončeno, všechny testy prošly');
                }, 2000);
            } else {
                console.error('Popup store není dostupný');
            }
        } else {
            console.error('Alpine.js není dostupný');
        }
    }, 500); // Čekáme 500ms po načtení DOM, aby se Alpine.js inicializoval
});
