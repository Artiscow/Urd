<p align="center">
  <img src="../../brand/urd-logo-turkis.svg" alt="Urd" width="200">
</p>

[Sámegiella](README-se.md) · [🇬🇧 English](../../../README.md) · [🇳🇴 Bokmål](README-nb.md) · [🇳🇴 Nynorsk](README-nn.md) · **🇹🇷 Türkçe**

README çevirisi. Depo kökündeki ana sürüm İngilizcedir.

<p align="center">
  <a href="https://github.com/Artiscow/Urd/actions/workflows/tests.yml"><img src="https://github.com/Artiscow/Urd/actions/workflows/tests.yml/badge.svg" alt="Testler"></a>
  <a href="https://github.com/Artiscow/Urd/releases"><img src="https://img.shields.io/github/v/release/Artiscow/Urd?label=release&color=15b39a" alt="Release"></a>
</p>

<p align="center">
  <a href="../setup-publication/SETUP-tr.md"><strong>Başla</strong></a> ·
  <a href="../user-guide/GUIDE-tr.md"><strong>Kullanıcı kılavuzu</strong></a> ·
  <a href="../ROADMAP-en-GB.md"><strong>Yol haritası</strong></a>
</p>

> Urd, İskandinav mitolojisinde Yggdrasil'in dibinde oturup tanrıların kaderini belirleyen üç nornadan muhtemelen en yaşlısıdır. Nornalar birlikte oturur, kader ipliklerini eğirir ya da kaderi ağaç parçalarına kazır.
> Urd, kendi web siteni ağacın kökünden eğirmek ve kazımak için bir araçtır.

**Adı nasıl okunur:** *Urd* [ʉːɖ], kabaca **uurd**.

**Durum: geliştirme aşamasında - henüz kullanıma hazır değil.** Nereye geldiğimizi görmek için [yol haritasına](../ROADMAP-en-GB.md) bak.

## Urd nedir?

Urd, **klonladığın deponun kendisinin web siten olduğu** açık kaynaklı bir web sitesi kurucusudur - ve web sitesi kendi kurucusudur. Squarespace, Wix ve Publii'ye ücretsiz, statik, git ile sahip olunan bir alternatif.

Sunucu yok. Veritabanı yok. Abonelik yok. Derleme süreci yok. Yalnızca kendi sahip olduğun okunabilir dosyalardan oluşan bir git deposu. Bugün site Cloudflare Pages üzerinde çalışır: sayfaları o sunar, `/admin` üzerinden giriş ve yayımlamayı da Functions üstlenir. Herhangi bir statik sunucudan (GitHub Pages, Netlify, kendi sunucun) yayımlanabilmesi v0.9 için planlanmıştır.

## Nasıl çalışır

1. [urd-template](https://github.com/Artiscow/urd-template) şablonundan **kendi deponu oluştur** (GitHub'da «Use this template») ve Cloudflare Pages'e bağla: [kurulum kılavuzu](../setup-publication/SETUP-tr.md) her adımda yol gösterir.
2. Siteni kurulum sihirbazıyla **kur** - ad, renkler, logo.
3. `siten.org/admin` adresine giderek ve GitHub ile giriş yaparak **düzenle**. Kurucunun tamamı orada: sayfanın üzerine tıklayıp doğrudan yaz, blokları ızgarada serbestçe sürükle, bölümler ekle, arka planları, renkleri ve gezinmeyi düzenle.
4. **Yayımla** - tek tıklama değişikliklerinle tek bir git commit oluşturur ve sunucu yeni sayfayı bir dakikadan kısa sürede yayımlar.
5. **Güncelle** - yönetici panelindeki Güncelleme bölümü yeni Urd sürümlerini şablon deposundan tek commit olarak getirir ve elle düzenlediğin dosyalar için uyarır.

İlk kurulumdan sonra admin sayfası web sitenin kontrol merkezidir. Sayfada gördüğün her şey oradan düzenlenebilir.

Takvim (beş görünüm ve 34 tasarımda bir iCal akışı; etkinlik kartı, arama ve filtrelerle), iletişim formu (mailto ya da kendi uç noktan) ve harita (gizlilik dostu OpenStreetMap), Bloklar panelindeki çekirdek bloklardır. Urd ayrıca deponda yaşayan ve adminden açılan **eklentilerle** genişletilebilir. Birlikte gelen tek eklenti İsveççe dil paketidir; o aynı zamanda eklenti yazanlar için örnektir. Kendi eklentini yapmak için [template/plugins/README.md](../../../template/plugins/README.md) dosyasına bak.

## Dört söz

1. **Her şeye sen sahipsin.** Siten, okunabilir dosyalardan oluşan bir git deposudur. Kilitlenme yok.
2. **Bir güncelleme kurulmuş bir siteyi asla bozmaz.** Tüm içerikte `version` ve eski verileri güvenle ileri taşıyan geçişler vardır.
3. **Web sitesi derleme süreci gerektirmez.** Depoda ne varsa tarayıcının yüklediği tam olarak odur.
4. **Ödünsüz WYSIWYG.** Admin gerçek sayfayı gösterir - aynı motor, aynı dosyalar.

## Diller

Düzenleyici ve motorun ziyaretçilere gösterdiği metinler Kuzey Sami dili, İngiliz İngilizcesi, Norveççe (bokmål ve nynorsk) ve Türkçe olarak vardır. Yönetim dili öntanımlı olarak cihazınızın dilini izler ve tarayıcı başına hatırlanır; ziyaretçilerin gördüğü dil Site panelinden seçilir. Bir çeviriyi eklemek ya da iyileştirmek, derleme adımı olmayan düz bir dosya değişikliğidir; bkz. [CONTRIBUTING.md](../../../CONTRIBUTING.md) (Norveççe). Urd'un yerleşik olarak sunmadığı bir dil, dil paketi olarak eklenebilir: yalnızca çeviri dosyalarından oluşan ve Eklentiler panelinden açılan bir eklenti.

## Belgeler

Projenin ana dili İngilizcedir. Yalnızca Norveççe olan belgeler işaretlenmiştir; değişiklik günlüğü, iş listesi ve test listesinde eski kayıtlar Norveççe, yeniler İngilizcedir.

| Belge | İçerik |
|---|---|
| [Vizyon](../VISION-en-GB.md) | Urd'un ne olduğu, kimin için olduğu ve tüm kararları yöneten sözler (İngilizce) |
| [docs/ARCHITECTURE.md](../../ARCHITECTURE.md) | Sistem genel bakışı: motor, düzenleyici, yayımlama akışı (İngilizce) |
| [docs/SCHEMA.md](../../SCHEMA.md) | Veri modeli - her şeyin üzerine kurulduğu sözleşme (İngilizce) |
| [Yol haritası](../ROADMAP-en-GB.md) | İskeletten v1.0'a kadar aşamalar (İngilizce) |
| [Kullanıcı kılavuzu](../user-guide/GUIDE-tr.md) | Site sahipleri için: düzenleyicinin kodsuz kullanımı |
| [Geliştirme](../DEVELOPMENT-en-GB.md) | Urd'u geliştiren bizler için: kurulum, kurallar, sık yapılan işler (İngilizce) |
| [Yayımlama kurulumu](../setup-publication/SETUP-tr.md) | Tek seferlik yayımlama kurulumu: GitHub OAuth uygulaması + Cloudflare |
| [Paylaşılan bir klasörden resimler](../setup-photos/PHOTOS-en-GB.md) | Bir Google Drive klasöründen, Google Fotoğraflar albümünden ya da Nextcloud paylaşımından arka plan resimleri ve gereken Cloudflare değişkenleri (İngilizce) |
| [Takvim](../calendar-guide/CALENDAR-en-GB.md) | Site sahipleri için: takvim hizmetleri, toplantı bağlantıları, kayıt, haritalar ve Takvim bloğunun bir etkinlikten okudukları (İngilizce) |
| [docs/BACKLOG.md](../../BACKLOG.md) | Güncel görev listesi: yapılacaklar, hatalar ve öneriler (eski kayıtlar Norveççe) |
| [docs/TESTRUNDER.md](../../TESTRUNDER.md) | Elle test kontrol listesi: test bekleyen teslim edilmiş işler (eski kayıtlar Norveççe) |
| [docs/sammenligning/FUNKSJONSKART.md](../../sammenligning/FUNKSJONSKART.md) | Diğer web sitesi kurucularıyla özellik karşılaştırması ve boşluk analizi (Norveççe) |
| [docs/sammenligning/LAERDOMMER.md](../../sammenligning/LAERDOMMER.md) | Diğer web sitesi kurucularının nasıl kurulduğu ve bizim neler alabileceğimiz (mimari ve desenler) (Norveççe) |
| [docs/sammenligning/ELEMENTKART.md](../../sammenligning/ELEMENTKART.md) | Öğeler ve işlevler: kullanıcıya nasıl sunulduğu ve nasıl kurulduğu (Norveççe) |
| [docs/CHANGELOG.md](../../CHANGELOG.md) | Her commit ve push için değişiklik günlüğü (eski kayıtlar Norveççe) |
| [CONTRIBUTING.md](../../../CONTRIBUTING.md) | Nasıl katkı verilir: fork, dal, testler, pull request (Norveççe) |
| [docs/adr/](../../adr/) | Gerekçeleriyle mimari kararlar (İngilizce) |

## Lisans

[MIT](../../../LICENSE)
