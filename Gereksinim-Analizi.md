# Tüm Gereksinimler

1. **Film Ekleme** (Mevlüt Arda Karagül)
    - **API Metodu:** `POST /movies`
    - **Açıklama:** Sinemada gösterime girecek yeni bir filmin ad, yönetmen, süre ve afiş gibi bilgilerinin sisteme kaydedilmesini sağlar.

2. **Filmleri Listeleme** (Mevlüt Arda Karagül)
    - **API Metodu:** `GET /movies`
    - **Açıklama:** Sisteme daha önceden kaydedilmiş olan tüm filmlerin detaylarıyla birlikte bir liste halinde görüntülenmesini sağlar.

3. **Film Bilgilerini Güncelleme** (Mevlüt Arda Karagül)
    - **API Metodu:** `PUT /movies/:movieId`
    - **Açıklama:** Mevcut bir filmin vizyon tarihi, afişi veya süresi gibi bilgilerinde değişiklik yapılmasını sağlar.

4. **Filmi Vizyondan Kaldırma** (Mevlüt Arda Karagül)
    - **API Metodu:** `DELETE /movies/:movieId`
    - **Açıklama:** Gösterim süresi dolan veya iptal edilen bir filmin sistemden tamamen silinmesini sağlar.

5. **Sinema Salonu Ekleme** (Mevlüt Arda Karagül)
    - **API Metodu:** `POST /halls`
    - **Açıklama:** Sinema merkezine yeni açılan bir salonun kapasite ve koltuk düzeni bilgileriyle sisteme tanıtılmasını sağlar.

6. **Sinema Salonlarını Listeleme** (Mevlüt Arda Karagül)
    - **API Metodu:** `GET /halls`
    - **Açıklama:** Sistemde kayıtlı olan tüm sinema salonlarının kapasite bilgileriyle beraber görüntülenmesini sağlar.

7. **Seans Oluşturma** (Mevlüt Arda Karagül)
    - **API Metodu:** `POST /sessions`
    - **Açıklama:** Belirli bir filmin, seçilen bir salonda ve belirlenen saatte gösterime sunulması için yeni bir yayın saati ayarlanmasını sağlar.

8. **Seans İptal Etme** (Mevlüt Arda Karagül)
    - **API Metodu:** `DELETE /sessions/:sessionId`
    - **Açıklama:** Oluşturulmuş olan bir film gösterim saatinin iptal edilerek sistemden kaldırılmasını sağlar.

9. **Kullanıcı Kaydı Oluşturma** (Arda Yılmaz)
    - **API Metodu:** `POST /auth/register`
    - **Açıklama:** Sinema sisteminden bilet almak isteyen yeni bir müşterinin kişisel bilgileriyle sisteme üye olmasını sağlar.

10. **Kullanıcı Bilgilerini Görüntüleme** (Arda Yılmaz)
    - **API Metodu:** `GET /profile`
    - **Açıklama:** Sisteme giriş yapmış bir müşterinin kendi profil detaylarını görüntülemesini sağlar.

11. **Kullanıcı Bilgilerini Güncelleme** (Arda Yılmaz)
    - **API Metodu:** `PUT /profile`
    - **Açıklama:** Müşterinin şifre, telefon numarası veya e-posta adresi gibi kişisel bilgilerini değiştirmesini sağlar.

12. **Kullanıcı Hesabını Kapatma** (Arda Yılmaz)
    - **API Metodu:** `DELETE /profile`
    - **Açıklama:** Sistemdeki üyeliğini sonlandırmak isteyen bir müşterinin hesabının kalıcı olarak silinmesini sağlar.

13. **Bilet Satın Alma** (Arda Yılmaz)
    - **API Metodu:** `POST /tickets`
    - **Açıklama:** Müşterinin seçtiği film, seans ve koltuk numarası için ödeme işlemini tamamlayarak biletini oluşturmasını sağlar.

14. **Biletleri Listeleme** (Arda Yılmaz)
    - **API Metodu:** `GET /tickets`
    - **Açıklama:** Müşterinin daha önceden satın aldığı geçmiş veya gelecek tüm biletlerinin dökümünü görüntülemesini sağlar.

15. **Bilet İptal Etme** (Arda Yılmaz)
    - **API Metodu:** `DELETE /tickets/:ticketId`
    - **Açıklama:** Müşterinin satın almış olduğu bir bileti seans saatinden önce iptal ederek koltuğu boşa çıkarmasını sağlar.

16. **Müsait Koltukları Görüntüleme** (Arda Yılmaz)
    - **API Metodu:** `GET /sessions/:sessionId/seats`
    - **Açıklama:** Müşterinin bilet almak istediği seansa ait salondaki boş ve dolu koltuk durumlarını ekran üzerinde anlık olarak görmesini sağlar.

# Gereksinim Dağılımları

1. [Mevlüt Arda Karagül'ün Gereksinimleri](Mevlut-Arda-Karagul/Mevlut-Arda-Karagul-Gereksinimler.md)
2. [Arda Yılmaz'ın Gereksinimleri](Arda-Yilmaz/Arda-Yilmaz-Gereksinimler.md)