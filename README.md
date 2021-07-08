# ![DuckEngine](global/Logo.png)

[Demos](#demos)

![Build Badge](https://img.shields.io/github/workflow/status/ksplatdev/DuckEngine/CodeQL?style=flat-square)
![Release Badge](https://img.shields.io/github/v/release/ksplatdev/DuckEngine?style=flat-square)
![License Badge](https://img.shields.io/github/license/ksplatdev/DuckEngine?label=license&style=flat-square)
[![wakatime](https://wakatime.com/badge/github/ksplatdev/DuckEngine.svg)](https://wakatime.com/badge/github/ksplatdev/DuckEngine)
![Lint Badge](https://github.com/ksplatdev/DuckEngine/actions/workflows/lint.yml/badge.svg)
![Format Badge](https://github.com/ksplatdev/DuckEngine/actions/workflows/format.yml/badge.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

2D Game Library for the web.

## Features

1. Physics
2. Sprites & SpriteSheets
3. Many Game objects
4. Group Management
5. Keyboard, and Mouse input
6. Scenes
7. Cameras
8. Multi-Camera Switching
9. Mobile Scaling / DevicePixel ratio scaling
10. Smart scaling
11. Storage
12. Tilemaps
13. Particles
14. Sound player with sound sprites
15. Text and Button UIs
16. Scene Unique Stack / Entity Manager
17. Game Stack / Global Scene Manager
18. Animations
19. Cutscenes
20. Custom loader to load from URL or file path
21. [Docs](https://ksplatdev.github.io/DuckEngine/)
22. Written in typescript
23. Types are included
24. And way more

## Download

### Github

1. Download the [latest release](https://github.com/ksplatdev/DuckEngine/releases/latest).
2. Set up webpack pr parcel.
3. Import DuckEngine.
4. Read the [docs](https://ksplatdev.github.io/DuckEngine/).

### NPM

1. Run `npm install duckengine`.
2. Set up webpack or parcel.
3. Import DuckEngine.
4. Read the [docs](https://ksplatdev.github.io/DuckEngine/).

## [Docs](https://ksplatdev.github.io/DuckEngine/)

## Typescript

How to use DuckEngine with Typescript.

1. Setup webpack/parcel and tsconfig.
2. Import DuckEngine and Duck for types.

Not working ? Add the following to your tsconfig.json

```json
{
    "typeRoots": [
        "./node_modules/@types",
        "path_to_duckengine_index.d.ts"
    ],
    "types": [
        "DuckEngine"
    ]
}
```

### Duck Namespace

The Duck Namespace has types such as gameobject, every class config, all classes, and more.

### [Typescript Example](examples/ts/myScene.ts)

## Developers' Guide

### Requirements

1. Knowledge of TypeScript, Git, and HTML Canvas.
2. Reading and agreeing to the [Contributing](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) documents.
3. Basic knowledge of how DuckEngine works.

### File Structure

```bash
.
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── examples
│   ├── README.md
│   └── ts
│       ├── myScene.ts
│       └── test.ts
├── global
│   ├── Logo.png
│   ├── Logo.xcf
│   └── README.md
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── scripts
│   └── build.sh
├── SECURITY.md
├── src
│   ├── base
│   │   ├── once.ts
│   │   └── render.ts
│   ├── core
│   │   ├── camera
│   │   │   └── camera.ts
│   │   ├── cutscene
│   │   │   └── cutscene.ts
│   │   ├── debug
│   │   │   └── debug.ts
│   │   ├── gameobjects
│   │   │   ├── circle.ts
│   │   │   ├── gameObject.ts
│   │   │   ├── rect.ts
│   │   │   ├── roundrect.ts
│   │   │   ├── spritesheet.ts
│   │   │   └── sprite.ts
│   │   ├── game.ts
│   │   ├── group
│   │   │   └── group.ts
│   │   ├── input
│   │   │   └── input.ts
│   │   ├── interactive
│   │   │   ├── button.ts
│   │   │   └── text.ts
│   │   ├── lights
│   │   │   └── staticLight.ts
│   │   ├── loader
│   │   │   └── loader.ts
│   │   ├── map
│   │   │   └── tilemap.ts
│   │   ├── math
│   │   │   └── clamp.ts
│   │   ├── particles
│   │   │   ├── particleEmitter.ts
│   │   │   └── particle.ts
│   │   ├── physics
│   │   │   ├── circleToRectIntersect.ts
│   │   │   ├── collider.ts
│   │   │   └── rectToRectIntersect.ts
│   │   ├── scene.ts
│   │   ├── sound
│   │   │   └── sound.ts
│   │   └── storage
│   │       └── storage.ts
│   ├── helper
│   │   ├── color
│   │   │   ├── convertColorToRGBA.ts
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
│   │   │   ├── randomAlphaColor.ts
│   │   │   ├── randomColor.ts
│   │   │   ├── rgbaToHSLA.ts
│   │   │   ├── rgbaToRGB.ts
│   │   │   ├── rgbToHSL.ts
│   │   │   └── rgbToRGBA.ts
│   │   ├── startup.ts
│   │   └── version.ts
│   ├── index.ts
│   └── utils
│       ├── randomFloat.ts
│       ├── randomInt.ts
│       └── validURL.ts
├── tsconfig.json
└── webpack.config.js
```

#### Meaning & Use

1. src - Typescript files, main directory
2. lib - Javascript files, compiled from src
3. dist - Javascript & type declaration files, bundled with webpack from lib
4. global - Global Assets

### How to contribute

1. Reading and agree to the [Contributing](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) documents.
2. Fork the repository.
3. Clone the fork to your device.
4. CD (change directories) into the cloned directory.
5. Run `npm install`.
6. Run `npm run build` or `ctrl + shift + b` for vscode users.
7. Make your changes.
8. Test your changes on codesandbox by forking this [codesandbox](https://codesandbox.io/s/duckengine-test-7gfbt?file=/src/scene.js) and updating the duckengine.js file. (Or any other way you would like to test it.)
9. Create a pull request.
10. Wait for it to be reviewed and maybe merged.

### NPM Scripts

1. `npm run test` - Opens the [codesandbox test](https://codesandbox.io/s/duckengine-test-7gfbt?file=/src/scene.js).
2. `npm run build` - Compiles typescript, bundles files, creates minified version, builds docs, and copies package.json to dist.
3. `npm run build:docs` - Uses TypeDoc to build docs.
4. `npm run webpack` - Bundles files in lib directory.
5. `npm run minify` - Uses uglifyjs to minify bundled file.
6. `npm run format` - Uses Prettier to format files.
7. `npm run format:watch` - Watches for changes and formats once changes are saved.
8. `npm run lint` - Uses ESLint to lint all files in the src directory.
9. `npm run lint:watch` - Watches for changes and fixes all fixable issues found by ESLint.
10. `npm run lint:fix` - Uses ESLint to fix all fixable issues found by ESLint.

### Branches

1. main - main branch
2. staging - stage changes to this branch

## Versions

DuckEngine follows [SemVer](https://semver.org/).

## Demos

All demos are bundled with parcel-bundler and are all on codesandbox.

### [Space Shooter Game](https://codesandbox.io/s/duckengine-space-shooter-64wkg?file=/src/scene.js)

### [Test Template](https://codesandbox.io/s/duckengine-test-7gfbt?file=/src/scene.js)

### [Particle Test](https://codesandbox.io/s/duckengine-particle-test-dhcr1?file=/src/scene.js)

### [Tilemap test](https://codesandbox.io/s/duckengine-tilemap-test-ryqqz?file=/src/scene.js)

## Attribution

Cube (Cube found in logo) by José Manuel de Laá from the Noun Project.

## License

[MIT](LICENSE)

## Author

ksplat
