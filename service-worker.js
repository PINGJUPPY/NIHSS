const CACHE_NAME = 'nihss-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

// ติดตั้ง Service Worker และโหลดไฟล์เก็บลง Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// เมื่อมีการดึงข้อมูล ให้เช็ค Cache ก่อน ถ้าไม่มีค่อยวิ่งไปหาเน็ต
self.addEventListener('fetch', event => {
  // ไม่ทำการ Cache การยิง API ไป Google Script
  if (event.request.url.includes('script.google.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // เจอใน Cache คืนค่าเลย, ถ้าไม่เจอวิ่งหา Network
        return response || fetch(event.request);
      })
  );
});
