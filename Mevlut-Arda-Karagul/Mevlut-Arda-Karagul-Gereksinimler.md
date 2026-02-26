1. **Film Ekleme**
   - **API Metodu:** `POST /movies`
   - **Açıklama:** Sinemada gösterime girecek yeni bir filmin ad, yönetmen, süre ve afiş gibi bilgilerinin sisteme kaydedilmesini sağlar.

2. **Filmleri Listeleme**
   - **API Metodu:** `GET /movies`
   - **Açıklama:** Sisteme daha önceden kaydedilmiş olan tüm filmlerin detaylarıyla birlikte bir liste halinde görüntülenmesini sağlar.

3. **Film Bilgilerini Güncelleme**
   - **API Metodu:** `PUT /movies/{movieId}`
   - **Açıklama:** Mevcut bir filmin vizyon tarihi, afişi veya süresi gibi bilgilerinde değişiklik yapılmasını sağlar.

4. **Filmi Vizyondan Kaldırma**
   - **API Metodu:** `DELETE /movies/{movieId}`
   - **Açıklama:** Gösterim süresi dolan veya iptal edilen bir filmin sistemden tamamen silinmesini sağlar.

5. **Sinema Salonu Ekleme**
   - **API Metodu:** `POST /halls`
   - **Açıklama:** Sinema merkezine yeni açılan bir salonun kapasite ve koltuk düzeni bilgileriyle sisteme tanıtılmasını sağlar.

6. **Sinema Salonlarını Listeleme**
   - **API Metodu:** `GET /halls`
   - **Açıklama:** Sistemde kayıtlı olan tüm sinema salonlarının kapasite bilgileriyle beraber görüntülenmesini sağlar.

7. **Seans Oluşturma**
   - **API Metodu:** `POST /sessions`
   - **Açıklama:** Belirli bir filmin, seçilen bir salonda ve belirlenen saatte gösterime sunulması için yeni bir yayın saati ayarlanmasını sağlar.

8. **Seans İptal Etme**
   - **API Metodu:** `DELETE /sessions/{sessionId}`
   - **Açıklama:** Oluşturulmuş olan bir film gösterim saatinin iptal edilerek sistemden kaldırılmasını sağlar.