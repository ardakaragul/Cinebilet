# Arda Yılmaz'ın Web Frontend Görevleri

**Front-end Test Videosu:** [Youtube Videosu](https://youtu.be/MwugHRm9BpQ)

Bu dokümanda Arda Yılmaz'ın sorumluluğunda olan müşteri (kullanıcı) arayüzüne ait sistem yapılandırmaları, bilet işlemleri ve UI bileşenleri detaylandırılmıştır. 

## 1. Kullanıcı Kayıt Ekranı
- **Gereksinim:** `POST /auth/register` entegrasyonu.
- **UI Bileşenleri:** Ad, E-posta, Şifre ve Telefon numarası giriş alanlarını barındıran responsive kayıt formu.
- **Kullanıcı Deneyimi:** Form başarıyla gönderildikten sonra müşteriye kaydın tamamlandığına dair uyarı verilmesi ve giriş yapması için login arayüzüne yönlendirilmesi.
- **Teknik Detaylar:** `fetch` API ile form submit event'inin yakalanması, sayfa yenilenmesinin `e.preventDefault()` ile engellenmesi ve form verilerinin `JSON.stringify` ile paketlenmesi.

## 2. Kullanıcı Bilgilerini Görüntüleme
- **Gereksinim:** `GET /users/:userId` entegrasyonu.
- **UI Bileşenleri:** Müşterinin kişisel verilerinin (isim, iletişim bilgileri vb.) düzenli bir şekilde gösterildiği profil paneli.
- **Kullanıcı Deneyimi:** Kullanıcı giriş yaptığı anda LocalStorage'daki ID bilgisi kullanılarak sayfa yüklenirken verilerin DOM'a enjekte edilmesi.
- **Teknik Detaylar:** `DOMContentLoaded` event listener kullanılarak sayfa açılışında asenkron `fetch` isteği atılması ve dönen verinin `innerHTML` ile arayüze basılması.

## 3. Kullanıcı Bilgilerini Güncelleme
- **Gereksinim:** `PUT /users/:userId` entegrasyonu.
- **UI Bileşenleri:** Profil ekranında bilgilerin hemen yanında bulunan "Profili Düzenle" butonu ve tetiklenen tarayıcı tabanlı `prompt` pencereleri.
- **Kullanıcı Deneyimi:** Müşterinin mevcut bilgilerini görüp yalnızca değiştirmek istediği alanları doldurması, boş bıraktığı kısımların eski halinde korunması.
- **Teknik Detaylar:** Dinamik obje yönetimi. Yalnızca yeni veri girilen alanları tespit eden ve backend'e gereksiz veri yollamaktan kaçınan optimizasyon mantığı.

## 4. Kullanıcı Hesabını Kapatma
- **Gereksinim:** `DELETE /users/:userId` entegrasyonu.
- **UI Bileşenleri:** Profil sayfasının alt kısmında yer alan, tehlike rengiyle kodlanmış (kırmızı) "Hesabımı Sil" butonu.
- **Kullanıcı Deneyimi:** Hesabın kazara silinmesini engellemek için tarayıcının yerleşik onay mekanizması (`confirm`) ile ikaz verilmesi. Silme sonrasında kullanıcının ana sayfaya atılması.
- **Teknik Detaylar:** Silme isteği 200 OK döndüğünde `localStorage.clear()` komutu ile oturum (token/ID) verilerinin temizlenmesi ve `window.location.reload()` ile UI'ın sıfırlanması.

## 5. Bilet Satın Alma Arayüzü
- **Gereksinim:** `POST /tickets` entegrasyonu.
- **UI Bileşenleri:** Hangi seans ve koltuk numarası için işlem yapıldığını belirten seçim inputları veya butonlar içeren "Bilet Al" modülü.
- **Kullanıcı Deneyimi:** Bilet alımı başarılı olduğunda "Biletiniz onaylandı" mesajı sunulması ve koltuğun boştan dolu durumuna geçmesi.
- **Teknik Detaylar:** Seçilen koltuğun ID'si, Seans ID'si ve Müşteri ID'sinin tek bir JSON payload'ı içerisinde birleştirilerek POST isteği ile backend'e gönderilmesi.

## 6. Biletleri Listeleme
- **Gereksinim:** `GET /users/:userId/tickets` entegrasyonu.
- **UI Bileşenleri:** Müşterinin satın aldığı biletlere ait film adı, salon ve koltuk numarasını içeren dinamik liste/kart yapısı.
- **Kullanıcı Deneyimi:** Biletler listelenirken boş sonuç gelirse (bilet yoksa) ekrana kullanıcıyı bilgilendiren "Henüz biletiniz bulunmamaktadır" mesajının basılması.
- **Teknik Detaylar:** Gelen bilet dizisinin uzunluğunun (`array.length`) kontrol edilmesi ve `forEach` döngüsü ile Template Literaller kullanılarak HTML çıktısı üretilmesi.

## 7. Bilet İptal Etme
- **Gereksinim:** `DELETE /tickets/:ticketId` entegrasyonu.
- **UI Bileşenleri:** Listelenen her biletin hemen yanında yer alan "İptal Et" butonu.
- **Kullanıcı Deneyimi:** İptal işlemi öncesinde onay istenmesi ve bilet iptal edildikten sonra sayfayı yenilemeye gerek kalmadan bilet listesinin anında güncellenmesi.
- **Teknik Detaylar:** Asenkron DELETE isteği başarıyla sonuçlandığında, listeyi render eden fonksiyonun (örn: `loadMyTickets()`) yeniden çağrılarak DOM'un senkronize edilmesi.

## 8. Müsait Koltukları Görüntüleme
- **Gereksinim:** `GET /sessions/:sessionId/seats` entegrasyonu.
- **UI Bileşenleri:** Seans detaylarında salonun durumunu görselleştiren koltuk elementleri.
- **Kullanıcı Deneyimi:** Satın alınmış (dolu) koltukların gri/kırmızı renkte ve tıklanamaz durumda (`disabled`) olması, müsait koltukların ise seçilebilir (yeşil) olarak vurgulanması.
- **Teknik Detaylar:** Backend'den gelen seans detayındaki koltuk durumu verisinin incelenerek, HTML elementlerine koşullu CSS sınıflarının (örn: `.occupied` veya `.available`) dinamik olarak atanması.