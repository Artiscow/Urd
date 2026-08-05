# Kullanıcı kılavuzu

[Sámegiella](GUIDE-se.md) · [🇬🇧 English](GUIDE-en-GB.md) · [🇳🇴 Bokmål](GUIDE-nb.md) · [🇳🇴 Nynorsk](GUIDE-nn.md) · **🇹🇷 Türkçe**

GUIDE-nb.md dosyasının çevirisi. Norveççe (bokmål) kanoniktir ve farklılık durumunda geçerlidir. Aşağıdaki düğme ve panel adları Türkçe admin metinleridir; adminin başka bir dile ayarlıysa adlar o dili izler.

Urd ile kurulmuş bir siteye sahip olan ya da onu düzenleyen senin için. Kod yok, git
bilgisi gerekmez: her şey kendi sitende, tarayıcıda olur.

> Urd geliştirme aşamasındadır. Kılavuz bugün var olanı kapsar ve
> zamanla genişletilir; tam bir derleme toparlaması v0.9'a doğru planlanmıştır.

**İçindekiler:** [Başlarken](#başlarken) · [Düzenleyici](#düzenleyici) · [İçeriği düzenleme](#i̇çeriği-düzenleme) · [Özellikler paneli](#özellikler-paneli) · [Bölümler](#bölümler) · [Izgara (kılavuz çizgileri)](#izgara-kılavuz-çizgileri) · [Mobil](#mobil) · [Sayfalar, menü ve tema](#sayfalar-menü-ve-tema) · [Taslaklar ve yayımlama](#taslaklar-ve-yayımlama) · [Geçmiş ve bir yayımlamayı geri alma](#geçmiş-ve-bir-yayımlamayı-geri-alma) · [İlk kez](#i̇lk-kez)

## Başlarken

1. Sitende `/admin` adresine git (örneğin `siten.pages.dev/admin`).
2. GitHub hesabınla giriş yap (sağ üstteki **GitHub ile giriş yap** düğmesi). Düzenleyiciyi
   giriş yapmadan görebilir ve deneyebilirsin, ama yayımlayamazsın.
3. Değiştirdiğin her şey hemen tarayıcında **taslak** olarak kaydedilir.
   **Yayımla** düğmesine basana kadar hiçbir şey ziyaretçilere görünmez.

## Düzenleyici

Ekranın üç bölümü vardır:

- **Üst çubuk**: sayfa seç, masaüstü ve mobil görünüm arasında geç (ekran ve telefon simgeleri) ve yayımla.
- **Soldaki panel seçici**, iş akışına göre gruplanmış: Sayfalar,
  Bloklar, Özellikler ve Izgara (sayfayı kurma), Tema, Gezinme ve Alt bilgi
  (site) ve Geçmiş. Bir paneli açmak için tıkla; kapatmak için
  yeniden tıkla.
- **Admin teması**: Urd logosunun yanındaki açılır menü düzenleyicinin kendi
  renk temasını değiştirir (yedi çeşit). Web siteni asla etkilemez.
- **Önizleme**: gerçek sayfan. Gördüğün, ziyaretçilerin gördüğüdür.

**Temiz görünüm** (sağ üstte) tüm araçları gizler; böylece sayfayı
düzenleyici çerçeveleri olmadan görürsün. Geri dönmek için **Düzenle** düğmesine tıkla.

## İçeriği düzenleme

- **Metin yazma**: bir metin bloğuna tıkla ve doğrudan sayfaya yaz.
- **Bir bloğu taşıma**: onu tut ve sürükle. Blok kılavuz çizgilerine
  oturur (aşağıdaki Izgara bölümüne bak).
- **Boyutu değiştirme**: bloğun köşesindeki tutamacı sürükle.
- **Seçili bloğun üstündeki araç çubuğu**:
  - ⠿ taşı (sürükle)
  - katman okları (çizgiye doğru ok, yukarı/aşağı) bloğu en öne ya da en arkaya alır (bloklar üst üste geldiğinde).
    Not: düzenlerken imlediğin ya da seçtiğin blok her zaman en üstte
    gösterilir, böylece tutamaçlara erişilebilir - GERÇEK sırayı
    Temiz görünümde ve yayımlanan sayfada görürsün
  - telefon simgesi: mobilde görünürlük (süsleme), aşağıya bak
  - × bloğu sil
- **Döndürme**: bloğun sağ üst köşesindeki küçük ⟳ dairesini sürükle
  (15° adımlara oturur; serbest açı için Shift'i basılı tut). Tam derece değeri
  Özellikler panelinden de girilebilir.
- **Seçili blokta klavye**: ok tuşları bir ızgara adımı taşır
  (Shift = 1 px), Delete siler, Esc seçimi kaldırır, Ctrl+D çoğaltır.
- **Hizalama çizgileri**: bir bloğu başka bir bloğun kenarına ya da ortasına
  yaklaştırdığında bir çizgi belirir ve blok yerine oturur (tamamen serbest
  yerleşim için Shift'i basılı tut).
- **Geri alma**: Ctrl+Z (ve yinelemek için Ctrl+Shift+Z) her şeyde çalışır: taşıma,
  boyut, metin, silme, bölümler ve ızgara.

### Blok ekleme

**Bloklar** panelini aç ve istediğin bloğa tıkla; blok görüş alanının ortasına,
en son tıkladığın bölüme yerleştirilir. Türler:

- **Metin**: doğrudan sayfada sıradan metin.
- **Metin kutusu**: arka plan rengi ve yuvarlatılmış köşeleri olan bir kartta metin;
  yardım metinleri ve bilgi kutuları için uygun.
- **Düğme**: başka bir sayfaya ya da dış adrese bağlantı.
- **Görsel**: makinenden yükle. Görsel otomatik olarak sıkıştırılır.
- **Video**: Özellikler panelinde bir YouTube ya da Vimeo bağlantısı yapıştır.
  Gömme gizlilik dostudur ve video yayımlanan sayfada oynar
  (düzenleyicide tıklama yalnızca bloğu seçer).
- **Koleksiyon**: bir koleksiyonun kayıtlarını (Koleksiyonlar paneline bak)
  kart, liste ya da yıla göre gruplanmış arşiv olarak gösterir.
- **Simge**: istediğin boyutta ve tema renginde bir karakter ya da emoji.
  Özellikler panelinde karakter düğmesi yüzlerce karakter ve emoji içeren
  bir menü açar (en son kullanılanlar üstte) ve menünün altından
  karakter yerine gösterilecek kendi simge görselini yükleyebilirsin.
- **Şekiller**: süsleme için çizgi, ok, daire, dikdörtgen ve üçgen.

Düzenleyicide bağlantılar ve düğmeler tıkladığında asla tetiklenmez -
tıklama bloğu seçer. Bağlantıları **Siteyi gör ↗** ile test et.

### Telefon simgesi (süsleme) ne demek?

Düğme, bloğun mobile taşınıp taşınmayacağını gösterir. Mobilde içerik otomatik olarak
tek sütunda üst üste dizilir ve orada süslemeler atlanır: masaüstünde metnin arkasında hoş
duran eğik bir çizgi ya da ok, mobil sütunun ortasında yalnızca karışıklık yaratır.

- Telefon = blok içeriktir ve mobilde gösterilir.
- Üzeri çizili telefon (sarı düğme) = blok süslemedir ve otomatik mobil
  düzende gizlenir.

Değiştirmek için tıkla. Bloklar panelinden gelen yeni şekiller ve simgeler
süsleme olarak başlar (bölüm şablonlarındaki simgeler içeriktir ve mobilde gösterilir). (Bölümdeki mobil
düzeni elle ayarladıysan zaten her şeyi kendin yerleştirirsin; o zaman
bu işaretin orada bir anlamı yoktur.)

## Özellikler paneli

Bir bloğa tıkla ve sürükle-bırak yerine sayılar ve seçeneklerle ince ayar
yapmak için **Özellikler** panelini aç:

- Tüm bloklar: tam konum ve boyut, katman (önde ne duracağı),
  döndürme ve mobilde görünürlük (süsleme).
- Metin: hizalama ve metin kutusu açık/kapalı. Düğme: metin, nereye gittiği ve stil.
  Görsel: görseli değiştir, açıklama, kırpma, yuvarlatma ve bağlantı.
  Şekil: tür, temadan renk, kalınlık ve dolu/kenarlık.
- Bir bölüme tıklarsan (blok seçili değilken) panel bölümün
  en az yüksekliğini, özel ızgarasını, arka planını ve animasyonunu gösterir.

**Renkler**: renk seçiciler tema renklerini nokta olarak gösterir - birini
seçersen alan temaya BAĞLANIR ve Tema panelinde paleti değiştirdiğinde
onu izler (bağlı alanlar halka ile gösterilir). Alanda serbestçe seçersen
ya da bir hex veya RGB değeri yazarsan renk bağımsızdır ve renk tonlarının
altındaki kaydırıcıyla saydam yapabilirsin. En son kullandığın serbest
renkler **Son kullanılanlar** altındadır ve **Kayıtlı** yanındaki artı düğmesiyle
kendi sabit paletini kurarsın (en fazla 12; bir noktadaki × onu kaldırır).

**Görseller**: Özellikler panelinde odak noktasını (kırpıldığında görselin hangi
bölümünün korunacağını) ayarlayabilir ve parlaklık, kontrast ve
doygunluğu değiştirebilirsin - görsel dosyasının kendisi değişmeden.

**Site simgesi**: Tema panelinde bir görsel yükler ve onu simge düzenleyicide
düzenlersin: kırpmayı seçmek için görseli sürükle, yakınlaştır, parlaklık/kontrast/
doygunluğu ayarla ya da gri tonlama uygula; **Uygula** tarayıcı sekmesinde
gösterilen kare 128px'lik bir simge oluşturur. Kalem düğmesi düzenleyiciyi yeniden
açar; çarpı düğmesi simgeyi kaldırır (o zaman Urd işareti kullanılır).

**Arka planlar**: bir bölümün arka planı üst üste konabilen katmanlardan kurulur:
renk, gradyan (animasyonlu olabilir), parıltı, görsel ve doku. Katmanları
bölümün Özellikler panelinde ekle, kaldır ve sırala; her katmanın kendi denetimleri vardır.

**Animasyonlar**: bloklar ve bölümler ziyaretçiler onlara kaydırdığında
kayarak ya da belirerek girebilir (ve imleç efekti için «imleçle kalk»).
Özellikler panelinden seçilir. Düzenleyicideki önizleme son durumu gösterir;
animasyonun kendisi yayımlanan sayfada oynar. Sistemlerinde animasyonları
kapatmış ziyaretçiler (azaltılmış hareket) içeriği animasyonsuz alır.

**Metin biçimlendirme**: bir metin bloğuna (ya da bir koleksiyon kaydının
başlığına/metnine) tıkla; araç çubuğu seçimin yanında belirir: metin düzeyi,
kalın, italik, altı çizili, üstü çizili, palet simgesinin arkasında toplanmış
renkler ve vurgulama (tema renkleri, tam renk seçici ve damlalıkla özel renk,
vurgu rengiyle ya da özel renkle vurgulama ve vurgulamayı kaldırma: üzeri kırmızı
çizgili A), bağlantı (çubukta kendi alanı), hizalama, listeler, alıntı ve
biçimlendirmeyi temizleme. Tüm alanın yazı tipi ve temel boyutu Özellikler panelinde ayarlanır.
Alanın dışında herhangi bir yere tıklayınca çubuk kapanır.

**«?» yardım çipi**: özel işlevleri olan bloklar (Koleksiyon ve
Takvim gibi) üzerlerine geldiğinde sol üst köşede bir «?» gösterir.
Tüm işlevleri açıklayan bir yardım kartı için ona tıkla; kart
başka bir yere tıklayana kadar açık kalır.

**Görselleri düzenleme**: bir görsel bloğundaki görsele çift tıkla (ya da bir
koleksiyon görseline tıkla): görseli değiştir/kaldır, kırpmayı denetlemek için odak
noktasını sürükle, kırpmak için odak noktasına doğru yakınlaştır,
çerçevenin biçimini seç (geniş, kare, dikey ya da yuvarlak), parlaklık/kontrast/
doygunluğu ayarla (gri tonlama kısayolu ve sıfırlama ile),
uyum, yuvarlatma, açıklama (ekran okuyucular tarafından okunur ve görsel
yüklenemediğinde gösterilir) ve bağlantı. Düzenleyici açıkken görselin üzerinde soluk
bir üçte bir kuralı ızgarası durur (kameralardaki gibi); böylece kompozisyon yaparken
ortayı ve üçte birleri görürsün. Her şey tahribatsızdır:
özgün görsele asla dokunulmaz.

## Bölümler

Sayfa, üst üste dizilmiş bölümlerden kurulur. **+ Yeni bölüm** düğmesini almak için
iki bölümün sınırına gel: düğme hazır bölüm şablonlarından oluşan bir galeri açar;
şablonlar gruplanmıştır ve her birinin kısa bir açıklaması vardır. Tüm şablonlar
başlangıç noktalarıdır: ekledikten sonra blokları her zamanki gibi serbestçe düzenlersin
ve renkler temanı izler.

- **Temeller**: boş bölüm, hero (sola hizalı ya da iki düğmeli
  ortalanmış), görseller, iletişim ve basit alt bilgi bölümü.
- **Kartlar ve listeler**: simgeli özellik kartları, haber kartları, tarih rozetli
  ve kayıt düğmeli etkinlikler, ekip/yönetim, SSS, adım adım,
  manşet (bir büyük haber + iki küçük) ve ürünler/merch (**Satın al**
  düğmesini Özellikler panelinde bir ödeme bağlantısına, örneğin Vipps'e yönlendir).
- **Vurgu**: CTA şeridi («Üye ol»), alıntı, istatistik sayıları,
  gri tonlamalı sponsor satırı ve fiyat kademeli üyelik.

Bir bölümün sağ üstündeki araç çubuğu (üzerine geldiğinde görünür):

- **+ kart / + satır / + kişi …**: yinelenen öğeler içeren şablonlardan
  yapılan bölümlerin (özellik kartları, haberler, etkinlikler, ekip,
  SSS, adımlar, ürünler, istatistik, sponsorlar, görseller) kendi artı
  düğmesi vardır; bu düğme bir öğe daha ekler ve onu bir sonraki boş
  yuvaya hazır olarak yerleştirir. Bölüm gerektiğinde büyür ve Ctrl+Z tüm
  öğeyi tek seferde geri alır.
- ↑ / ↓ bölümü sayfada yukarı ya da aşağı taşı
- ⤓ yüksekliği içeriğe uydur
- × bölümü sil

Yüksekliği serbestçe ayarlamak için bölümün alt kenarını da sürükleyebilir ya da
iki bölümün sınırındaki **+ Yeni bölüm** düğmesini doğrudan sürükleyebilirsin (tıklama
menüyü açmaya devam eder; sürükleme sınırı taşır). Bloklar bilinçli olarak bölüm
kenarının dışına taşabilir; hiçbir şey kırpılmaz.

## Izgara (kılavuz çizgileri)

**Izgara** paneli, blokları sürüklediğinde oturdukları ızgarayı denetler.
Panel açık olduğu sürece ızgara önizlemede gösterilir.

- **Hücre boyutu**: ızgaranın ne kadar sık olduğu.
- **Izgaraya hizala**: tamamen serbest yerleştirmek için kapat. Hizalamayı geçici olarak
  devre dışı bırakmak için sürüklerken Shift'i basılı tut.
- Bir bölüm, sayfanın geri kalanından bağımsız olarak kendi ızgarasına sahip olabilir.

Izgara yalnızca düzenleme sırasında bir yardımcıdır: onu değiştirmek hiçbir zaman
içeriği taşımaz ve ziyaretçiler onu asla görmez.

## Mobil

Mobildeki ziyaretçiler içeriği otomatik olarak tek sütunda, doğal okuma
sırasıyla alır. Genelde bir şey yapman gerekmez.

- **Üst çubuktaki telefon simgesi** sayfayı mobilde nasıl göründüğüyle gösterir.
- İnce ayar yapmak istersen mobil görünümde blokları sürükle: bölüm o zaman
  **manuel mobil düzene** geçer ve her şeyi kendin yerleştirirsin. Bölümdeki ↺
  onu otomatiğe geri döndürür.
- **Mobil gözden geçirme**: mobil için elle ayarlanmış bir bölümde masaüstünde
  bir şey değiştirirsen bölüm sarı işaretlenir ve üst çubuk haber verir
  («1 bölüm mobil gözden geçirme istiyor»). Bu yalnızca şu demektir: mobil
  görünüme bir bak, her şeyin hâlâ iyi göründüğünü doğrula ve ✓ ile onayla.

## Sayfalar, menü ve tema

- **Sayfalar** paneli: yeni bir sayfa oluştur (adı yaz ve Enter'a bas),
  sayfalara yeni ad ya da yeni adres ver ya da onları × ile sil. Ana sayfa
  silinemez ve taşınamaz. Yeni sayfalar otomatik olarak menüye eklenir
  ve ziyaretçilere ancak yayımladığında görünür olur.
- **Gezinme** paneli: sayfanın üstündeki menü. Metni değiştir, her öğenin hangi
  sayfaya (ya da dış adrese) gideceğini seç, ↑/↓ ile taşı, × ile kaldır.
  Logo metin, yüklenmiş bir görsel ya da her ikisi olabilir (boyut ve
  sırayla) ve her zaman «Ana sayfa» düğmesi olarak çalışır.
  Menü öğeleri sağda, ortada ya da solda durabilir.
  Görünüm altında menünün arka plan rengini ve örtücülüğünü (0 =
  hero üzerinde saydam menü), metin rengini ve «Yapışkan menü»yü
  (ziyaretçiler aşağı kaydırırken menünün izleyip izlemediğini) denetlersin.
- **Site simgesi**: Tema panelinin altında tarayıcı sekmesinde ve yer imlerinde
  gösterilen simgeyi yüklersin (kare bir görsel önerilir).
- **Koleksiyonlar** paneli: veri olarak yaşayan ve Koleksiyon blokları tarafından
  gösterilen kayıt listeleri (haberler, duyurular, yayınlar). Bir koleksiyon oluştur,
  kayıtlar yaz (başlık, tarih, metin, görsel, bağlantı) ve sayfaya bir Koleksiyon bloğu
  koy (ya da «Haberler (koleksiyon)», «İlan panosu» ve «Yayın arşivi» bölüm
  şablonlarını kullan). Bir haber eklemek o zaman bir kayıt YAZMAK demektir -
  tüm görünümler otomatik olarak izler. Bloğun Özellikler paneli koleksiyonu,
  görünümü (kart/liste/yıla göre arşiv), sayıyı ve sıralamayı seçer.
- **Eklentiler** paneli: Urd'a yeni bloklar ve bölüm şablonları veren uzantılar.
  Panel deponun plugins/ klasöründeki eklentileri gösterir; anahtarla aç ve kapat,
  sonra her zamanki gibi yayımla. Etkin eklentiler önizlemede hemen çalışır
  (ziyaretçiler onları yayımlamadan sonra alır) ve eklentinin blokları
  bölümlerdeki **+ Yeni blok** menüsünde belirir.

  Takvim eklentisi birlikte gelir: bir Takvim bloğu (ya da «Neler oluyor»
  bölüm şablonu) ekle, blokta «⚙ Kaynaklar» düğmesine tıkla ve takvimin
  iCal adresini ya da Google takvim kimliğini yapıştır. Görünümü (Liste,
  Kartlar, Ay ya da «Sonraki») ve sayıyı seç. «Kategori: Başlık»
  biçimindeki başlıklar filtrelenebilir kategori çipleri verir, açıklamadaki bir
  kayıt bağlantısı **Kaydol** düğmesine dönüşür ve **Abone ol**
  düğmesi ziyaretçilerin takvimi kendi uygulamalarında izlemesini sağlar.

  Form eklentisi bir Form bloğu (ve «İletişim formu» şablonu) verir: alıcıyı,
  alanları ve gönderme biçimini ayarlamak için «⚙ Form» düğmesine tıkla. Varsayılan olarak
  form, ziyaretçinin e-posta istemcisini hazır bir e-postayla açar (kurulum
  gerekmez). Bunun yerine kendi uç noktana göndermek istersen (Apps Script ya da
  kendi işlevin), «Harici uç nokta» seç ve adresi yapıştır; o zaman
  _headers dosyasında o sunucu için connect-src açmalısın (blok
  satırı açıklar). Alanlar eklenebilir, değiştirilebilir ve kaldırılabilir.

  Harita eklentisi bir Harita bloğu (ve «Bizi bul» şablonu) verir: «⚙ Konum» düğmesine tıkla ve
  bir adres (örn. «Örnek Cad. 1, İstanbul»), koordinat (örneğin
  «59.913, 10.739») yaz ya da bir OpenStreetMap bağlantısı yapıştır; yakınlaştırmayı ve
  yüksekliği ayarla. **Uygula** düğmesine tıkladığında adres araması yeri
  OpenStreetMap üzerinden bulur. Harita, OpenStreetMap'in izleme içermeyen kendi gömmesidir ve
  Urd'un standart _headers dosyası buna izin verir, yani kutudan çıktığı gibi çalışır. (Başka bir
  sunucuda «frame-src https://www.openstreetmap.org» _headers içinde olmalıdır;
  harita engellenirse blok haber verir.)
- **Alt bilgi** paneli: tüm sayfaların altında gösterilen alt metin.
  Aç, satırları yaz (her satıra bir tane) ve hizalamayı seç - tek bir yerden
  düzenlenir ve tüm site için geçerlidir.
- **Tema** paneli: tüm sitenin üzerine kurulduğu renkler ve yazı tipleri. Vurgu
  rengini değiştirirsen düğmeler, bağlantılar ve vurgular her yerde onu izler.

## Taslaklar ve yayımlama

- Yaptığın her şey, sayfalar arasında da, tarayıcında taslak olarak kaydedilir.
  Üst çubuktaki «Yayımlanmamış değişiklikler» yayımlanmamış bir şeyin olduğunu gösterir.
- **Yayımla** tüm taslakları siteye çıkarır. Değişikliklerin ziyaretçilere
  görünmesi yaklaşık bir dakika sürer.
- **Taslakları at** taslakları siler ve seni sitenin yayımlanmış haline geri
  götürür. Düğme bunu yapmadan önce «Emin misin?» diye sorar (kırmızı); atmak için
  bir kez daha tıkla, iptal etmek için başka herhangi bir yere tıkla.
- **Siteyi gör ↗** yayımlanan sayfayı yeni sekmede açar.

Yayımlama, GitHub kullanıcının site sahibi tarafından yetkilendirilmiş olmasını
gerektirir ([kurulum kılavuzu](../setup-publication/SETUP-tr.md) belgesine bak).

Birkaç kişi düzenliyorsanız, sen sayfayı yükledikten sonra aynı bölümlerde
başkası değişiklik yayımladıysa düzenleyici haber verir ve yine de yayımlamak mı
yoksa önce değişikliklere bakmak mı istediğini sana seçtirir.

## Geçmiş ve bir yayımlamayı geri alma

**Geçmiş** paneli son yayımlamaları gösterir: neyin, kim tarafından ve ne zaman
değiştirildiği. **↩ Son yayımlamayı geri al**, siteyi bir önceki yayımlamadan önceki
haline döndürür. Geri alma işleminin kendisi de bir yayımlamadır; yani geçmişten
hiçbir şey silinmez ve geri almayı geri alabilirsin. Bir geri almadan sonra
düzenlemeye devam etmeden önce (yaklaşık 1 dakika sonra) admini yeniden yükle;
düzenleyici haber verir.

(Ctrl+Z, yayımlamadan ÖNCE tarayıcıdaki taslakları geri alır; Geçmiş paneli
zaten yayımlanmış olanı geri alır.)

## İlk kez

Admini tamamen yeni bir sitede açarsan kısa bir sihirbaz alırsın: sitenin
adı ve iki renk. Onun ayarladığı her şey daha sonra Tema ve
Gezinme panellerinden değiştirilebilir.
