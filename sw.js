const CACHE_NAME = 'tryhardz-v1';
const ASSETS = ["/", "/index.html", "/7_gemini_science20_P2_Chemistry&Physics.html", "/7_MATH_algebraRules.html", "/7_gemini_ela100.html", "/0_new_7_MATH_SingleEquation.html", "/7_MATH_geometryMasteryAll.html", "/0_new_7_MATH_OrderOfOperations_improved.html", "/7_MATH_words2math_1.html", "/0_new_7_MATH_Exponents.html", "/7_MATH_fast 1.html", "/7_gemini_science20_P1_PhysicalScience&Biology.html", "/7_MATH_fast 2.html", "/0_new_7_MATH_systemEquations_noHack.html", "/Calculators/DESMOS.html", "/Calculators/RPN Calculator.html", "/reading/READING_Literature 21-30.html", "/reading/READING_Literature 11-20.html", "/reading/READING_Literature 1-10.html", "/reading/READING_Informational Text 11-20 Science Edition.html", "/reading/READING_Informational Text 21-30 Animal Edition.html", "/reading/READING_Informational Text 1-10.html", "/6_MATH/6_MATH_words2math_1.html", "/6_MATH/6_MATH_1_EASY_OrderOfOperations_GEN5.html", "/6_MATH/6_MATH_algebra2_1.html", "/6_MATH/6_MATH_algebra3_1.html", "/6_MATH/6_MATH_geometryBasicAll_2.html", "/6_MATH/6_MATH_geometryMasteryAll_1.html", "/6_MATH/6_MATH_prob&stats 1.html"];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return Promise.all(
                ASSETS.map(url => {
                    return cache.add(url).catch(err => {
                        console.warn('Failed to cache during installation:', url, err);
                    });
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    
    event.respondWith(
        fetch(event.request).then(response => {
            // Cache files dynamically on the fly to protect against any build inconsistencies
            if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseClone);
                });
            }
            return response;
        }).catch(() => {
            return caches.match(event.request);
        })
    );
});
