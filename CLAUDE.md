# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Building and Development
- `npm run lint-fix` - Automatically fix linting issues
- `npm run tsc:ci` - Run TypeScript checks for both web and native platforms
- `npm run tsc:web` - TypeScript check for web platform only
- `npm run tsc:native` - TypeScript check for native platform only
- `npm run lint:ci` - Run ESLint without type checking
- `make dev` - Start development server with webpack-dev-server
- `make compile` - Build production bundles
- `make clean` - Clean build directory
- `make all` - Full build (compile + deploy)

### Testing
- `npm test` - Run full test suite using WebDriverIO
- `npm run test-single -- <spec-file>` - Run single test file
- `npm run test-dev` - Run tests against development environment
- `npm run test-dev-single -- <spec-file>` - Run single test in dev mode


### Language Tools
- `npm run lang-sort` - Sort language files
- `npm run lint:lang` - Validate JSON language files

### Platform-Specific TypeScript
TypeScript configuration is split between web and native platforms with separate tsconfig files.

## Architecture Overview

### Multi-Platform Structure
Jitsi Meet supports both web and React Native platforms with platform-specific file extensions and directories:
- `.web.ts/.web.tsx` - Web-specific implementations
- `.native.ts/.native.tsx` - React Native-specific implementations
- `.any.ts/.any.tsx` - Shared cross-platform code
- `.android.ts/.android.tsx` - Android-specific code
- `.ios.ts/.ios.tsx` - iOS-specific code
- `web/` directories - Web-specific components and modules
- `native/` directories - React Native-specific components and modules
- `react/features/mobile/` - Native-only features

### Core Directories
- `react/features/` - Main application features organized by domain (83+ feature modules)
- `modules/` - Legacy JavaScript modules and APIs
- `css/` - SCSS stylesheets compiled to CSS
- `libs/` - Compiled output directory for JavaScript bundles
- `static/` - Static assets and HTML files
- `tests/` - WebDriverIO end-to-end tests

### Feature-Driven Architecture
The application is organized under `react/features/` with each feature containing:

- **`actionTypes.ts`** - Redux action type constants
- **`actions.ts`** - Redux action creators (platform-specific variants with `.any.ts`, `.web.ts`, `.native.ts`)
- **`reducer.ts`** - Redux reducer functions
- **`middleware.ts`** - Redux middleware for side effects
- **`functions.ts`** - Utility functions and selectors
- **`constants.ts`** - Feature-specific constants
- **`logger.ts`** - Feature-specific logger instance
- **`types.ts`** - TypeScript type definitions

### Key Application Files
- `app.js` - Main web application entry point
- `webpack.config.js` - Multi-bundle Webpack configuration
- `Makefile` - Build system for development and production
- `package.json` - Dependencies and scripts with version requirements

### Bundle Architecture
The application builds multiple bundles:
- `app.bundle.js` / `app.bundle.min.js` - Main application bundle (entry: `./app.js`)
- `external_api.js` / `external_api.min.js` - External API for embedders (entry: `./modules/API/external/index.js`)
- `alwaysontop.js` / `alwaysontop.min.js` - Always-on-top window functionality (entry: `./react/features/always-on-top/index.tsx`)
- `close3.js` / `close3.min.js` - Close3 functionality (entry: `./static/close3.js`)
- `face-landmarks-worker.js` / `face-landmarks-worker.min.js` - Face landmarks detection worker (entry: `./react/features/face-landmarks/faceLandmarksWorker.ts`)
- `noise-suppressor-worklet.js` / `noise-suppressor-worklet.min.js` - Audio noise suppression worklet (entry: `./react/features/stream-effects/noise-suppression/NoiseSuppressorWorklet.ts`)
- `screenshot-capture-worker.js` / `screenshot-capture-worker.min.js` - Screenshot capture worker (entry: `./react/features/screenshot-capture/worker.ts`)

### Redux Architecture
Features follow a Redux-based architecture with:
- Actions, reducers, and middleware in each feature directory
- Cross-platform state management
- Modular feature organization with clear boundaries

The codebase uses a registry-based Redux architecture:
- **ReducerRegistry** - Features register their reducers independently
- **MiddlewareRegistry** - Features register middleware without cross-dependencies
- **IReduxState** - Global state is strongly typed with 80+ feature states

### Dependencies
- Uses `lib-jitsi-meet` as the core WebRTC library
- React with TypeScript support
- React Native for mobile applications
- Webpack for bundling with development server

### TypeScript Configuration
- `tsconfig.web.json` - Web platform TypeScript config (excludes native files)
- `tsconfig.native.json` - React Native TypeScript config (excludes web files)
- Strict TypeScript settings with ES2024 target
- Platform-specific module suffixes (`.web`, `.native`)

### Key Base Features
- **`base/app/`** - Application lifecycle management
- **`base/conference/`** - Core conference logic
- **`base/tracks/`** - Media track management
- **`base/participants/`** - Participant management
- **`base/config/`** - Configuration management
- **`base/redux/`** - Redux infrastructure

### Component Patterns
- **Abstract Components** - Base classes for cross-platform components
- **Platform-Specific Components** - Separate implementations in `web/` and `native/` directories
- **Hook-based patterns** - Modern React patterns for component logic
### Testing Framework
- WebDriverIO for end-to-end testing
- Test files are located in `tests/specs/` and use page objects in `tests/pageobjects/`.
- Environment configuration via `.env` files
- Support for Chrome, Firefox, and grid testing

## Development Guidelines

### Adding New Features
1. Create feature directory under `react/features/[feature-name]/`
2. Follow the standard file structure (actionTypes, actions, reducer, etc.)
3. Register reducers and middleware using the registry pattern
4. Define TypeScript interfaces for state and props
5. Use platform-specific files for web/native differences
6. Add feature-specific logger for debugging

### Working with Existing Features
1. Check for existing `.any.ts`, `.web.ts`, `.native.ts` variants
2. Follow established action-reducer-middleware patterns
3. Use existing base utilities rather than creating new ones
4. Leverage abstract components for cross-platform logic
5. Maintain type safety across the entire state tree

### Testing
The project uses WebDriver (WebdriverIO) for end-to-end testing. Test files are located in `tests/specs/` and use page objects in `tests/pageobjects/`.

### Build System
- **Webpack** - Main build system for web bundles
- **Makefile** - Coordinates build process and asset deployment
- **Metro** - React Native bundler (configured in `metro.config.js`)

### Platform-Specific Notes
- Web builds exclude files matching `**/native/*`, `**/*.native.ts`, etc.
- Native builds exclude files matching `**/web/*`, `**/*.web.ts`, etc.
- Use `moduleSuffixes` in TypeScript config to handle platform-specific imports
- Check `tsconfig.web.json` and `tsconfig.native.json` for platform-specific exclusions

## Environment and Setup Requirements

### System Requirements
- **Node.js and npm** are required
- Development server runs at https://localhost:8080/
- Certificate errors in development are expected (self-signed certificates)

### Development Workflow
- Development server proxies to configurable target (default: https://alpha.jitsi.net)
- Hot module replacement enabled for development
- Bundle analysis available via `ANALYZE_BUNDLE=true` environment variable
- Circular dependency detection via `DETECT_CIRCULAR_DEPS=true`

## Code Quality Requirements
- All code must pass `npm run lint:ci` and `npm run tsc:ci` with 0 warnings before committing
- TypeScript strict mode enabled - avoid `any` type
- ESLint config extends `@jitsi/eslint-config`
- Prefer TypeScript for new features, convert existing JavaScript when possible

## Code Style and Standards

### Conventional Commits Format
Follow [Conventional Commits](https://www.conventionalcommits.org) with **mandatory scopes**:
```
feat(feature-name): description
fix(feature-name): description
docs(section): description
```
Available types: build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test

### Feature Layout Structure
When adding new features:
```
react/features/sample/
├── actionTypes.ts
├── actions.ts
├── components/
│   ├── AnotherComponent.tsx
│   └── OneComponent.tsx
├── middleware.ts
└── reducer.ts
```

### TypeScript Requirements
- All new features must be written in TypeScript
- Convert JavaScript to TypeScript when modifying existing code
- Import middleware in `react/features/app/middlewares.{any,native,web}.js`
- Import reducers in appropriate registry files
- Avoid `index` files

### Bundle Size Management
- Bundle size limits are enforced to prevent bloat
- For increases, analyze first: `npx webpack -p --analyze-bundle`
- Open analyzer: `npx webpack-bundle-analyzer build/app-stats.json`
- Justify any dependency additions that increase bundle size

## Testing and Quality Assurance

### Tests
- End-to-end tests are defined in the tests/
- Tests run automatically for project member PRs via Jenkins
- Tests cover peer-to-peer, invites, iOS, Android, and web platforms
- Beta testing available at https://beta.meet.jit.si/

### Manual Testing Checklist
- Test with 2 participants (P2P mode)
- Test with 3+ participants (JVB mode)
- Verify audio/video in both modes
- Test mobile apps if changes affect mobile
- Check that TLS certificate chain is complete for mobile app compatibility

## Common Issues and Debugging

### P2P vs JVB Problems
- **Works with 2 participants, fails with 3+**: JVB/firewall issue, check UDP 10000
- **Works on web, fails on mobile apps**: TLS certificate chain issue, need fullchain.pem
- Use the tests from tests/ directory to verify functionality across platforms

### Development Server Issues
- Certificate warnings are normal for development (self-signed)
- Use different backend with WEBPACK_DEV_SERVER_PROXY_TARGET environment variable
- Check firewall settings if local development fails

### Configuration and Customization
- Extensive configuration options documented in handbook
- See `config.js` for client-side options
- Options marked 🚫 are not overwritable through `configOverwrite`
- Reference [Configuration Guide](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-configuration) for details

## Architecture Deep Dive

### Core Application Files
- **`./conference.js`** - Foundation for user-conference interactions (connection, joining, muting)
- **`./modules/external-api`** - External API for iframe integration and events
- **`./lang/`** - Translations in `main-[language].json` files
- **`./css/`** - SCSS files organized by features, matching React feature structure

### State Management Flow
1. Actions dispatched from components
2. Middleware processes side effects
3. Reducers update state
4. Components re-render based on state changes
5. Registry pattern keeps features decoupled

### Cross-Platform Strategy
- Abstract components handle shared logic
- Platform files (.web.ts, .native.ts) handle platform differences
- Build system excludes irrelevant platform files
- TypeScript configs ensure proper platform targeting

## External Resources
- [Jitsi Handbook](https://jitsi.github.io/handbook/) - Comprehensive documentation
- [Community Forum](https://community.jitsi.org/) - Ask questions and get support
- [Architecture Guide](https://jitsi.github.io/handbook/docs/architecture) - System overview
- [Contributing Guidelines](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-contributing/) - Detailed contribution process

---

# MeReady fork

This repository is the MeReady-branded fork of Jitsi Meet (GitHub: `kaly666/jitsi-meet-meready`, upstream: `jitsi/jitsi-meet`).
It runs at **https://meet.meready.ro**. The brand comes from the MeReady website (`next-me-ready` repo, https://meready.ro).

## Brand

- Yellow `#FFFC04` (hover `#E6E304`, pressed `#CCC903`, light `#FFFD80`) and black `#111111`.
- Font: Montserrat (Google Fonts, loaded in `fonts.html`).
- Logo: `images/meready-logo.png` (square ME logo with the "Matematică & Aritmetică Mentală" tagline).
- Look: chalkboard background (`images/meready-background.jpg`) under a dark overlay, frosted-glass panels
  (`rgba(...)` background + `backdrop-filter: blur(...)` + thin `rgba(255,255,255,0.10)` edge), yellow accents,
  rounded corners (buttons 10–12px, cards 16–20px, toolbar 20px).
- Anything drawn on a yellow fill must use dark text/icons (`text04` / `icon04`), never `text01` (white).

## Changes made

### Identity and config (served as-is, no build needed)
- `index.html`: inline script right after the `interface_config.js` include that overrides `interfaceConfig`
  (APP_NAME `MeReady Meet`, PROVIDER_NAME, DEFAULT_BACKGROUND, welcome logo, watermark link to meready.ro,
  no welcome footer, no mobile app promo) and `config` (`defaultLogoUrl`, `deeplinking.disabled`,
  `lobby.autoEnable: true`). It exists because the Docker web container generates its own `config.js` and
  `interface_config.js`, so values in this repo's copies never reach the browser there. **Branding settings
  belong in this script.** `theme-color` meta is `#111111`.
- `interface_config.js`, `config.js`: same values as above, for non-Docker installs.
- `title.html` (title, og/itemprop tags, favicon), `fonts.html` (Montserrat), `manifest.json` (name, colors).
- `lang/main.json`, `lang/main-ro.json`: `headerTitle` "MeReady Meet", `productLabel`, Romanian `headerSubtitle`.

### Images
- Added: `images/meready-logo.png`, `images/meready-background.jpg`, `images/meready-og.png`, `images/favicon.ico`.
- Replaced with MeReady versions (same file names, so every default reference shows MeReady):
  `images/watermark.svg` (embeds the logo PNG), `images/favicon.svg`, `images/jitsilogo.png`,
  `images/logo-deep-linking*.png`, `images/apple-touch-icon.png`, `static/pwa/icons/*`.
- `images/calendar.svg` recolored to yellow.

### Theme tokens (`react/features/base/ui/`)
- `jitsiTokens.json` (brand override layer merged over `tokens.json`): `action01`/`hover01`/`active01`/`action04`/
  `hover07`/`focus01` yellows, `surface01` `#111111`, Montserrat `fontFamily` for every typography token.
- `Tokens.ts`: `shape.borderRadius` 10; `prejoinActionButtonPrimaryText` → `text04`; `checkboxIcon` → `icon04`;
  `labelWhite*` → dark badge with yellow icon; `notificationBackground` dark glass, `notificationText` → `text01`,
  `notificationCloseIcon` → `text02`.
- **Gotcha:** a `colorMap` value is first looked up in the raw token files, then in `colorMap`. `'icon04'` therefore
  resolves to the raw `tokens.json` `icon04` (Jitsi blue `#0056E0`), not to the `colorMap` entry `icon04`
  (`surface01`). Components using `theme.palette.icon04` get the dark value; a `colorMap` entry pointing at
  `'icon04'` gets blue. Raw colors (`'#…'`, `'rgba(…)'`) are allowed as `colorMap` values.

### Components (web unless noted)
- Buttons: `base/ui/components/web/Button.tsx` (bold, 12px radius, hover lift, yellow glow on primary, dark-grey
  secondary/disabled), `base/premeeting/components/web/ActionButton.tsx` (join button), `base/buttons/CopyButton.web.tsx`.
- Dark text on yellow: `audio-translation/.../TranslationLabel.tsx`, `voice-agents/.../VoiceAgentLabel.tsx`,
  `filmstrip/.../VoiceAgentIndicator.tsx`.
- Toolbar: `base/ui/constants.web.ts` (glass bar, rounded icons, yellow toggled state).
- Top bar: `conference/components/web/SubjectText.tsx`, `ConferenceTimerDisplay.tsx` (glass pill, yellow timer).
- Tiles: `filmstrip/components/web/Thumbnail.tsx` (14px radius, glass badges, yellow speaker glow).
- Menus: `base/ui/components/web/ContextMenu.tsx` (glass). Notifications: `notifications/components/web/Notification.tsx` (glass).
- Stage: `large-video/components/LargeVideo.web.tsx` (`MEREADY_STAGE_BACKGROUND` chalkboard when no custom background).
- Avatars: `base/avatar/functions.ts` (yellow/amber palette), `components/web/styles.ts` and `components/native/styles.ts` (dark initials).

### Styles (`css/`)
- `_variables.scss` (font, watermark sizes, welcome page background/header/button), `_welcome_page.scss` (chalkboard
  page, glass room box and cards, brand tabs), `_meetings_list.scss` (glass rows, yellow dates),
  `_toolbars.scss` (pill hang-up button, no toggled outline on mic/camera), `_base.scss` (watermark max height),
  `filmstrip/_small_video.scss`, `_chat.scss`, `_popup_menu.scss`, `reload_overlay/_reload_overlay.scss`.

### Features
- Automatic waiting room: `react/features/lobby/middleware.ts` turns the lobby on once per conference when the local
  participant becomes moderator, if `config.lobby.autoEnable` is set (typed in `base/config/configType.ts`,
  documented in `config.js`). Skipped in breakout rooms; does not re-enable after a moderator turns it off.
  Known gap: guests already on "waiting for host" when the teacher joins can get in before it switches on.

### Not restyled
- Native mobile apps (only avatar initials changed). Mobile users join in the browser (deep linking disabled).

## VPS (meet.meready.ro)

- **Stack:** docker-jitsi-meet in `/opt/docker-jitsi-meet` (`.env`, `docker-compose.yml`). Containers are named
  `docker-jitsi-meet-<service>-1` (`web`, `prosody`, …). Use `sudo docker compose …` from that folder.
- **This fork on the VPS:** cloned at `/opt/jitsi-meet-meready` (owner `kaly666`), built there with `make`.
- **How the fork is served:** `/opt/docker-jitsi-meet/docker-compose.override.yml` mounts
  `/opt/jitsi-meet-meready` over `/usr/share/jitsi-meet` in the `web` service. Check with
  `sudo docker inspect docker-jitsi-meet-web-1 --format '{{range .Mounts}}{{.Source}} -> {{.Destination}}{{"\n"}}{{end}}'`.
- **Config folder** (`CONFIG` in `.env`): `/opt/docker-jitsi-meet/jitsi-meet-cfg`. `web/` is the web container's
  `/config`, where it regenerates `config.js` and `interface_config.js` on every start (`custom-config.js` /
  `custom-interface_config.js` there are appended, but are no longer needed for branding).
- **Authentication** (`.env`): `ENABLE_AUTH=1`, `ENABLE_GUESTS=1`, `AUTH_TYPE=internal`. Only accounts can start
  meetings; guests join once a host is in. Virtual hosts: `meet.jitsi` (`internal_hashed`), `guest.meet.jitsi`
  (`jitsi-anonymous`), `auth.meet.jitsi` (internal, leave alone), in `/run/prosody/config/conf.d/jitsi-meet.cfg.lua`.
- **Prosody container quirks:**
  - Its config is generated at `/run/prosody/config/prosody.cfg.lua`; its `/config` is empty, and the root
    filesystem is read-only. The documented `--config /config/prosody.cfg.lua` does not work.
  - `prosodyctl` error messages show paths prefixed with `/etc/prosody/`; that is only how the message is printed.
  - Accounts are stored in `data_path = /var/lib/prosody/data`, mounted from
    `/opt/docker-jitsi-meet/jitsi-meet-cfg/storage/prosody`. They are persistent; include this folder in backups.
  - The VPS host also has its own `prosodyctl`; never run user commands on the host, always via `docker exec`.
- **User management** (replace `NAME`; the domain is literally `meet.jitsi`):
  ```bash
  sudo docker exec -it docker-jitsi-meet-prosody-1 prosodyctl --config /run/prosody/config/prosody.cfg.lua adduser NAME@meet.jitsi
  sudo docker exec -it docker-jitsi-meet-prosody-1 prosodyctl --config /run/prosody/config/prosody.cfg.lua passwd NAME@meet.jitsi
  sudo docker exec -it docker-jitsi-meet-prosody-1 prosodyctl --config /run/prosody/config/prosody.cfg.lua deluser NAME@meet.jitsi
  sudo docker exec docker-jitsi-meet-prosody-1 ls /var/lib/prosody/data/meet%2ejitsi/accounts/
  ```
- **Hardware:** 8 GB RAM, ~100 GB disk. Enough for building on the VPS without swap.

## Build prerequisites

- Node.js **>= 24** and npm **>= 11** (`engines` in `package.json`). The VPS runs Node 26; local checks ran on Node 25.
- `make` and `git`; a Unix shell (build on the VPS or in WSL, not plain Windows PowerShell).
- About 4 GB free RAM for webpack (`--max-old-space-size=4096`) and ~3 GB disk for `node_modules` plus output.
- `npm install` once, and again whenever `package.json` changes.
- `make` runs `npm run tsc:web` (type check) first, then webpack, then the CSS build (`sass` + `cleancss`
  → `css/all.css`). If the type check fails, nothing is rebuilt and the old `libs/` and `css/all.css` keep being
  served, so read the end of the `make` output.

## When a build is needed

- **`make` required:** any `.scss`, `.ts`, `.tsx`, `jitsiTokens.json`/`tokens.json` change, and English strings
  (`lang/main.json` is bundled into `app.bundle`).
- **`git pull` is enough:** `index.html`, `title.html`, `fonts.html`, `interface_config.js`, `config.js`,
  `manifest.json`, images, other `lang/main-*.json` files.

## Deploy

```bash
cd /opt/jitsi-meet-meready && git pull && make
cd /opt/docker-jitsi-meet && sudo docker compose up -d --force-recreate web
```

The second line is only strictly needed after compose or `.env` changes (the mount is live), but it is harmless.
After `.env` changes, restart the whole stack: `sudo docker compose down && sudo docker compose up -d`.

## Verifying a deploy

- Built CSS is current: `grep -oi "c7ddff\|1a1a1a" /opt/jitsi-meet-meready/css/all.css | sort | uniq -c`
  (no `c7ddff`; Sass writes colors in lowercase, so use `-i`). Compare with what the site serves:
  `curl -sk https://meet.meready.ro/css/all.css | grep -oi ...`.
- `index.html` loads `css/all.css` without a version suffix, so browsers cache it: check in a private window.

## Local checks before pushing

```bash
npm run tsc:web && npm run tsc:native
npx eslint <changed .ts/.tsx files>
./node_modules/.bin/sass css/main.scss <scratch>/all.css
```
