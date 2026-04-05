# Arda Yılmaz'ın REST API Metotları

**API Test Videosu:** [Youtube Videosu](https://youtu.be/5niM1gwGA4g)

## 1. Kullanıcı Kayıt Olma
- **Endpoint:** `POST /auth/register`
- **Request Body:**  
  ```json
  {
    "name": "Ahmet Yılmaz",
    "email": "ahmet@example.com",
    "password": "GuvenliSifre123",
    "phone": "05551234567"
  }
  ```
- **Authentication:** Gerekli değil
- **Response:** `201 Created` - Müşteri başarıyla sisteme kaydedildi

## 2. Kullanıcı Bilgilerini Görüntüleme
- **Endpoint:** `GET /users/:userId`
- **Authentication:** Kullanıcı girişi gerekli
- **Response:** `200 OK` - Giriş yapan müşterinin detaylı profil bilgileri döndürülür

## 3. Kullanıcı Bilgilerini Güncelleme
- **Endpoint:** `PUT /users/:userId`
- **Request Body:**  
  ```json
  {
    "name": "Ahmet Yılmaz",
    "email": "ahmet.yeni@example.com",
    "phone": "05559876543"
  }
  ```
- **Authentication:** Kullanıcı girişi gerekli
- **Response:** `200 OK` - Profil bilgileri başarıyla güncellendi

## 4. Kullanıcı Hesabını Kapatma
- **Endpoint:** `DELETE /users/:userId`
- **Authentication:** Kullanıcı girişi gerekli
- **Response:** `200 OK` - Müşteri hesabı sistemden kalıcı olarak silindi

## 5. Bilet Satın Alma
- **Endpoint:** `POST /tickets`
- **Request Body:**  
  ```json
  {
    "userId": "60d5ecb8b392d700153f3a12",
    "sessionId": "60d5ecb8b392d700153f3a99",
    "seatNumber": "C4"
  }
  ```
- **Authentication:** Kullanıcı girişi gerekli
- **Response:** `201 Created` - Ödeme işlemi onaylandı ve bilet oluşturuldu

## 6. Biletleri Listeleme
- **Endpoint:** `GET /users/:userId/tickets`
- **Authentication:** Kullanıcı girişi gerekli
- **Response:** `200 OK` - Müşteriye ait satın alınmış tüm biletlerin listesi döndürülür

## 7. Bilet İptal Etme
- **Endpoint:** `DELETE /tickets/:ticketId`
- **Authentication:** Kullanıcı girişi gerekli
- **Response:** `200 OK` - Bilet iptal edildi ve koltuk boşa çıkarıldı

## 8. Müsait Koltukları Görüntüleme
- **Endpoint:** `GET /sessions/:sessionId/seats`
- **Authentication:** Gerekli değil
- **Response:** `200 OK` - İlgili seansa ait dolu ve boş koltukların durumu döndürülür