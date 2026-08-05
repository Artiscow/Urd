<p align="center">
  <img src="../../brand/urd-logo-turkis.svg" alt="Urd" width="200">
</p>

[Sámegiella](README-se.md) · [🇬🇧 English](../../../README.md) · [🇳🇴 Bokmål](README-nb.md) · [🇳🇴 Nynorsk](README-nn.md) · **🇹🇷 Türkçe**

README çevirisi. Depo kökündeki ana sürüm İngilizcedir.

> Urd, İskandinav mitolojisinde Yggdrasil'in dibinde oturup tanrıların kaderini belirleyen üç nornadan muhtemelen en yaşlısıdır. Nornalar birlikte oturur, kader ipliklerini eğirir ya da kaderi ağaç parçalarına kazır.
> Urd, kendi web siteni ağacın kökünden eğirmek ve kazımak için bir araçtır.

**Adı nasıl okunur:** *Urd* kabaca **uurd** diye okunur (Norveççe [ʉːɖ]). Ünlü, Türkçedeki "u" ile "ü" arasında bir sestir: dudaklar yuvarlak ve öne doğru. "rd" ise dilin ucu geriye kıvrılarak tek bir sese dönüşür. İngilizcedeki *weird* sözcüğü de aynı kökten gelir: Eski İngilizce *wyrd*, yani kader.

**Durum: geliştirme aşamasında - henüz kullanıma hazır değil.** Nereye geldiğimizi görmek için [yol haritasına](../../VEIKART.md) bak.

## Urd nedir?

Urd, **klonladığın deponun kendisinin web siten olduğu** açık kaynaklı bir web sitesi kurucusudur - ve web sitesi kendi kurucusudur. Squarespace, Wix ve Publii'ye ücretsiz, statik, git ile sahip olunan bir alternatif.

Sunucu yok. Veritabanı yok. Abonelik yok. Derleme süreci yok. Yalnızca kendi sahip olduğun okunabilir dosyalardan oluşan ve herhangi bir statik sunucunun (Cloudflare Pages, GitHub Pages, …) yayımlayabileceği bir git deposu.

## Nasıl çalışır

1. [urd-template](https://github.com/Artiscow/urd-template) şablonundan **kendi deponu oluştur** (GitHub'da «Use this template») ve statik bir sunucuya bağla: [kurulum kılavuzu](../setup-publication/SETUP-tr.md) her adımda yol gösterir.
2. Siteni kurulum sihirbazıyla **kur** - ad, renkler, logo.
3. `siten.org/admin` adresine giderek ve GitHub ile giriş yaparak **düzenle**. Kurucunun tamamı orada: sayfanın üzerine tıklayıp doğrudan yaz, blokları ızgarada serbestçe sürükle, bölümler ekle, arka planları, renkleri ve gezinmeyi düzenle.
4. **Yayımla** - tek tıklama değişikliklerinle tek bir git commit oluşturur ve sunucu yeni sayfayı bir dakikadan kısa sürede yayımlar.
5. **Güncelle** - yönetici panelindeki Güncelleme bölümü yeni Urd sürümlerini şablon deposundan tek commit olarak getirir ve elle düzenlediğin dosyalar için uyarır.

İlk kurulumdan sonra admin sayfası web sitenin kontrol merkezidir. Sayfada gördüğün her şey oradan düzenlenebilir.

Urd, deponda yaşayan ve adminden açılan **eklentilerle** genişletilebilir. Referans olarak üç tanesi birlikte gelir: takvim (dört görünümlü, abone olunabilir akış), iletişim formu (mailto ya da kendi uç noktan) ve harita (gizlilik dostu OpenStreetMap). Kendi eklentini yapmak için [template/plugins/README.md](../../../template/plugins/README.md) dosyasına bak.

## Dört söz

1. **Her şeye sen sahipsin.** Siten, okunabilir dosyalardan oluşan bir git deposudur. Kilitlenme yok.
2. **Bir güncelleme kurulmuş bir siteyi asla bozmaz.** Tüm içerikte `version` ve eski verileri güvenle ileri taşıyan geçişler vardır.
3. **Web sitesi derleme süreci gerektirmez.** Depoda ne varsa tarayıcının yüklediği tam olarak odur.
4. **Ödünsüz WYSIWYG.** Admin gerçek sayfayı gösterir - aynı motor, aynı dosyalar.

## Diller

Düzenleyici ve motorun ziyaretçilere gösterdiği metinler Kuzey Sami dili, İngiliz İngilizcesi, Norveççe (bokmål ve nynorsk) ve Türkçe olarak vardır. Yönetim dili öntanımlı olarak cihazınızın dilini izler ve tarayıcı başına hatırlanır; ziyaretçilerin gördüğü dil Site panelinden seçilir. Bir çeviriyi eklemek ya da iyileştirmek, derleme adımı olmayan düz bir dosya değişikliğidir; bkz. [CONTRIBUTING.md](../../../CONTRIBUTING.md) (Norveççe). Urd'un yerleşik olarak sunmadığı bir dil, dil paketi olarak eklenebilir: yalnızca çeviri dosyalarından oluşan ve Eklentiler panelinden açılan bir eklenti.

## Belgeler

Belgeler Norveççe yazılmıştır; aşağıdaki açıklamalar çevrilmiştir.

| Belge | İçerik |
|---|---|
| [docs/VISJON.md](../../VISJON.md) | Urd'un ne olduğu, kimin için olduğu ve tüm kararları yöneten sözler (Norveççe) |
| [docs/ARKITEKTUR.md](../../ARKITEKTUR.md) | Sistem genel bakışı: motor, düzenleyici, yayımlama akışı (Norveççe) |
| [docs/SKJEMA.md](../../SKJEMA.md) | Veri modeli - her şeyin üzerine kurulduğu sözleşme (Norveççe) |
| [docs/VEIKART.md](../../VEIKART.md) | İskeletten v1.0'a kadar aşamalar (Norveççe) |
| [docs/BRUKERVEILEDNING.md](../../BRUKERVEILEDNING.md) | Site sahipleri için: düzenleyicinin kodsuz kullanımı (Norveççe) |
| [docs/UTVIKLING.md](../../UTVIKLING.md) | Urd'u geliştiren bizler için: kurulum, kurallar, sık yapılan işler (Norveççe) |
| [docs/OPPSETT-PUBLISERING.md](../setup-publication/SETUP-tr.md) | Tek seferlik yayımlama kurulumu: GitHub OAuth uygulaması + Cloudflare |
| [docs/BACKLOG.md](../../BACKLOG.md) | Güncel görev listesi: yapılacaklar, hatalar ve öneriler (Norveççe) |
| [docs/TESTRUNDER.md](../../TESTRUNDER.md) | Sahibin kontrol listesi: test bekleyen teslim edilmiş işler (Norveççe) |
| [docs/sammenligning/FUNKSJONSKART.md](../../sammenligning/FUNKSJONSKART.md) | Diğer web sitesi kurucularıyla özellik karşılaştırması ve boşluk analizi (Norveççe) |
| [docs/sammenligning/LAERDOMMER.md](../../sammenligning/LAERDOMMER.md) | Diğer web sitesi kurucularının nasıl kurulduğu ve bizim neler alabileceğimiz (mimari ve desenler) (Norveççe) |
| [docs/sammenligning/ELEMENTKART.md](../../sammenligning/ELEMENTKART.md) | Öğeler ve işlevler: kullanıcıya nasıl sunulduğu ve nasıl kurulduğu (Norveççe) |
| [docs/CHANGELOG.md](../../CHANGELOG.md) | Her push için değişiklik günlüğü (Norveççe) |
| [CONTRIBUTING.md](../../../CONTRIBUTING.md) | Nasıl katkı verilir: fork, dal, testler, pull request (Norveççe) |
| [docs/adr/](../../adr/) | Gerekçeleriyle mimari kararlar (Norveççe) |

## Lisans

[MIT](../../../LICENSE)
