## Что я нашёл в текущей сборке

- `src/routes/` удалён, маршрутизацию полностью ведёт `src/App.tsx` через `RouterContext` (`window.history` + switch по `path`).
- `vite.config.ts` уже plain React + Tailwind v4, `server.ts` поднимает Vite в middleware-режиме с `appType: "spa"` — SPA-фолбэк работает и в dev, и в prod.
- Dev-сервер запускается на 8080, отвечает 200.
- В `package.json` остались мёртвые зависимости от старой TanStack Start сборки и пара других неиспользуемых пакетов.
- `index.html` всё ещё содержит дефолтный заголовок «My Google AI Studio App».
- Никакой реальной 404-страницы нет: `App.tsx` на неизвестном URL молча отдаёт `LandingPage`.

## План правок

1. **Почистить `package.json`** — убрать неиспользуемые пакеты, чтобы `bun install` и `vite build` не тянули лишнее и не было конфликтов версий:
   - `@tanstack/react-router`
   - `@tanstack/react-start`
   - `@tanstack/router-plugin`
   - `@lovable.dev/vite-tanstack-config` (devDep)
   - `nitro` (devDep)
   - `vite-tsconfig-paths` (не используется, алиасы заданы в `vite.config.ts`)
   
   Дублей в зависимостях нет — каждый пакет указан один раз. React 19 / Vite 6 / Tailwind 4 оставляем как есть.

2. **Поправить `index.html`** — задать корректные title/description/lang для RR:
   - `<html lang="ru">`
   - `<title>RR — Робот Рекрутер</title>`
   - `<meta name="description" content="Робот Рекрутер — ИИ-платформа автоматизации найма, собеседований и адаптации.">`
   - viewport уже есть.

3. **Добавить страницу 404** — `src/pages/NotFoundPage.tsx`: минималистичная страница в стиле проекта (использует существующие классы `main-gradient`, `gold-gradient`) с кнопкой «На главную», которая через `useRouter().navigate("/main")` возвращает пользователя на лендинг.

4. **Подключить 404 в `src/App.tsx`** — заменить «всё неизвестное → LandingPage» на явный whitelist:
   - Известные точные пути: `/`, `/main`, `/vacancy`, `/admin`, `/job`, `/auth`, `/setup`.
   - Префиксы: `/candidate*`, `/employer*`.
   - Слаги компаний: проверяем, что `slug` есть в списке компаний (через `/api/companies` или хотя бы в формате `[a-z0-9-]+` одним сегментом) — иначе `NotFoundPage`.
   - Любой другой путь → `NotFoundPage`.
   
   Логика «slug компании» уже допускает любой первый сегмент → сейчас `/asdf` показывает пустой `CompanyLanding`. Сужу её до одного сегмента, состоящего из `[a-z0-9-]+`; всё остальное → 404. Сам `CompanyLanding` пусть как и раньше сам решает, что показать, если компания не найдена (если показывает пусто — это уже его задача, в этой итерации не трогаю).

5. **Проверка сборки** после правок:
   - `bun install` (после чистки package.json).
   - `bun run build` — убедиться, что `vite build` и `esbuild server.ts` отрабатывают без ошибок.
   - Перезапустить dev и проверить, что `/`, `/main`, `/vacancy`, `/admin`, `/job`, `/employer`, `/candidate`, `/ooo-roborekrut-inzhiniring`, `/blablabla` отвечают 200 и рендерят правильную страницу (последний — 404).

## Что НЕ делаю

- Не переписываю содержимое существующих страниц (`LandingPage`, `EmployerPanel` и т.д.).
- Не меняю серверные API.
- Не ввожу React Router / TanStack Router — текущий кастомный роутер работает, менять его — большой рефакторинг ради того же эффекта.
