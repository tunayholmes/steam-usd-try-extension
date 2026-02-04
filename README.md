# Steam USD → TRY Converter (Chrome Extension)

Steam mağazasında görünen USD fiyatlarını TRY’ye çeviren basit bir Chrome eklentisi.

## Özellikler
- Steam fiyatlarını USD → TRY çevirme
- Otomatik kur veya manuel kur modu
- Dolar fiyatını gizleme modu
- TL formatı: yuvarlama veya küsüratlı gösterim

---

## Ekran Görüntüleri

| Steam sayfası (önce) | Steam sayfası (sonra) |
|---|---|
| ![Before](screenshots/before.png) | ![After](screenshots/after.png) |

| Popup arayüzü |
|---|
| ![Popup](screenshots/popup.png) |

---

## Kurulum (Chrome)
1. Bu projeyi indir:
   - `Code → Download ZIP`
   veya
   - `git clone` ile bilgisayarına çek

2. Chrome'da şu sayfayı aç:
   - `chrome://extensions`

3. Sağ üstten **Developer mode** (Geliştirici modu) aç.

4. **Load unpacked** (Paketlenmemiş öğe yükle) butonuna bas.

5. Proje klasörünü seç.

---

## Kullanım
- Steam mağaza sayfasına girince fiyatlar otomatik çevrilir.
- Sağ üstten eklenti ikonuna basarak:
  - Kur modunu değiştirebilir
  - Manuel kur girebilir
  - USD fiyatını gizleyebilir
  - Yuvarlama / küsürat seçebilirsin

---

## Notlar
- Otomatik kur özelliği üçüncü taraf bir döviz kuru API’si kullanır.
- Bu eklenti Valve veya Steam ile resmi olarak bağlantılı değildir.

---

## Lisans
MIT License

---

## Sık Sorulan Sorular (SSS)

### 1) Kur alınamadı hatası alıyorum, neden?
Bu hata genelde otomatik kur servisinin geçici olarak yanıt vermemesi veya bağlantı engeli nedeniyle oluşur.

Çözüm:
- Popup’tan **Kur modu → Manuel** seçip kuru kendin gir.
- Sayfayı yenile (Ctrl + Shift + R).
- Eklentiyi kapatıp aç.

---

### 2) Bazı fiyatlar çevrilmiyor, normal mi?
Evet. Steam bazen bazı yerlerde fiyatları farklı HTML yapılarında gösterebiliyor.
Eklenti çoğu standart fiyat alanını çevirir, ancak bazı özel alanlar (paket, bundle, bazı indirim blokları) kaçabilir.

---

### 3) Yanlış TL fiyatı gösteriyor gibi görünüyor
Eklenti sadece **döviz kuru ile çeviri** yapar.

Steam’in Türkiye fiyatlandırması (yerel fiyat) ile birebir aynı olmak zorunda değildir.
Bu yüzden TL karşılığı “yaklaşık” olarak düşünülmelidir.

---

### 4) USD gizleyince neden sadece TL görünüyor?
Bu bir özellik.
Popup’tan **USD gizle** seçeneğini kapatırsan hem TL hem USD görünür.

---

### 5) Bu eklenti Steam / Valve tarafından mı yapıldı?
Hayır.
Bu eklenti Valve veya Steam ile resmi olarak bağlantılı değildir.

---

### 6) Bu eklenti kişisel veri topluyor mu?
Hayır.
Eklenti sadece senin ayarlarını (kur modu, manuel kur, yuvarlama vb.) tarayıcıda saklar.
Herhangi bir kişisel veri toplamaz veya paylaşmaz.

