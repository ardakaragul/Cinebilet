# Web Frontend Görev Dağılımı

**Web Frontend Adresi:** [https://cinebilet.netlify.app](https://cinebilet.netlify.app)

Bu dokümanda, web uygulamasının kullanıcı arayüzü (UI) ve kullanıcı deneyimi (UX) görevleri listelenmektedir. Görevler doğrudan ana [Gereksinim Analizi](Gereksinim-Analizi.md) dokümanında belirlenen maddelere göre bölüşülmüş ve her bir üyenin sorumlulukları kendi özel sayfasında frontend detaylarıyla analiz edilmiştir.

---

## Grup Üyelerinin Web Frontend Görevleri

1. [Mevlüt Arda Karagül'ün Web Frontend Görevleri](Mevlut-Arda-Karagul/Mevlut-Arda-Karagul-Web-Frontend-Gorevleri.md)
2. [Arda Yılmaz'ın Web Frontend Görevleri](Arda-Yilmaz/Arda-Yilmaz-Web-Frontend-Gorevleri.md)


---

## Genel Web Frontend Prensipleri

### 1. Responsive Tasarım
- **Mobile-First Approach:** Önce mobil tasarım, sonra desktop
- **Breakpoints:** - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Flexible Layouts:** CSS Grid ve Flexbox kullanımı
- **Responsive Images:** srcset ve sizes attributes
- **Touch-Friendly:** Minimum 44x44px touch targets

### 2. Tasarım Sistemi
- **CSS Framework:** Proje gereksinimlerine göre custom CSS, Bootstrap veya Tailwind CSS
- **Renk Paleti:** Tutarlı renk kullanımı (CSS variables)
- **Tipografi:** Web-safe fonts veya web fonts (Google Fonts)
- **Spacing:** Tutarlı padding ve margin değerleri (8px grid sistemi)
- **Iconography:** Icon library (Font Awesome, Material Icons vb.)
- **Component Library:** Yeniden kullanılabilir (Reusable) UI bileşenleri

### 3. Performans Optimizasyonu
- **Code Splitting:** Route-based ve component-based splitting
- **Lazy Loading:** Görseller, bileşenler ve route'lar için asenkron yükleme
- **Minification:** CSS ve JavaScript kodlarının küçültülmesi
- **Compression:** Gzip/Brotli compression
- **Caching:** Tarayıcı önbellekleme (Browser caching)
- **Bundle Size:** Gereksiz kodların temizlenmesi (Dead code elimination)

### 4. SEO (Search Engine Optimization)
- **Meta Tags:** Title, description, keywords
- **Structured Data:** JSON-LD schema markup
- **Semantic HTML:** Doğru HTML5 anlamsal (semantic) etiketleri
- **Alt Text:** Görseller için açıklayıcı alt attributes
- **Sitemap:** XML sitemap oluşturma

### 5. Erişilebilirlik (Accessibility)
- **WCAG 2.1 AA Compliance:** Minimum erişilebilirlik standartları
- **Keyboard Navigation:** Tab order, focus yönetimi
- **Screen Reader Support:** ARIA etiketleri ve rolleri
- **Color Contrast:** Minimum 4.5:1 kontrast oranı
- **Focus Indicators:** Görünür focus durumları

### 6. Browser Compatibility (Tarayıcı Uyumluluğu)
- **Modern Browsers:** Chrome, Firefox, Safari, Edge (son versiyonlar)
- **Polyfills:** ES6+ özellikleri için gerekli destekler
- **CSS Prefixes:** Autoprefixer kullanımı
- **Feature Detection:** Modern tarayıcı özellik tespiti
- **Graceful Degradation:** Eski tarayıcılar için yedek (fallback) senaryoları

### 7. State Management (Durum Yönetimi)
- **Local State:** DOM element durumları, gizleme/gösterme (Modal states)
- **Client State:** LocalStorage ve SessionStorage ile oturum ve sepet yönetimi
- **Server State:** Fetch API ile sunucudan çekilen verilerin DOM'a entegrasyonu

### 8. Routing (Yönlendirme)
- **Client-Side Routing:** Tek sayfa uygulaması (SPA) mantığıyla div manipülasyonu
- **Protected Routes:** LocalStorage token kontrolü ile yönetici ve kullanıcı sınırlandırması
- **History Management:** Tarayıcı geçmişi yönetimi

### 9. API Entegrasyonu
- **HTTP Client:** Modern Fetch API (async/await mimarisi)
- **Request Headers:** JSON body ve authorization payload'ları
- **Error Handling:** Try-catch bloklarıyla merkezi hata yönetimi ve kullanıcıya Alert/Toast bildirimi
- **Loading States:** Veri çekilirken "Yükleniyor..." göstergeleri

### 10. Testing (Test Süreçleri)
- **Unit Tests:** Fonksiyon ve bileşen testleri
- **Integration Tests:** DOM etkileşimleri ve API entegrasyon testleri
- **E2E Tests:** Kullanıcı senaryolarının uçtan uca test edilmesi

### 11. Build ve Deployment
- **Environment Variables:** API URL'leri için çevre değişkenleri yönetimi
- **Version Control:** Git ve GitHub ile takım çalışması (Branching & Merging)
- **Hosting:** Netlify (Frontend) ve Render (Backend) entegrasyonu