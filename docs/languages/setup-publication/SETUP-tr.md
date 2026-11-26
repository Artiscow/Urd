# Yayımlama kurulumu (GitHub + Cloudflare Pages)

[Sámegiella](SETUP-se.md) · [🇬🇧 English](SETUP-en-GB.md) · [🇳🇴 Bokmål](SETUP-nb.md) · [🇳🇴 Nynorsk](SETUP-nn.md) · **🇹🇷 Türkçe**

SETUP-nb.md dosyasının çevirisi. İngilizce metin (SETUP-en-GB.md) kanoniktir ve farklılık durumunda geçerlidir.

Bu kılavuz siteni internete koyar ve düzenleyicideki «Yayımla» düğmesini kurar: düzenleyici değişikliklerini GitHub depona kaydeder, Cloudflare Pages de onları siteye koyar. Bunu her site için bir kez yaparsın ve yaklaşık on dakika sürer.

## İhtiyacın olanlar

- Bir GitHub hesabı.
- Bir Cloudflare hesabı (ücretsiz plan yeterlidir).

Urd'un kendisini mi geliştiriyorsun? O zaman siten Urd deposundaki `template` klasörüdür; 1. adımı atla ve Urd deposunu kullan. Başka bir şeyin farklı olduğu yerde adımlar bunu belirtir.

## 1. Sitenin deposunu oluştur

1. GitHub'da [urd-template](https://github.com/Artiscow/urd-template) deposunu aç.
2. **Use this template** → **Create a new repository** düğmesine bas.
3. Depoya bir ad ver, **Public** ya da **Private** seç ve **Create repository from template** düğmesine bas.

Aldığın depo, sitenin kendisidir. Urd'un yeni sürümleri daha sonra düzenleyicideki **Güncelleme** paneli üzerinden gelir.

## 2. Siteyi Cloudflare Pages'e koy

1. Cloudflare panosunda **Workers & Pages** → **Create application** → **Pages** → **Import an existing Git repository** yolunu izle.
2. Cloudflare henüz GitHub hesabına bağlı değilse, kendi GitHub uygulamasını kurmayı ister: hesabını seç ve **Install & Authorize** düğmesine bas. 1. adımdaki depoyu seç ve **Begin setup** düğmesine bas.
3. **Project name:** özenle seç. Sitenin adresi olur, `<ad>.pages.dev`, ve sonradan değiştirilemez (o zaman projeyi silip baştan başlaman gerekir). Adlar Cloudflare'deki herkesle paylaşılır; seninki alınmışsa Cloudflare ona birkaç rastgele harf ekler. Yalnızca küçük harf, rakam ve tire kullan.
4. Derleme ayarlarını doldur:
   - **Production branch:** `main`
   - **Framework preset:** None
   - **Build command:** boş bırak (Urd'un derleme adımı yoktur)
   - **Build output directory:** `/`
   - **Root directory:** boş bırak. Urd deposunun kendisi için **Root directory (advanced)** bölümünü aç ve **Path** değerini `template` yap.
5. **Save and Deploy** düğmesine bas. Bittiğinde site `https://<ad>.pages.dev` adresinde yayındadır.

Adresi not et: sonraki adımlar onu kullanır. Kılavuzun `<ad>.pages.dev` yazdığı yerde kendi adresini kullan.

## 3. GitHub uygulamasını oluştur

Uygulama, düzenleyiciye GitHub hesabınla giriş yapmanı sağlar ve düzenleyicinin sitenin deposuna kaydetmesine izin verir, başka hiçbir şeye değil.

1. GitHub'da profil resmine tıkla (sağ üstte) → **Settings** → **Developer settings** (soldaki menünün en altında) → **GitHub Apps** → **New GitHub App**. Depo bir kuruluşa aitse, bunun yerine kuruluştan başla: **Your organizations** → yanındaki **Settings** → **Developer settings** → **GitHub Apps** → **New GitHub App**.
2. Doldur:
   - **GitHub App name:** GitHub'da başka kimsenin almadığı, en fazla 34 karakterlik bir ad, örn. «Urd publishing sitem»
   - **Homepage URL:** sitenin adresi, `https://<ad>.pages.dev` ya da kendi alan adın
   - **Redirect URI:** `https://<ad>.pages.dev/api/github/callback`. Adresin yanında **Allow wildcard matching** seçeneği varsa onu kapalı bırak; böylece GitHub girişi tam olarak bu adrese geri gönderir, başka hiçbir adrese değil. Sitenin kendi alan adı da varsa **Add redirect URI** düğmesine bas ve o alan adını aynı şekilde ekle, örn. `https://www.example.org/api/github/callback`: yalnızca kendine ait bir Redirect URI'si olan bir adreste giriş yapabilirsin.
   - **Expire user authorization tokens** kutusunu GitHub'ın bıraktığı gibi işaretli bırak. Oturumun o zaman her seferinde sekiz saat sürer ve düzenleyici onu kendisi yeniler.
   - **Request user authorization (OAuth) during installation** kutusunu işaretsiz bırak.
   - **Webhook** altında **Active** kutusunun işaretini kaldır ve **Webhook URL** alanını boş bırak.
   - **Permissions** → **Repository permissions** altında **Contents** iznini **Read and write** yap. Diğerlerini olduğu gibi bırak.
   - **Where can this GitHub App be installed?** **Only on this account** seçeneğini seç.
3. **Create GitHub App** düğmesine bas.
4. Uygulamanın sayfasında **Client ID** değerini kopyala ve 4. adım için sakla.
5. Aynı sayfanın aşağısında, **Credentials** → **Client secrets** altında **New secret** düğmesine bas ve gizli anahtarı kopyala. GitHub onu yalnızca bir kez gösterir; kaybedersen yenisini oluştur. Sayfanın üstündeki özel anahtar (private key) iletisini görmezden gelebilirsin: Urd özel anahtar kullanmaz.
6. Uygulamayı sitenin deposuna kur: uygulamanın soldaki menüsünde **Install App** düğmesine, ardından hesabının yanındaki **Install** düğmesine bas. **Only select repositories** seçeneğini seç, 1. adımdaki depoyu seç ve **Install** düğmesine bas.

## 4. Anahtarları Cloudflare'e ver

1. Cloudflare panosunda **Workers & Pages** → projen → **Settings** → **Variables and Secrets** yolunu izle.
2. Aşağıdaki her değişken için **Add** düğmesine bas, **Type**, **Variable name** ve **Value** alanlarını doldur ve **Save** düğmesine bas. Formda tür yerine bir **Encrypt** düğmesi varsa, bir **Secret** için ona bas. Bir **Secret** kaydedildikten sonra gizlenir; bir **Text** okunabilir kalır.

Her zaman gerekli:

| Type | Variable name | Value |
|---|---|---|
| Text | `GITHUB_REPO` | Depon, `sahip/ad` biçiminde, örn. `Artiscow/sitem` |
| Text | `GITHUB_CLIENT_ID` | 3. adımdaki Client ID |
| **Secret** | `GITHUB_CLIENT_SECRET` | 3. adımdaki gizli anahtar |
| Text | `ALLOWED_LOGINS` | Yayımlamasına izin verilen GitHub kullanıcı adları, virgülle ayrılmış, örn. `Artiscow` |

Yalnızca şu durumlarda:

| Type | Variable name | Value | Ne zaman |
|---|---|---|---|
| Text | `GITHUB_BRANCH` | Dalın adı (asla `urd-drafts` değil) | Site `main` dışında bir daldan yayımlanıyor |
| Text | `GITHUB_ROOT_DIR` | `template` | Site, Urd deposunun kendisi |

3. Değişkenler bir sonraki dağıtımdan itibaren geçerli olduğu için yeniden dağıt: projede **Deployments** bölümünü aç, ardından son dağıtımdaki üç noktaya tıkla → **Retry deployment**.

## 5. Çalıştığını denetle

1. `https://<ad>.pages.dev/admin/` adresini aç, **GitHub ile giriş yap** düğmesine, ardından GitHub'ın sayfasında **Authorize** düğmesine bas.
2. GitHub kullanıcı adın üst çubukta görünür. Önündeki bir uyarı işareti, kullanıcı adının `ALLOWED_LOGINS` içinde olmadığı anlamına gelir: yazımı denetle ve yeniden dağıt.
3. Bir metni değiştir, **Yayımla** düğmesine, ardından **Şimdi yayımla** düğmesine bas. Bir an sonra değişiklik deponda kaydedilmiş olur, bir dakika sonra da sitededir.

Site kuruldu. Kılavuzun geri kalanı ihtiyaç duyduğun zamanlar içindir.

## İsteğe bağlı ayarlar

Bunları 4. adımdakiyle aynı şekilde ayarla ve her değişiklikten sonra yeniden dağıt.

| Type | Variable name | Value | Ne zaman |
|---|---|---|---|
| **Secret** | `DEPLOY_HOOK_URL` | Bir deploy hook adresi: projede **Settings** → **Builds** → **Add deploy hook** → `main` dalı | Bir yayımlama, değişiklik depoda olsa da arada bir siteye hiç ulaşmıyor. Bu ayarlıyken yayımlama dağıtımı kendisi başlatır. |
| **Secret** | `DRIVE_API_KEY` | Google Cloud'dan, Drive API'si açık bir API anahtarı | Bir arka plan görsellerini paylaşılan bir Google Drive klasöründen alıyor. Bkz. [Paylaşılan bir klasörden görseller](../setup-photos/PHOTOS-en-GB.md) (İngilizce). Google Fotoğraflar albümleri anahtar gerektirmez. |
| Text | `PHOTO_HOSTS` | Görsellerin gelebileceği sunucular, virgülle ayrılmış, örn. `sky.example.org` | Görseller bir Nextcloud ya da ownCloud paylaşımından veya başka bir adresteki bir görsel listesinden geliyor. Google'ın kendi sunucuları yerleşiktir. |
| Text | `ICS_HOSTS` | Takvimlerin gelebileceği sunucular, virgülle ayrılmış, örn. `calendar.proton.me` | Bir takvim Google Takvim dışında bir hizmetten geliyor. Bkz. [Takvim](../calendar-guide/CALENDAR-en-GB.md) (İngilizce). |
| Text | `URD_TEMPLATE_REPO` | `sahip/ad` biçiminde bir şablon deposu | Site, güncellemelerini `Artiscow/urd-template` yerine urd-template'in bir kopyasından almalı. |

## OAuth uygulamasıyla kurulmuş bir site

Bu kılavuz bir GitHub uygulaması kullanmaya başlamadan önce bir OAuth uygulamasıyla kurulmuş bir site çalışmaya devam eder. Ancak bir OAuth uygulamasının oturumu erişimin olan tüm depolara ulaşır; bu yüzden bir GitHub uygulamasına geçmek daha güvenlidir:

1. 3. adımdaki gibi, sitenin adresiyle bir GitHub uygulaması oluştur.
2. Cloudflare'de, **Variables and Secrets** altında `GITHUB_CLIENT_ID` ve `GITHUB_CLIENT_SECRET` değişkenlerine uygulamanın değerlerini ver ve varsa `GITHUB_SCOPE` değişkenini kaldır. Yeniden dağıt (4. adım).
3. Düzenleyicide, üst çubuktaki kullanıcı adının yanındaki **Oturumu kapat** düğmesine bas ve yeniden giriş yap.
4. Başka bir site hâlâ kullanmıyorsa eski OAuth uygulamasını sil: **Settings** → **Developer settings** → **OAuth Apps** → uygulama → **Advanced** (soldaki menü) → **Delete application** → **Delete this OAuth Application**.

Bir site OAuth uygulaması kullandığı sürece, özel bir depo değeri `repo` olan `GITHUB_SCOPE` değişkenini gerektirir.

## Kendi alan adın

1. Projede **Custom domains** → **Set up a domain** bölümünü aç, alan adını yaz, **Continue** düğmesine bas ve Cloudflare'in adımlarını izle.
2. GitHub'da 3. adımdaki uygulamayı aç (**Settings** → **Developer settings** → **GitHub Apps** → uygulamanın yanındaki **Edit**). Yeni alan adıyla bir **Redirect URI** daha ekle, örn. `https://www.example.org/api/github/callback`, ve `pages.dev` olanı koru; böylece iki adreste de giriş yapabilirsin. **Homepage URL** değerini yeni alan adı yap ve **Save changes** düğmesine bas.

Cloudflare'in ücretsiz planında Cloudflare, eklediğin bir alan adı için kendi ziyaret sayımını (Web Analytics) açar ve betiğini sayfalarına ekler. Gizlilik sayfası o zaman bunu ziyaretçilere söyler ve Yasal paneli bundan bahseder. Kapatmak için: Cloudflare panosunda alan adını aç → **Web Analytics** → **Manage RUM Settings** → **Disable**; Cloudflare onu yeniden açmaz. Ayarı Yasal paneline güvenmek yerine Cloudflare'de denetle: panel yalnızca ana sayfayı Cloudflare'in onu sana sunduğu hâliyle görür ve Cloudflare, AB ve Birleşik Krallık'taki veri merkezlerinden hizmet alan ziyaretçiler için betiği dışarıda bırakır.

## Ödeme almak (isteğe bağlı)

Kasa bloğu ödemeyi Vipps MobilePay, Stripe ya da PayPal üzerinden alabilir. Bir sağlayıcı olmadan sipariş formu siparişi bunun yerine e-postayla ya da bir sipariş adresine gönderir. Her sağlayıcının kendi anlaşması ve kendi anahtarları gerekir ve her birini Kasa bloğu başına, bloğun menüsündeki **Ödeme** altında açarsın. Alıcı her zaman sağlayıcının kendi sayfasında öder; bu yüzden site hiçbir zaman bir kart görmez.

Önce mağazanın para birimini Site panelinde, **Mağaza** grubu → **Mağaza para birimi** altında ayarla (NOK, DKK ya da EUR gibi bir kod). Fiyatlar bu para birimindedir ve her sağlayıcı bu para biriminde tahsil eder.

Test etmeden önce bilmekte fayda var:

- Düzenleyicide bir ödeme düğmesine basmak, sağlayıcının anahtarlarının yerinde olup olmadığını söyler. Oradan hiçbir şey gönderilmez.
- Anahtarlar yerine gelene kadar yayımlanan ödeme düğmesi alıcıya ödemenin henüz kurulmadığını söyler.
- Kasa bloğunun Ödeme grubundaki **Ödemeyi dene**, kasa sayfasını yayımlanmamış değişikliklerin ve sepetinle birlikte yeni bir sekmede açar. Ödemenin kendisi yayımlanmış olanı kullanır; bu yüzden önce kasa sayfasını ve ürünleri yayımla. Henüz yayımlanmamış bir ödeme yolu ya da ürün reddedilir ve yalnızca düzenleyicide değiştirilmiş bir fiyat, yayımlanmış fiyatından tahsil edilir.
- Bir sağlayıcı test anahtarları kullandığı sürece yayımlanan kasa, ödemelerin para çekmediğini söyleyen bir satır gösterir. Gerçek anahtarlar yerine geldiğinde bu satır kaybolur.

### Vipps MobilePay

Web üzerinden ödeme için bir Vipps MobilePay anlaşmasına (ePayment API'si) ve satış noktasının dört anahtarına ihtiyacın var. Danimarka ya da Finlandiya'daki bir MobilePay satış noktası, mağaza para birimi DKK ya da EUR olmak üzere aynı adımları izler; oradaki rezervasyonlar daha kısadır (6. adım). Aşağıdaki menü ve düğme adları portalın İngilizce görünümündendir.

1. Vipps MobilePay işletme portalında yan menüdeki **For developers** bağlantısına tıkla ve **Production** seç. Satış noktasını bul ve **Show keys** düğmesine tıkla. `client_id`, `client_secret`, birincil `Ocp-Apim-Subscription-Key` değerlerini ve satış noktasının yanında yazan satış noktası numarasını (MSN) kopyala.
2. Bunları 4. adımdaki gibi Cloudflare'e, dördünü de **Secret** olarak ekle: `VIPPS_CLIENT_ID`, `VIPPS_CLIENT_SECRET`, `VIPPS_SUBSCRIPTION_KEY` ve `VIPPS_MSN`.
3. Önce test etmek için bunun yerine **For developers** altında **Test** seç. Anlaşmayla birlikte bir test satış noktası gelir ve **Add test sales unit** bir tane daha oluşturur. Onun anahtarlarını (**Show keys**) dört gizli anahtarda kullan ve bir tane daha ekle: Type Text, `VIPPS_API_BASE`, değer `https://apitest.vipps.no`.
   - **Test users** sekmesinde **Add a new test user** ile bir test kullanıcısı oluştur. Portal ona bir telefon numarası ve bir kimlik numarası verir.
   - Vipps MT test uygulamasını kur (iOS'ta TestFlight; Android'de Vipps'in test grubuna katıldıktan sonra Google Play; geliştirici sayfaları ikisine de bağlantı verir). Test kullanıcısının telefon numarası ve kimlik numarasıyla giriş yap ve 0000 ya da 000000 koduyla onayla. Kendi Vipps hesabın test ortamında ödeme yapamaz.
4. Yeniden dağıt (4. adımdaki gibi). Düzenleyicide Kasa bloğunun menüsünü aç, **Ödeme** → «Vipps ile öde» düğmesi kutusunu işaretle ve yayımla.
5. Test et: test anahtarları yerindeyken kasa sayfası formunun en üstünde test satırını gösterir. Sepete bir ürün koy, kasa sayfasını aç ve «Vipps ile öde» düğmesine bas. Telefonda test uygulaması açılır; bilgisayarda Vipps test kullanıcısının numarasını sorar ve isteği uygulamaya gönderir. Uygulama alıcıdan adını, e-postasını ve telefonunu mağazayla paylaşmasını, ardından ödemeyi onaylamasını ister. Kasa sayfasına dönüldüğünde sepet boştur ve sayfa alıcıya adıyla teşekkür eder. Ödeme, açıklamasında sipariş satırlarıyla portaldadır ve makbuz uygulamadadır. Çalıştığında üretim anahtarlarına geç ve `VIPPS_API_BASE` değişkenini kaldır.
6. Para rezerve edilmiştir, aktarılmamıştır. Ürün gönderildiğinde siparişi portaldaki işlemler arasında bul ve **Capture** düğmesine tıkla (yalnızca bir kısmını tahsil etmek için bir tutar yaz). Norveç'teki bir satış noktasının tahsil etmek için 180 günü vardır; Danimarka ya da Finlandiya'dakinin ise, Vipps geç tahsilatı onaylamadıysa, 14 günü. Kurallar, ürün hazır olmadan tahsil etmeyi yasaklar. Bir siparişi iptal etmek için onu seç ve **Cancel transaction** düğmesine tıkla; bu, rezervasyonu hemen serbest bırakır. Portal bunu yalnızca Norveç'teki satış noktaları için sunar. Hiç tahsil edilmeyen bir rezervasyon süre dolduğunda serbest bırakılır.
7. İsteğe bağlı, mağazayla v1.1'de gelecek sipariş bildirimleri için: Vipps'in siteye ödemeleri bildirmesi için bir webhook kaydet. Site henüz hiçbir şey saklamaz, ama `/api/pay/vipps/webhook` adresi hazırdır ve kaydın gizli anahtarıyla imzalanmamış her teslimatı reddeder. Onu aşağıdaki komutlarla kaydet ve yanıttaki `secret` değerini Cloudflare'e **Secret** `VIPPS_WEBHOOK_SECRET` olarak koy:

```bash
# Erişim token'ı (üretimde 24 saat, test ortamında 1 saat geçerli).
# Test ortamında https://apitest.vipps.no adresini ve test anahtarlarını kullan; her ortamdaki kaydın kendi gizli anahtarı vardır.
curl -X POST https://api.vipps.no/accesstoken/get \
  -H "client_id: <client_id>" -H "client_secret: <client_secret>" \
  -H "Ocp-Apim-Subscription-Key: <abonelik anahtarı>" -H "Merchant-Serial-Number: <MSN>"

# Kayıt; yanıttaki secret VIPPS_WEBHOOK_SECRET içine girer
curl -X POST https://api.vipps.no/webhooks/v1/webhooks \
  -H "Authorization: Bearer <access_token>" \
  -H "Ocp-Apim-Subscription-Key: <abonelik anahtarı>" -H "Merchant-Serial-Number: <MSN>" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://<site>/api/pay/vipps/webhook","events":["epayments.payment.authorized.v1"]}'
```

### Stripe (kart, Apple Pay, Google Pay, Klarna ve daha fazlası)

Stripe sayfası kartları, Apple Pay, Google Pay, Klarna, MobilePay ve Stripe panosunda açtığın diğer yöntemleri çoğu para biriminde kabul eder.

1. Bir Stripe hesabı oluştur ve önce bir sandbox'ta test et (panodaki hesap seçicide **Sandboxes**). **API keys** sayfasında (`dashboard.stripe.com/apikeys`) **Create restricted key** düğmesine tıkla, **Checkout Sessions** için Write, **Payment Intents** için Read ver ve geri kalanını None'da bırak (Stripe bunu tam gizli anahtara tercih edilecek yol olarak önerir). Anahtarı (`rk_test_…`; `sk_test_…` gizli anahtarı da çalışır) Cloudflare'e **Secret** `STRIPE_SECRET_KEY` olarak ekle ve yeniden dağıt. Bir test ödemesi başarısız olursa anahtarın **View request logs** bölümü hangi iznin eksik olduğunu gösterir.
2. **Settings** → **Payment methods** altında istediğin yöntemleri aç. Apple Pay ve Google Pay, onları destekleyen cihazlarda Stripe sayfasında kendiliğinden görünür. Sonuçlanması günler süren yöntemleri (SEPA Direct Debit, banka havaleleri) kapalı bırak: kasa sayfası yalnızca hemen onaylananı onaylar, bu yüzden alıcıya teşekkür edilmezdi.
3. Düzenleyicide Kasa bloğunun menüsünü aç, **Ödeme** → **Kart ödemesi**: Stripe. **Parayı al** ne zaman alınacağını söyler:
   - *Gönderdiğimde* tutarı bloke eder ve ürün gönderildiğinde onu Stripe panosunda tahsil edersin (kartlar 7 gün, Klarna 28 gün bloke kalır).
   - *Siparişte* parayı hemen çeker; üyelik ya da bilet gibi hemen teslim edilenler için.

   Yayımla.
4. Test et: test anahtarı yerindeyken kasa sayfası formunun en üstünde test satırını gösterir. Sepete bir ürün koy ve «Kartla öde» düğmesine bas. Stripe sayfasında `4242 4242 4242 4242` kart numarası, gelecekteki herhangi bir tarih ve rastgele üç rakamla öde. Kasa sayfasına dönüldüğünde sepet boştur ve sayfa alıcıya Stripe'ın topladığı adla teşekkür eder. Sandbox ödemeleri arasında ödeme **Uncaptured** (Gönderdiğimde: ürün gönderildiğinde onu aç ve **Capture** düğmesine tıkla) ya da **Succeeded** (Siparişte) olarak görünür. `4000 0000 0000 9995` kartı reddedilen bir kartı gösterir ve sepet olduğu gibi kalır.
5. İsteğe bağlı, mağazayla v1.1'de gelecek sipariş bildirimleri için: Workbench'teki **Webhooks** sayfasında (`dashboard.stripe.com/webhooks`) **Create an event destination** düğmesine tıkla, **Your account** ve **Snapshot** yükünü seç, `checkout.session.completed` olayını seç, **Webhook endpoint** seç ve `https://<site>/api/pay/stripe/webhook` adresini ver. **Reveal secret** düğmesine tıkla ve imzalama gizli anahtarını (`whsec_…`) Cloudflare'e **Secret** `STRIPE_WEBHOOK_SECRET` olarak kopyala. Site henüz hiçbir şey saklamaz ve gizli anahtarla imzalanmamış ya da beş dakikadan eski her teslimatı reddeder.
6. Çalıştığında **API keys** sayfasını sandbox'tan canlı moda geçir ve Stripe'ın hesabı etkinleştiren canlıya geçiş kontrol listesini tamamla. Aynı şekilde canlı bir kısıtlı anahtar oluştur (`rk_live_…`; Stripe onu yalnızca bir kez gösterir). Webhook'u canlı modda yeniden oluştur, çünkü onun kendi imzalama gizli anahtarı vardır. İkisini de sandbox değerlerinin yerine Cloudflare'e koy.

### PayPal

PayPal sayfası alıcının PayPal hesabını ya da PayPal'ın sunduğu yerlerde hesapsız kartı, PayPal'ın kabul ettiği para birimlerinde kabul eder (NOK, DKK, SEK, EUR, GBP, USD ve diğerleri; ISK değil, HUF, JPY ve TWD ise yalnızca tam birimlerle). PayPal parayı siparişte çeker, çünkü rezerve edilmiş bir ödemeyi yalnızca 3 gün garanti eder; bu yüzden teslim edemediğin bir siparişin ücretini PayPal hesabında iade edersin.

1. PayPal Business hesabınla `developer.paypal.com` adresinde giriş yap (**Log in to Dashboard**). **Apps & Credentials** altında, geçiş düğmesi **Sandbox** konumundayken **Default Application** uygulamasını kullan ya da **Create App** ile bir tane oluştur ve **Client ID** ile **Secret** değerlerini kopyala. Bunları Cloudflare'e **Secret** `PAYPAL_CLIENT_ID` ve `PAYPAL_CLIENT_SECRET` olarak ekle ve Type Text `PAYPAL_API_BASE` değişkenini `https://api-m.sandbox.paypal.com` değeriyle ekle. Yeniden dağıt.
2. Düzenleyicide Kasa bloğunun menüsünü aç, **Ödeme** → «PayPal ile öde» düğmesi kutusunu işaretle ve yayımla.
3. Test et: sandbox anahtarları yerindeyken kasa sayfası formunun en üstünde test satırını gösterir. **Testing Tools** → **Sandbox Accounts** altında geliştirici hesabının kişisel (alıcı) bir sandbox hesabı vardır; **⋮** → **View/Edit Account** onun e-postasını ve parolasını gösterir. Sepete bir ürün koy, «PayPal ile öde» düğmesine bas ve PayPal sayfasında alıcı hesabıyla giriş yap. Kasa sayfasına dönüldüğünde sepet boştur ve sayfa alıcıya adıyla teşekkür eder; ödeme, `sandbox.paypal.com` adresindeki işletme sandbox hesabında tamamlanmış olarak görünür. PayPal sayfasında «Cancel» düğmesine basarsan sepet korunmuş olarak kasaya geri dönersin.
4. İsteğe bağlı, mağazayla v1.1'de gelecek sipariş bildirimleri için: uygulamanın sayfasında `https://<site>/api/pay/paypal/webhook` adresi ve `PAYMENT.CAPTURE.COMPLETED` olayıyla bir webhook ekle ve webhook'un kimliğini (ID) Cloudflare'e Type Text `PAYPAL_WEBHOOK_ID` olarak kopyala. Site henüz hiçbir şey saklamaz; her teslimat için onu PayPal'ın gönderip göndermediğini PayPal'a sorar ve geri kalanını reddeder. Sandbox ile canlı uygulamanın ayrı webhook kimlikleri vardır.
5. Canlıya geçmek için doğrulanmış bir PayPal Business (ya da Premier) hesabı gerekir. **Apps & Credentials** ayarını **Live** konumuna getir ve canlı uygulamanın **Client ID** ve **Secret** değerlerini al (PayPal önce uygulamayı 24 ila 72 saat içinde inceleyebilir). Bunları iki gizli anahtara yaz, canlı hizmetin kullanılması için `PAYPAL_API_BASE` değişkenini kaldır ve kullanıyorsan webhook'u canlı uygulama için yeniden ekle.

## Kayıtlı taslaklar

Düzenleyicideki Taslaklar penceresi taslakları GitHub'a kaydeder; böylece onları başka bir cihazda açabilirsin. Taslaklar, ilk kaydın oluşturduğu kendilerine ait bir dala, `urd-drafts` dalına gider. Bunun için hiçbir şey kurulması gerekmez, ama üç şeyi bilmekte fayda var:

- **Kayıtlar siteye asla ulaşmaz.** Her kayıt, Cloudflare ondan hiçbir şey derlemeyecek şekilde işaretlenir: yayımlanan siteye asla ulaşmaz, projenin derlemelerinden birini asla kullanmaz ve Geçmiş'te asla görünmez.
- **Dalı önizleme derlemelerinin dışında tut.** Cloudflare varsayılan olarak her dalın bir önizlemesini derler. Güvende olmak için `urd-drafts` dalını dışarıda tut: projede **Settings** → **Builds** → **Branch control**, ve **Preview branch** altında **None** seç ya da dahil edilen dallar arasında `*`, dışarıda tutulanlar arasında `urd-drafts` olan **Custom branches** seç.
- **Tüm dallardaki kurallar kayıtları durdurur.** Tüm dalları kapsayan bir GitHub kural kümesi (ruleset) ya da dal koruması (örneğin dal oluşturmayı kısıtlayan ya da bir pull request isteyen biri) kayıtları da durdurur ve Taslaklar «GitHub, kayıtlı taslakların bulunduğu dalı (urd-drafts) reddetti; kurulum kılavuzuna bakın» der. Dalı dışarıda tut: depoda **Settings** → **Rules** → **Rulesets** → kural kümesi → **Target branches** → **Add target** → **Exclude by pattern** → `urd-drafts`. **Settings** → **Branches** altındaki, deseni `*` olan klasik bir koruma kuralı için deseni `main` olarak değiştir.

Herkese açık bir depoda, deponun geri kalanını okuyabildikleri gibi kayıtlı taslakları ve üzerlerindeki notları da herkes okuyabilir.

## Yayımlama nasıl güvende tutulur

- Oturumun yalnızca sitenin deposuna ulaşır ve her seferinde sekiz saat sürer; düzenleyici onu kendisi yeniler. Sayfanın kendi betiklerinin okuyamadığı bir çerezde tutulur.
- Yalnızca `ALLOWED_LOGINS` içindeki kullanıcı adları yayımlayabilir; site bunu yalnızca düzenleyicide değil, her değişiklikte denetler.
- Yayımlama yalnızca sitenin içeriğini ve medyasını, eklenti listesini, site haritasını, `robots.txt` dosyasını, yönlendirmeleri ve sitenin kendi `index.html` dosyasının her sayfadaki kopyasını yazabilir ve bir eklentinin klasörünü silebilir. Sitenin kodu ve güvenlik dosyaları reddedilir; böylece bir düzenleme oturumunu ele geçiren biri kod yerleştiremez.
- Taslak kaydetmek yalnızca `urd-drafts` dalına yazar, asla sitenin kendi dalına değil.

## Yayımlamayı yerelde test etme (Urd geliştiricileri)

```bash
cd template
# Test değerlerini .dev.vars dosyasına koy (git tarafından yok sayılır; gerçek gizli anahtarları asla commit etme):
#   GITHUB_REPO=test/test
#   GITHUB_CLIENT_ID=fake
#   GITHUB_CLIENT_SECRET=fake
#   ALLOWED_LOGINS=kullaniciadin
npx wrangler pages dev . --port 8788
```

O zaman site, düzenleyici ve işlevler (Functions) birlikte `http://localhost:8788` üzerinde çalışır. Tam bir giriş, **Redirect URI** değeri localhost'a, `http://localhost:8788/api/github/callback` adresine giden gerçek bir GitHub uygulaması gerektirir; ancak hata yanıtları ve yol denetimleri onsuz da test edilebilir.

## Sorun giderme

| Gördüğün | Olası neden |
|---|---|
| «Yayımlama yapılandırılmamış: X ortam değişkeni eksik» | Değişken Cloudflare'de eksik ya da site, değişken eklendiğinden beri dağıtılmadı (4. adım) |
| Giriş yaparken GitHub «The redirect_uri is not associated with this application» diyor | GitHub uygulamasındaki hiçbir **Redirect URI**, düzenleyiciyi açtığın adresi içermiyor; kendi alan adının kendine ait bir tane olmalı (bkz. «Kendi alan adın») |
| Girişte «Invalid OAuth state (try signing in again)» | GitHub'ın sayfasında Cancel düğmesine bastın, orada on dakikadan fazla geçti ya da tarayıcı çerezleri engelliyor; yeniden giriş yap |
| Giriş yaparken GitHub bir 404 sayfası gösteriyor | Cloudflare'deki Client ID uygulamanınki değil ya da site, o eklendiğinden beri dağıtılmadı |
| Yayımlarken «GitHub oturumu reddetti (süresi dolmuş token?) - yeniden oturum açın» ya da Taslaklar, Geçmiş veya Güncelleme'de «Geçersiz veya süresi dolmuş oturum» | Oturumun süresi doldu ya da GitHub tarafında sonlandırıldı. Oturumu kapatıp yeniden giriş yap |
| ««X» GitHub kullanıcısının yayımlama erişimi yok» | Kullanıcı adı `ALLOWED_LOGINS` içinde değil (yazımı denetle; büyük ve küçük harf fark etmez) |
| «GitHub'a commit gönderilemedi» | GitHub uygulaması sitenin deposuna kurulmamış ya da **Contents** izni **Read and write** değil; bir OAuth uygulamasıyla: depo özel ve `GITHUB_SCOPE` değeri `repo` değil. Birinin dalı aynı anda değiştirmiş olması da mümkün |
| Yayımlama çalışıyor ama site değişmiyor | `GITHUB_ROOT_DIR` eksik ya da yanlış, bu yüzden değişiklik sitenin klasörünün dışına düşüyor (değişikliğin GitHub'da hangi dosyalara dokunduğunu denetle) |
| Kasa sayfasında «Bu site için ödeme henüz kurulmadı» | Dört Vipps gizli anahtarından biri Cloudflare'de eksik ya da site, bunlar eklendiğinden beri dağıtılmadı |
| «Kartla öde» ödemenin kurulmadığını söylüyor | `STRIPE_SECRET_KEY` eksik, gizli anahtar yerine yayımlanabilir anahtar (`pk_…`) girilmiş ya da site, o eklendiğinden beri dağıtılmadı |
| «PayPal ile öde» PayPal'ın para birimini kabul etmediğini söylüyor | Mağaza para birimi PayPal'ın kabul etmediği bir birim (ISK) ya da bir fiyatta HUF, JPY veya TWD için ondalık var; PayPal bunları yalnızca tam birimlerle kabul eder |
| Vipps ödemesi uygulama açılmadan başarısız oluyor | Anahtarlar üretim anahtarlarıyken `VIPPS_API_BASE` test ortamını gösteriyor ya da tersi |
| Değişiklik depoda ama hiç dağıtım görünmüyor | Cloudflare değişikliği kaçırdı (arada bir olur). `DEPLOY_HOOK_URL` ayarla (bkz. İsteğe bağlı ayarlar); yayımlama dağıtımı kendisi başlatır |
| Taslaklar'da «GitHub, kayıtlı taslakların bulunduğu dalı (urd-drafts) reddetti» | Bir kural kümesi ya da dal koruması tüm dalları kapsıyor; `urd-drafts` dalını dışarıda tut (bkz. [Kayıtlı taslaklar](#kayıtlı-taslaklar)) |
