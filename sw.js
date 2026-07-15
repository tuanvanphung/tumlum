const CACHE_NAME = 'tryhardz-v2';
const ASSETS = ["./", "./index.html", "./7_gemini_science20_P2_Chemistry%26Physics.html", "./7_MATH_algebraRules.html", "./7_gemini_ela100.html", "./0_new_7_MATH_SingleEquation.html", "./7_MATH_geometryMasteryAll.html", "./0_new_7_MATH_OrderOfOperations_improved.html", "./7_MATH_words2math_1.html", "./0_new_7_MATH_Exponents.html", "./7_MATH_fast%201.html", "./7_gemini_science20_P1_PhysicalScience%26Biology.html", "./7_MATH_fast%202.html", "./0_new_7_MATH_systemEquations_noHack.html", "./Calculators/DESMOS.html", "./Calculators/RPN%20Calculator.html", "./reading/READING_Literature%2021-30.html", "./reading/READING_Literature%2011-20.html", "./reading/READING_Literature%201-10.html", "./reading/READING_Informational%20Text%2011-20%20Science%20Edition.html", "./reading/READING_Informational%20Text%2021-30%20Animal%20Edition.html", "./reading/READING_Informational%20Text%201-10.html", "./6_MATH/6_MATH_words2math_1.html", "./6_MATH/6_MATH_1_EASY_OrderOfOperations_GEN5.html", "./6_MATH/6_MATH_algebra2_1.html", "./6_MATH/6_MATH_algebra3_1.html", "./6_MATH/6_MATH_geometryBasicAll_2.html", "./6_MATH/6_MATH_geometryMasteryAll_1.html", "./6_MATH/6_MATH_prob%26stats%201.html"];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return Promise.allSettled(
                ASSETS.map(url => {
                    return fetch(url).then(response => {
                        if (response.ok) return cache.put(url, response);
                    }).catch(err => console.error('Cache error:', url, err));
                })
            );
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        ))
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Dynamically cache successful requests so you never lose files you've opened
                const resClone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
                return response;
            })
            .catch(() => {
                return caches.match(event.request);
            })
    );
});
