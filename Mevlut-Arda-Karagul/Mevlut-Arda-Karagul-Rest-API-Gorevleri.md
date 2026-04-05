# Mevlüt Arda Karagül'ün REST API Metotları

**API Test Videosu:** [Link](https://example.com)

## 1. Yeni Film Ekleme
- **Endpoint:** `POST /movies`
- **Request Body:** 
  ```json
  {
    "title": "Inception",
    "director": "Christopher Nolan",
    "durationMinutes": 148,
    "posterUrl": "[https://example.com/inception.jpg](https://example.com/inception.jpg)"
  }
  ```
- **Authentication:** Gerekli (Yönetici Yetkisi)
- **Response:** `201 Created` - Film başarıyla sisteme eklendi

## 2. Filmleri Listeleme
- **Endpoint:** `GET /movies`
- **Authentication:** Gerekli değil (Müşteriler de görebilir)
- **Response:** `200 OK` - Sistemdeki tüm filmlerin detaylı listesi döndürülür

## 3. Film Bilgilerini Güncelleme
- **Endpoint:** `PUT /movies/:movieId`
- **Request Body:** 
  ```json
  {
    "title": "Inception: Director's Cut",
    "durationMinutes": 160
  }
  ```
- **Authentication:** Gerekli (Yönetici Yetkisi)
- **Response:** `200 OK` - Film bilgileri başarıyla güncellendi

## 4. Filmi Vizyondan Kaldırma (Silme)
- **Endpoint:** `DELETE /movies/:movieId`
- **Authentication:** Gerekli (Yönetici Yetkisi)
- **Response:** `200 OK` - Film ve filme ait veriler sistemden silindi

## 5. Sinema Salonu Ekleme
- **Endpoint:** `POST /halls`
- **Request Body:** 
  ```json
  {
    "name": "Salon 1 (IMAX)",
    "capacity": 120
  }
  ```
- **Authentication:** Gerekli (Yönetici Yetkisi)
- **Response:** `201 Created` - Yeni sinema salonu başarıyla oluşturuldu

## 6. Sinema Salonlarını Listeleme
- **Endpoint:** `GET /halls`
- **Authentication:** Gerekli (Yönetici Yetkisi)
- **Response:** `200 OK` - Kayıtlı tüm salonlar ve kapasite bilgileri döndürülür

## 7. Seans Oluşturma
- **Endpoint:** `POST /sessions`
- **Request Body:** 
  ```json
  {
    "movieId": "60d5ecb8b392d700153f3a12",
    "hallId": "60d5ecb8b392d700153f3a13",
    "startTime": "2026-04-10T20:00:00"
  }
  ```
- **Authentication:** Gerekli (Yönetici Yetkisi)
- **Response:** `201 Created` - Film ve salon eşleştirilerek seans tanımlandı

## 8. Seans İptal Etme
- **Endpoint:** `DELETE /sessions/:sessionId`
- **Authentication:** Gerekli (Yönetici Yetkisi)
- **Response:** `200 OK` - İlgili seans iptal edildi ve sistemden kaldırıldı