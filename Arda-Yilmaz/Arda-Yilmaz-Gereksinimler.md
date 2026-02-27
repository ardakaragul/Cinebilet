1. **Kullanıcı Kaydı Oluşturma**
   - **API Metodu:** `POST /auth/register`
   - **Açıklama:** Sinema sisteminden bilet almak isteyen yeni bir müşterinin kişisel bilgileriyle sisteme üye olmasını sağlar.

2. **Kullanıcı Bilgilerini Görüntüleme**
   - **API Metodu:** `GET /users/{userId}` (veya giriş yapan kullanıcı için `GET /users/me`)
   - **Açıklama:** Sisteme giriş yapmış bir müşterinin kendi profil detaylarını görüntülemesini sağlar.

3. **Kullanıcı Bilgilerini Güncelleme**
   - **API Metodu:** `PUT /users/{userId}`
   - **Açıklama:** Müşterinin şifre, telefon numarası veya e-posta adresi gibi kişisel bilgilerini değiştirmesini sağlar.

4. **Kullanıcı Hesabını Kapatma**
   - **API Metodu:** `DELETE /users/{userId}`
   - **Açıklama:** Sistemdeki üyeliğini sonlandırmak isteyen bir müşterinin hesabının kalıcı olarak silinmesini sağlar.

5. **Bilet Satın Alma**
   - **API Metodu:** `POST /tickets`
   - **Açıklama:** Müşterinin seçtiği film, seans ve koltuk numarası için ödeme işlemini tamamlayarak biletini oluşturmasını sağlar.

6. **Biletleri Listeleme**
   - **API Metodu:** `GET /users/{userId}/tickets` (veya doğrudan `GET /tickets`)
   - **Açıklama:** Müşterinin daha önceden satın aldığı geçmiş veya gelecek tüm biletlerinin dökümünü görüntülemesini sağlar.

7. **Bilet İptal Etme**
   - **API Metodu:** `DELETE /tickets/{ticketId}`
   - **Açıklama:** Müşterinin satın almış olduğu bir bileti seans saatinden önce iptal ederek koltuğu boşa çıkarmasını sağlar.

8. **Müsait Koltukları Görüntüleme**
   - **API Metodu:** `GET /sessions/{sessionId}/seats`
   - **Açıklama:** Müşterinin bilet almak istediği seansa ait salondaki boş ve dolu koltuk durumlarını ekran üzerinde anlık olarak görmesini sağlar.