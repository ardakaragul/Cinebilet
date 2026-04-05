# Mevlüt Arda Karagül'ün Web Frontend Görevleri 

**Front-end Test Videosu:** [Youtube Videosu](https://www.youtube.com/watch?v=YkrriPNrKkQ)

Bu dokümanda Mevlüt Arda Karagül'ün sorumluluğunda olan yönetici (admin) arayüzüne ait sistem yapılandırmaları, veri yönetimi ve UI bileşenleri detaylandırılmıştır. 

## 1. Film Ekleme Ekranı
- **Gereksinim:** `POST /movies` entegrasyonu.
- **UI Bileşenleri:** Film Adı, Yönetmen, Süre (Dakika) ve Afiş URL'si için özel input alanları barındıran yönetici formu.
- **Kullanıcı Deneyimi:** Form başarıyla gönderildikten sonra yöneticiye anlık geri bildirim sunulması (Alert), form alanlarının otomatik temizlenmesi (`event.target.reset()`) ve film listesinin anında güncellenmesi.
- **Teknik Detaylar:** `fetch` API ile asenkron (`async/await`) veri gönderimi ve `application/json` formatında payload yapılandırması.

## 2. Filmleri Listeleme
- **Gereksinim:** `GET /movies` entegrasyonu.
- **UI Bileşenleri:** Dinamik olarak oluşturulan, filmin adını, süresini ve yönetim butonlarını barındıran liste elemanları.
- **Kullanıcı Deneyimi:** Yönetici panelinin açılışında asenkron verilerin "Yükleniyor..." bildiriminden sonra yumuşak bir şekilde DOM'a enjekte edilmesi.
- **Teknik Detaylar:** Backend'den gelen veri dizisinin `forEach` döngüsü ile taranıp, Template Literaller kullanılarak HTML içerisine aktarılması.

## 3. Film Bilgilerini Güncelleme
- **Gereksinim:** `PUT /movies/:movieId` entegrasyonu.
- **UI Bileşenleri:** "Düzenle" butonuna tıklandığında tetiklenen, tarayıcı tabanlı yerleşik veri alma pencereleri (`prompt`).
- **Kullanıcı Deneyimi:** Yöneticinin eski verileri ekranda referans olarak görmesi. Yalnızca değiştirilmek istenen alanların girilmesine olanak tanınması; boş bırakılan alanların eski haliyle korunması.
- **Teknik Detaylar:** Formsuz dinamik obje yönetimi. Sadece yeni veri girilen alanları tespit edip backend'e yalnızca bu verileri içeren güncel bir JSON objesi yollama mantığı.

## 4. Filmi Vizyondan Kaldırma (Silme)
- **Gereksinim:** `DELETE /movies/:movieId` entegrasyonu.
- **UI Bileşenleri:** Her filmin yanında yer alan tehlike rengiyle (kırmızı) kodlanmış "Filmi Sil" butonu.
- **Kullanıcı Deneyimi:** Geri dönüşü olmayan veri kaybını engellemek için silme işlemi öncesi tetiklenen yerleşik güvenlik onayı (`confirm` dialog).
- **Teknik Detaylar:** HTTP DELETE metodu kullanımı ve silme işlemi sonrası `loadAdminMovies()` fonksiyonu çağrılarak DOM'un güncellenmesi.

## 5. Sinema Salonu Ekleme
- **Gereksinim:** `POST /halls` entegrasyonu.
- **UI Bileşenleri:** Salon Adı ve Kapasite belirleme inputlarına sahip Flexbox tabanlı form yapısı.
- **Kullanıcı Deneyimi:** İşlem başarısı sonrası sistemin kullanıcıyı bilgilendirmesi ve seans oluşturmada kullanılacak güncel salon listesinin anında yenilenmesi.
- **Teknik Detaylar:** Form `onsubmit` event'inin yakalanması ve sayfa yenilenmesini engellemek için `e.preventDefault()` kullanımı.

## 6. Sinema Salonlarını Listeleme
- **Gereksinim:** `GET /halls` entegrasyonu.
- **UI Bileşenleri:** Salon ekleme formunun hemen altında yer alan, `max-height` ve `overflow-y: auto` özellikleriyle sınırlandırılmış kaydırılabilir dinamik liste.
- **Kullanıcı Deneyimi:** Yönetici seans tanımlarken ihtiyaç duyacağı "Salon ID" bilgisinin ekranda kopyalanabilir ve okunabilir bir formatta sunulması.
- **Teknik Detaylar:** Birden fazla asenkron fonksiyonun eşzamanlı çalıştırılması ve UI durumunun `innerHTML` manipülasyonu ile senkronize edilmesi.

## 7. Seans Oluşturma
- **Gereksinim:** `POST /sessions` entegrasyonu.
- **UI Bileşenleri:** Film ID ve Salon ID giriş alanları ile işletim sisteminin yerleşik tarih/saat seçicisini (`datetime-local`) tetikleyen özel input.
- **Kullanıcı Deneyimi:** Kullanıcının hatalı formatta tarih/saat girmesini önleyen tarayıcı kısıtlamaları ve yan yana konumlandırılmış ergonomik modül yapısı.
- **Teknik Detaylar:** Farklı veritabanı tablolarına ait benzersiz ID'lerin tek bir JSON paketinde toplanarak backend'e iletilmesi.

## 8. Seans İptal Etme
- **Gereksinim:** `DELETE /sessions/:sessionId` entegrasyonu.
- **UI Bileşenleri:** Panel altında kesik çizgilerle izole edilmiş tehlike bölgesi ve manuel Seans ID giriş kutusu.
- **Kullanıcı Deneyimi:** Yanlışlıkla iptalleri engellemek için çift aşamalı onay sistemi (ID girme + Confirm popup).
- **Teknik Detaylar:** Boşluk karakterlerinin backend'de hata yaratmaması için `.trim()` fonksiyonu ile veri temizliği yapılması.