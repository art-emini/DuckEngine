# DuckEngine Changelog

Old Versions that are over 5 versions behind will be removed.

## 1.0.0-beta

1. Released DuckEngine

## 1.0.1-beta

1. Fixed Collider Type as void bug for typescript.

## 1.1.0-beta

1. Scene
   1. Moved/Added Rect-to-Rect Collision Intersect and Circle-To-Rect Collision Intersect to scene.tools.physics.
2. Interactive / Text
   1. Added setText method.
   2. Made text property public.
3. Camera
   1. Updated collision intersect imports.
4. Other
   1. Added CHANGELOG.md
   2. Changed Demos in [README.md](README.md).
   3. Added [Space Shooter Demo](https://codesandbox.io/s/duckengine-space-shooter-64wkg?file=/src/scene.js) in [README.md](README.md).

## 1.1.1-beta

1. Sound
   1. Fixed src not being set.

## 1.1.2-beta

1. Added version and startup message

## 1.0.0

1. Game
   1. Added stop method to stop the animationFrame
   2. Added animationFrame property
   3. Added delta time property
   4. Added mobile scaling / devicePixelRatio scaling
   5. Added fullscreen, unfullscreen, scaleToWindow and resetScale methods
   6. Added public isInFullscreen property
   7. Added auto canvas resize when in fullscreen
   8. Added smart scaling option to game options, resizes canvas if smaller than screen
2. Scene
   1. Added loader to tools
   2. Added randomFloat to tools
   3. Added randomColorWithAlpha to color tools
3. Camera
   1. Added setFOVSmooth and setZoomSmooth methods
   2. Added getters defaultFOV and defaultZoom
   3. Changed how following works, no need to put it in update or render in your scene
   4. Added stopFollow method
   5. Added public following method
   6. Added shake method
4. Cutscene
   1. Added CAMERA_SHAKE type
   2. Added cameraIntervalMS and cameraTimeMS properties to step
5. Particle
   1. Added setImagePath method
   2. Added public floatVX and floatVY properties
   3. Added public age property (based on seconds)
6. ParticleEmitter
   1. Completely revamped ParticleEmitter
   2. Added emitFor method
   3. Added setRange method
   4. Added float method
   5. Added offloadMaxAge and offloadMaxAmount method
   6. Changed limitMax property on keepEmitting to a number
   7. Added setImagePath method
7. Sound
   1. Fixed source not being set
   2. Added volume option to option parameter in constructor
8. Group
   1. Added event listeners
   2. Added pop, shift, and splice methods
   3. Added length getter
   4. Type parameter is now correctly being used
9. Gameobjects
   1. Added spritesheet to gameobject
   2. Implemented delta time
10. Sprite Gameobject
    1. Added applyFilter method
    2. Made image and path properties public
11. StaticLight
    1. Made use of convertColorToRGBA helper
    2. Fixed 3 letter hex codes not working in conversion process
    3. Made alpha parameter required in setFillColor
12. Collider
    1. SpriteSheets now work
13. Helpers
    1. Added new color helpers
    2. Added randomColor and randomColorWithAlpha to color helpers
    3. Added convertColorToRGBA to color helpers
14. Input
    1. Added onClick method
15. Demos
    1. Added particle test demo
16. Typescript
    1. Added namespace Class to Duck namespace, all classes are in this namespace
17. Misc
    1. Updated examples
    2. Updated changelog
    3. Updated readme
    4. Updated docs
    5. Updated dev dependencies
    6. Updated version to 1.0.0
    7. Made more properties on most classes public
    8. Changed hexToRGBA due to not working with 3 letter hex codes
