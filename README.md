# ![DuckEngine](global/Logo.png)

**v2.0.0 released! [Changelog](CHANGELOG.md)**

| [Docs](#docs) | [Wiki](#wiki) | [Demos](#demos) |

![Build Badge](https://img.shields.io/github/workflow/status/ksplatdev/DuckEngine/CodeQL?style=flat-square)
![Release Badge](https://img.shields.io/github/v/release/ksplatdev/DuckEngine?style=flat-square)
![License Badge](https://img.shields.io/github/license/ksplatdev/DuckEngine?label=license&style=flat-square)
[![wakatime](https://wakatime.com/badge/github/ksplatdev/DuckEngine.svg)](https://wakatime.com/badge/github/ksplatdev/DuckEngine)
![Lint Badge](https://github.com/ksplatdev/DuckEngine/actions/workflows/lint.yml/badge.svg)
![Format Badge](https://github.com/ksplatdev/DuckEngine/actions/workflows/format.yml/badge.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

2D Game Library for the web.

## Features

- AABB (Axis-Aligned Bounding Box) Physics Engine
- Multiple Scenes
- Performant
- Sprites & Spritesheets
- Many GameObjects
- Raycasts
- Multiple Cameras with Effects
- Animations & Cutscenes
- Hitboxes and Colliders
- Keyboard, Mouse, and Touch Input
- DPR / Mobile Scaling
- Particle System
- Effects
- Button and Text UI
- Groups
- Tilemaps
- Fast & Performant
- Small Package
- Lighting
- Preloader
- Textures
- Made in Typescript
- Typedefs
- [Docs](#docs)
- A lot more...

## Performance & Compatibility

### Browser Requirements

1. Browser supports ES6 (EcmaScript2015)
2. Browser supports Canvas APIs

### Rankings

1. Chromium Based Browsers, includes Chrome, Opera, Edge, Vivaldi, and Brave
2. Safari
3. Firefox | [Bugs](#firefox-bugs)

### Recommendation

- Google Chrome or any other Chromium based browser

### Browser Bugs

#### Firefox Bugs

- More stuttering and garbage collection calls occurs more often than Safari and Chromium Browsers (Not really noticeable)

## Download

### Github

1. Download the [latest release](https://github.com/ksplatdev/DuckEngine/releases/latest).
2. Setup an asset bundler like webpack or parcel.
3. Import DuckEngine.
4. Read the [docs](https://ksplatdev.github.io/DuckEngine/).

### NPM

1. Run `npm install duckengine`.
2. Setup an asset bundler like webpack or parcel.
3. Import DuckEngine.
4. Read the [docs](https://ksplatdev.github.io/DuckEngine/).

### CDN

1. Setup an asset bundler like webpack or parcel.
2. Import DuckEngine from URL
   - Regular <https://cdn.jsdelivr.net/npm/duckengine@2.0.0/dist/index.js>
   - Minified <https://cdn.jsdelivr.net/npm/duckengine@2.0.0/dist/index.min.js>
3. Read the [docs](https://ksplatdev.github.io/DuckEngine/).

## [Docs](https://ksplatdev.github.io/DuckEngine/)

Learn how to use DuckEngine with simple, clean, documentation with typings and more.

## [Wiki](https://github.com/ksplatdev/DuckEngine/wiki)

Learn, write, get help, with DuckEngine in the DuckEngine Wiki.

## How to use with Typescript

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

### How to contribute

1. Reading and agree to the [Contributing](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) documents.
2. Fork the repository and create a new branch following the [branch guidelines](branch_guidelines.md).
3. Clone the fork to your device.
4. CD (change directories) into the cloned directory.
5. Run `yarn upgrade`.
6. Run `yarn run build` or `ctrl + shift + b` for vscode users.
7. Make your changes.
8. Test your changes on codesandbox by forking this [codesandbox](https://codesandbox.io/s/duckengine-test-7gfbt?file=/src/scene.js) and updating the duckengine.js file. (Or any other way you would like to test it.)
9. Create a pull request.
10. Wait for it to be reviewed and revised and possibly merged.

### Dev Scripts

1. `yarn run test` - Opens the [codesandbox test](https://codesandbox.io/s/duckengine-test-7gfbt?file=/src/scene.js).
2. `yarn run build` - Compiles typescript, bundles files, creates minified version, builds docs, and copies package.json to dist.
3. `yarn run build:docs` - Uses TypeDoc to build docs.
4. `yarn run webpack` - Bundles files in lib directory.
5. `yarn run minify` - Uses uglifyjs to minify bundled file.
6. `yarn run format` - Uses Prettier to format files.
7. `yarn run format:watch` - Watches for changes and formats once changes are saved.
8. `yarn run lint` - Uses ESLint to lint all files in the src directory.
9. `yarn run lint:watch` - Watches for changes and fixes all fixable issues found by ESLint.
10. `yarn run lint:fix` - Uses ESLint to fix all fixable issues found by ESLint.
11. `yarn run tree` - Prints out all files and directories used in [readme](#file-structure).
12. `yarn run serve` - Serves the docs on :8080.

### Branches

1. main - main branch
2. staging - stage changes to this branch

### File Structure

```bash
.
├── branch_guidelines.md
├── CHANGELOG.1.2.0.md
├── CHANGELOG.2.0.0.md
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── global
│   ├── Logo.png
│   ├── Logo_Splash.png
│   ├── Logo_Splash.xcf
│   ├── Logo.xcf
│   └── README.md
├── LICENSE
├── package.json
├── README.md
├── scripts
│   └── build.sh
├── SECURITY.md
├── src
│   ├── base
│   │   ├── amount.ts
│   │   ├── once.ts
│   │   └── render.ts
│   ├── core
│   │   ├── camera
│   │   │   └── camera.ts
│   │   ├── cutscene
│   │   │   └── cutscene.ts
│   │   ├── debug
│   │   │   └── debug.ts
│   │   ├── effect
│   │   │   ├── effect.ts
│   │   │   └── preset
│   │   │       ├── explosion.ts
│   │   │       └── smoke.ts
│   │   ├── gameobjects
│   │   │   ├── circle.ts
│   │   │   ├── gameObject.ts
│   │   │   ├── interactive
│   │   │   │   ├── button.ts
│   │   │   │   └── text.ts
│   │   │   ├── misc
│   │   │   │   └── canvasModulate.ts
│   │   │   ├── particles
│   │   │   │   ├── particleContainer.ts
│   │   │   │   ├── particleEmitter.ts
│   │   │   │   └── particle.ts
│   │   │   ├── rect.ts
│   │   │   ├── roundrect.ts
│   │   │   ├── spritesheet.ts
│   │   │   ├── sprite.ts
│   │   │   └── webgl
│   │   ├── game.ts
│   │   ├── group
│   │   │   └── group.ts
│   │   ├── input
│   │   │   └── input.ts
│   │   ├── lights
│   │   │   └── staticLight.ts
│   │   ├── loader
│   │   │   └── loader.ts
│   │   ├── map
│   │   │   ├── map.ts
│   │   │   └── tilemap.ts
│   │   ├── math
│   │   │   ├── clamp.ts
│   │   │   ├── lerp.ts
│   │   │   ├── randomFloat.ts
│   │   │   ├── randomInt.ts
│   │   │   └── vector2.ts
│   │   ├── misc
│   │   │   └── raycast.ts
│   │   ├── models
│   │   │   ├── displayList.ts
│   │   │   ├── physicsList.ts
│   │   │   └── texture.ts
│   │   ├── physics
│   │   │   ├── circleToRectIntersect.ts
│   │   │   ├── collider.ts
│   │   │   ├── models
│   │   │   │   ├── area.ts
│   │   │   │   └── hitbox.ts
│   │   │   ├── physicsBody.ts
│   │   │   ├── rectToRectIntersect.ts
│   │   │   └── server
│   │   │       └── physicsServer.ts
│   │   ├── scene.ts
│   │   ├── sound
│   │   │   └── soundPlayer.ts
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
│   │   ├── dprScale.ts
│   │   ├── startup.ts
│   │   └── version.ts
│   ├── index.ts
│   └── utils
│       ├── cloneClass.ts
│       ├── degToRadians.ts
│       ├── extractNumbers.ts
│       ├── swapElement.ts
│       └── validURL.ts
├── tsconfig.json
├── webpack.config.js
└── yarn.lock
```

#### Meaning & Use

1. src - Typescript files, main directory
2. lib - Javascript files, compiled from src
3. dist - Javascript & type declaration files, bundled with webpack from lib
4. global - Global Assets

## Versions

DuckEngine follows [SemVer](https://semver.org/).

## Demos

All demos are bundled with parcel-bundler and are all on codesandbox.

### [Space Shooter Game](https://codesandbox.io/s/duckengine-space-shooter-64wkg?file=/src/scene.js)

### [Test Template](https://codesandbox.io/s/duckengine-test-7gfbt?file=/src/scene.js)

### [Particle Test](https://codesandbox.io/s/duckengine-particle-test-dhcr1?file=/src/scene.js)

### [Tilemap test](https://codesandbox.io/s/duckengine-tilemap-test-ryqqz?file=/src/scene.js)

## Attribution

Cube found in logo by José Manuel de Laá from the Noun Project.

## License

[MIT](LICENSE)

## Author

Bleart Emini
