## Цель

В репозитории есть две системы маршрутизации, которые конфликтуют:
- `src/App.tsx` + `src/components/RouterContext.tsx` — собственный роутер, переключающий страницы по `window.location.pathname` (LandingPage, MainCatalogPage, EmployerPanel, CandidateFlow, AdminPanel, JobVacancyLanding, CompanyLanding).
- `src/routes/` (TanStack Start) — реально активный роутер фреймворка. Сейчас он отдаёт только заглушечные `HomePage`/`AboutPage`, которые я создал в прошлой итерации.

Поэтому большинство страниц пользователя сейчас недостижимы. Нужно отдать управление страницами в `App.tsx` (там уже вся логика URL → компонент), а TanStack-маршруты сделать тонкой «обёрткой», которая на любом URL рендерит `<App />`.

## Шаги

1. **Удалить мои временные файлы**, чтобы они не мешали:
   - `src/pages/HomePage.tsx`
   - `src/pages/AboutPage.tsx`
   - `src/components/Header.tsx`
   - `src/components/Footer.tsx`
   - `src/routes/about.tsx`

2. **`src/routes/index.tsx`** — переписать: вместо `HomePage` рендерить `<App />` из `src/App.tsx`. Метатеги оставить актуальные для лендинга RR.

3. **`src/routes/$.tsx`** (новый, splat-роут) — на любой непредусмотренный URL (`/main`, `/vacancy`, `/admin`, `/job`, `/setup`, `/auth`, `/candidate/...`, `/employer...`, `/<slug-компании>`) тоже рендерить `<App />`. Внутри `App.tsx` уже есть `switch` по `path`, который выберет нужную страницу.

4. **SSR-страховка для `RouterContext`**: сейчас `RouterProvider` читает `window.location` в инициализаторе `useState`, что упадёт в SSR. Обернуть чтение в `typeof window !== "undefined"` с фолбэком на `/main`, чтобы preview/SSR-проход не крашился.

5. **Метатеги для splat-роута** — задать дефолтный `title`/`description` RR; на `/` оставить более конкретные.

## Что НЕ делаю в этой итерации

- Не переписываю страницы под нативные TanStack-routes по одной — это большой рефакторинг (~12k строк), а пользователь просил «чтобы всё открывалось».
- Не реализую серверный эндпоинт `/api/employer-assist` для ИИ-ассистента (это отдельная задача — скажи, если нужно).
- Не трогаю содержимое самих страниц (`LandingPage`, `EmployerPanel`, `CandidateFlow` и т.д.).

## Технические детали

Splat-роут в TanStack: файл `src/routes/$.tsx` с `createFileRoute("/$")({ component: () => <App /> })`. Корневой `__root.tsx` уже содержит `<Outlet />` и `QueryClientProvider`, ничего менять не надо. `routeTree.gen.ts` перегенерируется автоматически Vite-плагином.

После этих правок:
- `/` → `App` → `LandingPage` (дефолтная ветка switch)
- `/main`, `/vacancy`, `/admin`, `/job`, `/setup`, `/auth` → соответствующие страницы
- `/candidate*`, `/employer*` → `CandidateFlow` / `EmployerPanel`
- любой `/slug` → `CompanyLanding`