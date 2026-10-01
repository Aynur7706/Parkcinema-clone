# Park Cinema klonu

Park Cinema görünüşünü təkrarlayan React layihəsi. Film və seans məlumatları mövcud `https://parkcinema-data-eta.vercel.app` API-sindən alınır.

## İşə salmaq

```bash
npm install
npm run dev
```

Brauzerdə terminalın göstərdiyi lokal ünvanı açın.

```bash
npm run build
npm run preview
npm run lint
npm test
```

## Kodun quruluşu

```text
src/
  app/
    CinemaApp.jsx             # Səhifənin ümumi quruluşu
    routes/CinemaRoutes.jsx   # Mövcud səhifə ünvanları
    store.js                  # Redux konfiqurasiyası
  features/
    catalog/                  # Filmlər, filtrlər və seans cədvəli
    booking/                  # Oturacaq seçimi və ödəniş səhifəsi
    auth/                     # Giriş, qeydiyyat və form yoxlamaları
    theatres/                 # Kinoteatr səhifələri və məlumatları
    information/              # FAQ, aksiyalar və əlaqə
  shared/
    api/cinemaApi.js          # Film və seans sorğuları
    hooks/                    # Ortaq React hook-ları
    layout/                   # Başlıq, altlıq və naviqasiya
    navigation/               # Səhifə dəyişəndə scroll sıfırlanması
    styles/                   # Qlobal üslublar
    ui/                       # Ortaq interfeys komponentləri
    utils/                    # Ortaq köməkçi funksiyalar
  assets/                     # Şəkillər
  main.jsx                    # Tətbiqin giriş nöqtəsi
```

Hər funksional bölmə öz `pages`, `components`, `state`, `validation` və ya `data` qovluqlarından ehtiyac duyduqlarını saxlayır. Bir neçə bölmədə işlənən kod `shared` daxilində yerləşir.

## Adlandırma

- Komponent və fayl adı eynidir: `MovieGrid.jsx`, `SeatMap.jsx`.
- Səhifələrin adı `Page` ilə bitir: `CatalogPage`, `CheckoutPage`.
- Hook-lar `use` ilə başlayır: `useMobileNavigation`.
- API funksiyaları əməliyyatı bildirir: `fetchMovies`, `fetchScreenings`.
- Redux bölmələri `catalogFilters` və `booking` adlanır.
- Layihəyə aid CSS seçiciləri `cinema-` prefiksindən istifadə edir. Tailwind və kitabxanaların sinifləri olduğu kimi saxlanılır.

## Məlumat axını

`cinemaApi` film və seansları gətirir. Kataloq filtrləri Redux-un `catalogFilters` bölməsində saxlanılır. `SeatMap` seçilmiş yerləri və qiyməti `booking` bölməsinə yazır, `CheckoutPage` isə həmin məlumatları göstərir.

Refaktor zamanı görünüş, səhifə ünvanları və backend ünvanı saxlanılıb. Mövcud giriş və qeydiyyat formaları yalnız lokal yoxlama və bildiriş verir; ödəniş səhifəsində real ödəniş inteqrasiyası yoxdur. Oturacaq sxemi lokal olaraq təyin olunur.

## Vercel deploy

GitHub repository-ni Vercel-də Import Project ilə seçin. Framework: Vite, build: `npm run build`, output: `dist`. `vercel.json` daxili səhifələrin birbaşa açılmasını və yenilənməsini təmin edir.

Bu versiya frontend demo layihəsidir. Profil bu brauzerdə saxlanılır; real autentifikasiya, ödəniş və oturacaq rezervasiyası serverə qoşulmayıb.
