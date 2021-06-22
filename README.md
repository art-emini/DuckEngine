# DuckEngine

**NOT COMPLETE! Release soon!**

[Live Demo with Parcel (on codesandbox)](https://codesandbox.io/s/duckengine-test-7gfbt?file=/src/scene.js)

![Build Badge](https://img.shields.io/github/workflow/status/ksplatdev/DuckEngine/CodeQL?style=flat-square)
![Release Badge](https://img.shields.io/github/v/release/ksplatdev/DuckEngine?style=flat-square)
![License Badge](https://img.shields.io/github/license/ksplatdev/DuckEngine?label=license&style=flat-square)
[![wakatime](https://wakatime.com/badge/github/ksplatdev/DuckEngine.svg)](https://wakatime.com/badge/github/ksplatdev/DuckEngine)

2D game framework for making games on all web browsers.

## Features

1. Physics
2. Sprites
3. Many Game objects
4. Group Management
5. Keyboard, Mouse, and touch input
6. Storage
7. Tilemaps
8. Particles
9. Sound player with sound sprites
10. Scenes
11. Cameras
12. Multi-Camera Switching
13. Scene Unique Stack / Entity Manager
14. Game Stack / Global Scene Manager
15. Animations
16. Cutscenes
17. Custom loader to load from URL or file path
18. [Docs](https://ksplatdev.github.io/DuckEngine/)
19. Written in typescript
20. Types are included
21. And way more

## Download

### Github

1. Download the [latest release](https://github.com/ksplatdev/DuckEngine/releases/latest).
2. Set up webpack pr parcel.
3. Import DuckEngine.
4. Read the docs.

### NPM

1. Run `npm install duckengine`.
2. Set up webpack or parcel.
3. Import DuckEngine.
4. Read the docs.

## [Docs](https://ksplatdev.github.io/DuckEngine/)

## Developers' Guide

### Requirements

1. Knowledge of TypeScript, Git, and HTML Canvas.
2. Reading and agreeing to the [Contributing](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).
3. Basic knowledge of how DuckEngine works.

### File Structure

```bash
.
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── scripts
│   └── build.sh
├── SECURITY.md
├── src
│   ├── base
│   │   └── render.ts
│   ├── core
│   │   ├── camera
│   │   │   └── camera.ts
│   │   ├── cutscene
│   │   ├── debug
│   │   │   └── debug.ts
│   │   ├── gameobjects
│   │   │   ├── circle.ts
│   │   │   ├── gameObject.ts
│   │   │   ├── rect.ts
│   │   │   ├── roundrect.ts
│   │   │   └── sprite.ts
│   │   ├── game.ts
│   │   ├── group
│   │   │   └── group.ts
│   │   ├── input
│   │   │   └── input.ts
│   │   ├── interactive
│   │   │   └── text.ts
│   │   ├── lights
│   │   │   └── staticLight.ts
│   │   ├── loader
│   │   │   └── loader.ts
│   │   ├── map
│   │   │   ├── duckmap.ts
│   │   │   └── tilemap.ts
│   │   ├── math
│   │   │   └── clamp.ts
│   │   ├── particles
│   │   │   ├── particleEmitter.ts
│   │   │   └── particle.ts
│   │   ├── physics
│   │   │   └── collider.ts
│   │   ├── scene.ts
│   │   ├── sound
│   │   │   └── sound.ts
│   │   └── storage
│   │       └── storage.ts
│   ├── helper
│   │   ├── circleRectCollision.ts
│   │   ├── color
│   │   │   ├── getValuesHSL.ts
│   │   │   ├── getValuesRGB.ts
│   │   │   ├── hexToHSL.ts
│   │   │   ├── hexToRGBA.ts
│   │   │   ├── hexToRGB.ts
│   │   │   ├── hslaToRGBA.ts
│   │   │   ├── hslToRGB.ts
│   │   │   ├── isHex.ts
│   │   │   ├── isHSL.ts
│   │   │   ├── isRGB.ts
│   │   │   ├── randomColor.ts
│   │   │   ├── rgbaToHSLA.ts
│   │   │   ├── rgbaToRGB.ts
│   │   │   ├── rgbToHSL.ts
│   │   │   └── rgbToRGBA.ts
│   │   └── rectCollision.ts
│   ├── index.ts
│   └── utils
│       ├── randomInt.ts
│       └── validURL.ts
├── tsconfig.json
└── webpack.config.js
```

#### Meaning & Use

1. src - typescript files, main directory
2. lib - javascript files, compiled from src
3. dist - javascript & type declaration files, bundled with webpack from lib

### How to contribute

1. Reading and agree to the [Contributing](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).
2. Fork the repository.
3. Clone the fork to your computer.
4. CD into the cloned directory.
5. Run `npm install`.
6. Run `npm run build`.
7. Make your changes.
8. Test your changes on codesandbox by forking this [codesandbox](https://codesandbox.io/s/duckengine-test-7gfbt?file=/src/scene.js) and updating the duckengine.js file.
9. Create a pull request.

### NPM Scripts

1. `npm run build` - Compiles typescript, bundles files, creates minified version, builds docs, and copies package.json to dist.
2. `npm run webpack` - Bundles files in lib directory.
3. `npm run minify` - Uses uglifyjs to minify bundled file.
4. `npm run build:docs` - Uses TypeDoc to build docs.
5. `npm run format` - Uses Prettier to format files.
6. `npm run format:watch` - Watches for changes and formats once changes are saved.

## Versions

DuckEngine does follow SemVer.

## [Live Demo with Parcel](https://codesandbox.io/s/duckengine-test-7gfbt?file=/src/scene.js)
