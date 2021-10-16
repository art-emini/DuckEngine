# DuckEngine Changelog

Only the previous two versions' changelogs will show.

## 2.0.0

1. Gameobjects
   1. Removed props x, y and changed to position Vector2
   2. Removed props vx, vy and changed to velocity Vector2
   3. Renamed draw method to _draw which is public but shouldn't be used
   4. Added zIndex and visible properties
2. Map
   1. Added id, zIndex, and visible properties
3. Particles
   1. Removed props floatVX, floatVY and changed to floatVelocity Vector2
4. Core
   1. Removed render method of scene
   2. Added displayList property
   3. Game loop uses displayList to render renderable objects
   4. Added id, zIndex, and visible properties to all renderable objects
5. Game
   1. Improved Auto canvas
   2. Added roundPixels option to config
6. Scene
   1. Removed render method
   2. Added preload method
   3. Added misc.canvasModulate to add
7. StaticLight
   1. Now extends GameObject
   2. Renamed setFillColor to setFillColorAlpha
8. Input
   1. Added KeyBoard event parameter to callback for onKeyUp, and onKeyDown
9. Interactive
   1. All interactive UI gameobjects now extend GameObject
   2. Button zIndex is 3
   3. Text zIndex is 4
10. Camera
    1. Made viewport property public
    2. Changed follow method to startFollow
    3. Added lerp to follow
11. Map
    1. Changed all properties to be public
12. Effect
    1. Added id, zIndex, and visible properties
13. Math
    1. Added lerp function
    2. Added Vector2 Class
    3. Removed return type from randomFloat
14. New GameObjects
    1. Added gameobject class canvasModulate
15. ParticleEmitter
    1. Removed draw method
16. Misc
    1. Rewritten types, moved all types into Duck.Types and all type classes into Duck
    2. Added renderableObject type which is any class that has a _draw method
    3. Canvas and context types is never undefined
    4. Added jsdoc comments
    5. Made game property, of most classes that had it, public

## 1.2.0

1. Maps
   1. Added A Map class that is to be extended for code reusability
   2. Made tilemap extend new Map Class
2. Added ParticleContainer class
3. Added new Effect class
4. Preset Effects
   1. Added Explosion preset effect
   2. Added Smoke preset effect
5. Scene
   1. Added effect to add method
   2. Added presetEffect object to add method
6. Misc
   1. Updated dependencies
   2. Changed Version
