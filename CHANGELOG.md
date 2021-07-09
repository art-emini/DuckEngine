# DuckEngine Changelog

Old Versions that are over 5 versions behind will be removed.

## 1.1.0

1. Game
   1. Added deltaTime parameter to scene update and render methods
   2. Fixed mobile dpr scaling while fullscreen
   3. Removed timeout/delay when exiting fullscreen with unfullscreen method
2. Base / Render (Scene extends this class)
   1. Added deltaTime argument to update and render methods
3. Input
   1. Added onKeyDown and onKeyUp methods
   2. Added onMouseMove method
4. Sound
   1. Added mute and unmute methods
   2. Added isMuted getter
   3. Changed typedefs in options to Helper.defaultValue for better understanding of the default values
   4. Fixed volume option set to 0 but not muted bug
   5. Made path and element properties public
5. DuckStorage
   1. Now JSON parses data correctly when load type is "all"
6. Base
   1. Added Amount class to run a function a certain amount of times
   2. Made ran properties in Once class public
7. Camera
   1. Changed how following a gameobjects aligns the viewport
8. Misc
   1. Moved randomInt and randomFloat utils to core/math folder

## 1.0.1

1. Game
   1. Added an option to enable dpr scaling (devicePixelRatio scaling)
   2. Fixed dpr scaling (devicePixelRatio scaling)
2. Camera
   1. DPR scaling now works correctly with cameras.
3. Helpers
   1. Added dprScale helper

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
   4. Added once method to run a function one time in a loop
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
7. Maps
   1. Implemented tilemap
8. Sound
   1. Fixed source not being set
   2. Added volume option to option parameter in constructor
9. Group
    1. Added event listeners
    2. Added pop, shift, and splice methods
    3. Added length getter
    4. Type parameter is now correctly being used
10. Gameobjects
    1. Added spritesheet to gameobject
    2. Implemented delta time
11. Sprite Gameobject
    1. Added applyFilter method
    2. Made image and path properties public
12. StaticLight
    1. Made use of convertColorToRGBA helper
    2. Fixed 3 letter hex codes not working in conversion process
    3. Made alpha parameter required in setFillColor
13. Collider
    1. SpriteSheets now work
14. Helpers
    1. Added new color helpers
    2. Added randomColor and randomColorWithAlpha to color helpers
    3. Added convertColorToRGBA to color helpers
    4. Added version and startup helpers
15. Base
    1. Added once class
16. Interactive
    1. Input
        1. Added onClick method
    2. Added Button  
17. Text
    1. Text x and y properties are now separate from config property.
18. Demos
    1. Added particle test demo
19. Typescript
    1. Added namespace Class to Duck namespace, all classes are in this namespace
    2. Exported child namespace helper of Duck Namespace
    3. Added AlphaRange type to helper namespace
    4. Added NonNullable type generic to helper namespace
    5. Added DefaultValue type generic to helper namespace
20. Misc
    1. Updated examples
    2. Updated changelog
    3. Updated readme
    4. Updated docs
    5. Updated dev dependencies
    6. Updated version to 1.0.0
    7. Made more properties on most classes public
    8. Changed hexToRGBA due to not working with 3 letter hex codes
    9. Updated [security.md](SECURITY.md)
