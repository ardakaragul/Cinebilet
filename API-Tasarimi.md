# API Tasarımı - OpenAPI Specification

**OpenAPI Spesifikasyon Dosyası:** [lamine.yaml](lamine.yaml)

Bu doküman, OpenAPI Specification (OAS) 3.0 standardına göre hazırlanmış örnek bir API tasarımını içermektedir.

---

## OpenAPI Specification

```yaml
openapi: 3.0.3
info:
  title: Cinebilet
  version: 1.0.0
  description: >
    Bu API, sinema biletleme ve rezervasyon platformunun temel gereksinimlerini karşılamak üzere tasarlanmıştır.
    Yönetici işlemleri (film, salon, seans yönetimi) ve müşteri işlemleri (kayıt, profil yönetimi, bilet satın alma ve iptali) süreçlerini içerir.
  contact:
    name: Akare Ekibi
servers:
  - url: https://api.cinebilet.com/v1
    description: Üretim sunucusu (Production)
  - url: https://staging-api.cinebilet.com/v1
    description: Test sunucusu (Staging)
  - url: http://localhost:3000/v1
    description: Yerel geliştirme sunucusu (Development)

tags:
  - name: Auth
    description: Kimlik doğrulama ve kayıt işlemleri
  - name: Profile
    description: Kullanıcı profili yönetimi
  - name: Movies
    description: Film ekleme, güncelleme ve listeleme
  - name: Halls
    description: Sinema salonu yönetimi
  - name: Sessions
    description: Seans yönetimi ve koltuk durumu
  - name: Tickets
    description: Bilet satın alma, listeleme ve iptal işlemleri

security:
  - BearerAuth: []

paths:
  /auth/register:
    post:
      tags: [Auth]
      summary: Kullanıcı Kaydı Oluşturma
      security: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/RegisterInput"
      responses:
        "201":
          description: Başarılı kayıt
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/AuthResponse"
        "400":
          $ref: "#/components/responses/BadRequest"

  /profile:
    get:
      tags: [Profile]
      summary: Kullanıcı Profilini Görüntüleme
      responses:
        "200":
          description: Profil bilgileri
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/User"
        "401":
          $ref: "#/components/responses/Unauthorized"
    put:
      tags: [Profile]
      summary: Profil Bilgilerini Güncelleme
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/ProfileUpdateInput"
      responses:
        "200":
          description: Başarılı güncelleme
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/User"
        "400":
          $ref: "#/components/responses/BadRequest"
        "401":
          $ref: "#/components/responses/Unauthorized"
    delete:
      tags: [Profile]
      summary: Kullanıcı Hesabını Kapatma
      responses:
        "204":
          description: Hesap başarıyla silindi
        "401":
          $ref: "#/components/responses/Unauthorized"

  /movies:
    post:
      tags: [Movies]
      summary: Film Ekleme
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/MovieInput"
      responses:
        "201":
          description: Film oluşturuldu
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Movie"
        "400":
          $ref: "#/components/responses/BadRequest"
        "401":
          $ref: "#/components/responses/Unauthorized"
    get:
      tags: [Movies]
      summary: Filmleri Listeleme
      security: []
      parameters:
        - $ref: "#/components/parameters/pageParam"
        - $ref: "#/components/parameters/limitParam"
      responses:
        "200":
          description: Film listesi
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Movie"

  /movies/{movieId}:
    parameters:
      - $ref: "#/components/parameters/movieIdParam"
    put:
      tags: [Movies]
      summary: Film Bilgilerini Güncelleme
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/MovieInput"
      responses:
        "200":
          description: Başarılı güncelleme
        "401":
          $ref: "#/components/responses/Unauthorized"
        "403":
          $ref: "#/components/responses/Forbidden"
        "404":
          $ref: "#/components/responses/NotFound"
    delete:
      tags: [Movies]
      summary: Filmi Vizyondan Kaldırma
      responses:
        "204":
          description: Film silindi
        "401":
          $ref: "#/components/responses/Unauthorized"
        "403":
          $ref: "#/components/responses/Forbidden"
        "404":
          $ref: "#/components/responses/NotFound"

  /halls:
    post:
      tags: [Halls]
      summary: Sinema Salonu Ekleme
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/HallInput"
      responses:
        "201":
          description: Salon oluşturuldu
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Hall"
        "400":
          $ref: "#/components/responses/BadRequest"
        "401":
          $ref: "#/components/responses/Unauthorized"
    get:
      tags: [Halls]
      summary: Sinema Salonlarını Listeleme
      responses:
        "200":
          description: Salon listesi
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Hall"
        "401":
          $ref: "#/components/responses/Unauthorized"

  /sessions:
    post:
      tags: [Sessions]
      summary: Seans Oluşturma
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/SessionInput"
      responses:
        "201":
          description: Seans oluşturuldu
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Session"
        "400":
          $ref: "#/components/responses/BadRequest"
        "401":
          $ref: "#/components/responses/Unauthorized"

  /sessions/{sessionId}:
    parameters:
      - $ref: "#/components/parameters/sessionIdParam"
    delete:
      tags: [Sessions]
      summary: Seans İptal Etme
      responses:
        "204":
          description: Seans silindi
        "401":
          $ref: "#/components/responses/Unauthorized"
        "403":
          $ref: "#/components/responses/Forbidden"
        "404":
          $ref: "#/components/responses/NotFound"

  /sessions/{sessionId}/seats:
    parameters:
      - $ref: "#/components/parameters/sessionIdParam"
    get:
      tags: [Sessions]
      summary: Müsait Koltukları Görüntüleme
      security: []
      responses:
        "200":
          description: Koltuk durumları listesi
          content:
            application/json:
              schema:
                type: array
                items:
                  type: string
        "404":
          $ref: "#/components/responses/NotFound"

  /tickets:
    post:
      tags: [Tickets]
      summary: Bilet Satın Alma
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/TicketInput"
      responses:
        "201":
          description: Bilet başarıyla alındı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Ticket"
        "400":
          $ref: "#/components/responses/BadRequest"
        "401":
          $ref: "#/components/responses/Unauthorized"
    get:
      tags: [Tickets]
      summary: Biletleri Listeleme
      parameters:
        - $ref: "#/components/parameters/pageParam"
        - $ref: "#/components/parameters/limitParam"
      responses:
        "200":
          description: Kullanıcının biletleri
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Ticket"
        "401":
          $ref: "#/components/responses/Unauthorized"

  /tickets/{ticketId}:
    parameters:
      - $ref: "#/components/parameters/ticketIdParam"
    delete:
      tags: [Tickets]
      summary: Bilet İptal Etme
      responses:
        "204":
          description: Bilet başarıyla iptal edildi
        "401":
          $ref: "#/components/responses/Unauthorized"
        "404":
          $ref: "#/components/responses/NotFound"

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  parameters:
    pageParam:
      name: page
      in: query
      description: Sayfa numarası
      schema:
        type: integer
        minimum: 1
        default: 1
    limitParam:
      name: limit
      in: query
      description: Sayfa başına gösterilecek sonuç sayısı
      schema:
        type: integer
        minimum: 1
        maximum: 50
        default: 10
    movieIdParam:
      name: movieId
      in: path
      required: true
      description: Filmin benzersiz kimliği
      schema:
        type: string
    sessionIdParam:
      name: sessionId
      in: path
      required: true
      description: Seansın benzersiz kimliği
      schema:
        type: string
    ticketIdParam:
      name: ticketId
      in: path
      required: true
      description: Biletin benzersiz kimliği
      schema:
        type: string

  responses:
    BadRequest:
      description: Geçersiz istek verisi
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Error"
    Unauthorized:
      description: Kimlik doğrulama başarısız (Eksik veya geçersiz token)
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Error"
    Forbidden:
      description: Bu işlem için yetkiniz yok (Örneğin admin değilsiniz)
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Error"
    NotFound:
      description: Kayıt bulunamadı
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Error"

  schemas:
    Error:
      type: object
      properties:
        message:
          type: string
          example: "Bir hata oluştu."

    AuthResponse:
      type: object
      properties:
        token:
          type: string
        user:
          $ref: "#/components/schemas/User"

    RegisterInput:
      type: object
      required: [firstName, lastName, email, password]
      properties:
        firstName:
          type: string
        lastName:
          type: string
        email:
          type: string
          format: email
        password:
          type: string
          format: password
        phone:
          type: string

    User:
      type: object
      properties:
        id:
          type: string
        firstName:
          type: string
        lastName:
          type: string
        email:
          type: string
        phone:
          type: string

    ProfileUpdateInput:
      type: object
      properties:
        phone:
          type: string
        email:
          type: string
        password:
          type: string

    Movie:
      type: object
      properties:
        id:
          type: string
        title:
          type: string
        director:
          type: string
        durationMinutes:
          type: integer
        posterUrl:
          type: string
          format: uri

    MovieInput:
      type: object
      required: [title, director, durationMinutes]
      properties:
        title:
          type: string
        director:
          type: string
        durationMinutes:
          type: integer
        posterUrl:
          type: string

    Hall:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        capacity:
          type: integer

    HallInput:
      type: object
      required: [name, capacity]
      properties:
        name:
          type: string
        capacity:
          type: integer

    Session:
      type: object
      properties:
        id:
          type: string
        movieId:
          type: string
        hallId:
          type: string
        startTime:
          type: string
          format: date-time

    SessionInput:
      type: object
      required: [movieId, hallId, startTime]
      properties:
        movieId:
          type: string
        hallId:
          type: string
        startTime:
          type: string
          format: date-time

    Ticket:
      type: object
      properties:
        id:
          type: string
        sessionId:
          type: string
        seatNumber:
          type: string
        purchaseDate:
          type: string
          format: date-time

    TicketInput:
      type: object
      required: [sessionId, seatNumber]
      properties:
        sessionId:
          type: string
        seatNumber:
          type: string
```