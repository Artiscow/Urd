# Yayımlama kurulumu (GitHub + Cloudflare Pages)

[Sámegiella](SETUP-se.md) · [🇬🇧 English](SETUP-en-GB.md) · [🇳🇴 Bokmål](../../OPPSETT-PUBLISERING.md) · [🇳🇴 Nynorsk](SETUP-nn.md) · **🇹🇷 Türkçe**

docs/OPPSETT-PUBLISERING.md dosyasının çevirisi. Norveççe (bokmål) kanoniktir ve farklılık durumunda geçerlidir.

Bu kılavuz «Yayımla» düğmesini kurar: adminin değişiklikleri GitHub deposuna commit edebilmesini ve Cloudflare Pages'in bunu dağıtmasını sağlar. Bu, her web sitesi için tek seferlik bir iştir ve yaklaşık on dakika sürer. (Desen, ApeironLF'de üretimde doğrulanmıştır.)

## Ön koşullar

- Web sitesinin deposu GitHub'da olmalı (Urd geliştirmesi için: Urd deposunun kendisi).
- Bir Cloudflare hesabı (ücretsiz katman uzun süre yeter).

## 1. Depoyu Cloudflare Pages'e bağla

1. Cloudflare panosu → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Depoyu seç ve **proje adını özenle seç**: ad, adresin kendisi olur
   (`<ad>.pages.dev`), tüm Cloudflare müşterileriyle küresel olarak paylaşılır (ad alınmışsa
   rastgele bir sonek alırsın) ve sonradan DEĞİŞTİRİLEMEZ - o zaman proje silinip
   yeniden oluşturulmalıdır. Yalnızca küçük harf, rakam ve tire.
3. Derleme ayarlarında:
   - **Build command:** (boş - Urd'un derleme adımı yoktur)
   - **Build output directory:** `/`
   - **Root directory:** `template` (içeriğin kökte olduğu temiz klonlanmış bir şablon deposunda: boş bırak)
4. Dağıt. Site artık `<proje>.pages.dev` adresinde canlıdır ve `functions/` klasörü otomatik olarak alınır.

## 2. Bir GitHub OAuth uygulaması oluştur

1. GitHub → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**.
2. Doldur:
   - **Application name:** örn. «Urd publisering - Derneğim»
   - **Homepage URL:** `https://<proje>.pages.dev`
   - **Authorization callback URL:** `https://<proje>.pages.dev/api/github/callback`
3. Oluştur ve **Client ID** değerini not et.
4. **Generate a new client secret** ile gizli anahtarı üret ve not et (yalnızca bir kez gösterilir).

Daha sonra kendi alan adını kullanırsan, OAuth uygulamasındaki her iki URL'yi de güncelle.

## 3. Cloudflare'de ortam değişkenlerini ayarla

Projeye git → **Settings** → **Variables and Secrets** → **Add**.

Formda üç alan vardır: **Type**, **Variable name** ve **Value**.
Aşağıdaki gibi tam olarak doldur. Kaydet ve altısı için de tekrarla:

1. Type: Text
   Ad: `GITHUB_REPO`
   Değer: yayımlanacak depo. Bu site için: `Artiscow/Urd`

2. Type: Text
   Ad: `GITHUB_CLIENT_ID`
   Değer: OAuth uygulamasındaki Client ID (adım 2)

3. Type: **Secret**
   Ad: `GITHUB_CLIENT_SECRET`
   Değer: OAuth uygulamasındaki gizli anahtar (adım 2)

4. Type: Text
   Ad: `GITHUB_BRANCH`
   Değer: `main`

5. Type: Text
   Ad: `GITHUB_SCOPE`
   Değer: `public_repo` (herkese açık depo) ya da `repo` (özel depo)

6. Type: Text
   Ad: `ALLOWED_LOGINS`
   Değer: yayımlamasına izin verilen GitHub kullanıcı adları, virgülle ayrılmış. Örn. `Artiscow`

7. Type: Text
   Ad: `GITHUB_ROOT_DIR`
   Değer: depoda web sitesinin kökü olan alt klasör, yani adım 1'deki
   «Root directory» ile aynı değer. Urd monorepo için: `template`.
   (Web sitesi depo kökündeyse, klonlanmış bir şablon deposundaki gibi: bunu tamamen atla.)

8. Type: **Secret** (isteğe bağlı - normalde gerekmez)
   Ad: `DEPLOY_HOOK_URL`
   Değer: bir Deploy Hook URL'si (Settings → Deploy Hooks → artı işareti → branch `main`).
   Cloudflare nadir durumlarda commit doğru olsa bile bir dağıtımı atlar;
   bu ayarlıyken yayımlama dağıtımı kendisi tetikler. Yalnızca yayımlamaların
   görünmediğini yaşıyorsan aç.

Son olarak yeniden dağıtım gerekir (değişkenler ancak bir sonraki dağıtımdan itibaren geçerlidir).
En kolay yol boş bir commit'tir:

```bash
git commit --allow-empty -m "Redeploy for miljøvariabler"
git push
```

(Alternatif olarak panoda: **Deployments** → son dağıtımdaki ⋯ menüsü → **Retry deployment**.)

## 4. Doğrula

1. `https://<proje>.pages.dev/admin/` adresine git → «GitHub ile giriş yap» → yetkilendir.
2. Kullanıcı adın üst çubukta görünür (önündeki ⚠ işareti `ALLOWED_LOGINS` kaydının eksik olduğunu gösterir).
3. Bir metni değiştir ve **Yayımla** düğmesine bas. Kısa süre sonra commit depoda olur ve Cloudflare onu dağıtır (~1 dakika).

## Güvenlik modeli (kısaca)

- OAuth belirteci sunucu tarafında değiştirilir ve httpOnly çerezde saklanır; tarayıcı JS'sine hiçbir zaman ulaşmaz.
- `ALLOWED_LOGINS` yalnızca arayüzde değil, değişiklik yapan tüm uç noktalarda uygulanır.
- Yayımlama yalnızca `content/**`, `media/**` ve `plugins/plugins.json` yazabilir. Kod (`functions/`, `admin/`, `assets/engine/`), iş akışları ve güvenlik dosyaları sunucu tarafında engellenir; böylece ele geçirilmiş bir editör oturumu hiçbir şey yerleştiremez.
- Tüm gerekçe için [ADR-0003](../../adr/0003-publisering-via-github-oauth-og-pages-functions.md) belgesine bak (Norveççe).

## Yayımlama katmanının yerel testi (Urd geliştiricileri)

```bash
cd template
# legg testverdier i .dev.vars (gitignorert, ALDRI committ ekte hemmeligheter):
#   GITHUB_REPO=test/test
#   GITHUB_CLIENT_ID=fake
#   GITHUB_CLIENT_SECRET=fake
#   ALLOWED_LOGINS=dittbrukernavn
npx wrangler pages dev . --port 8788
```

O zaman site, admin ve functions birlikte `http://localhost:8788` üzerinde çalışır. Tam OAuth girişi, localhost'a callback veren gerçek bir OAuth uygulaması gerektirir; ancak 401/503 akışları ve yol koruması bunsuz da test edilebilir.

## Sorun giderme

| Belirti | Olası neden |
|---|---|
| «Publisering er ikke konfigurert: miljøvariabelen X mangler» (503) | Değişken Cloudflare'de eksik ya da dağıtım değişkenden eski |
| Girişte «Ugyldig OAuth-state» | OAuth uygulamasındaki callback URL alan adıyla eşleşmiyor ya da çerezler engelleniyor |
| «har ikke publiseringstilgang» (403) | Kullanıcı adı `ALLOWED_LOGINS` içinde yok (yazımı denetle; alan büyük/küçük harfe duyarsızdır) |
| «Kunne ikke committe til GitHub» (502) | Belirtecin kapsamı eksik (özel depo `repo` gerektirir) ya da dal yer değiştirmiş |
| Yayımlama başarılı ama site değişmiyor | `GITHUB_ROOT_DIR` eksik/yanlış: commit web sitesinin kök klasörünün dışına düşüyor (GitHub'da commit'in hangi yolları değiştirdiğini denetle) |
| Commit doğru ama hiç dağıtım görünmüyor | Git webhook'u sunucuda kaçtı (arada olur). `DEPLOY_HOOK_URL` (değişken 8) kur, yayımlama dağıtımı kendisi tetikler |
