# DuckEngine Changelog

Only the previous two versions' changelogs will show.

## 2.0.0

1. Gameobjects
   1. Removed props x, y and changed to position Vector2
   2. Removed props vx, vy and changed to velocity Vector2
   3. Renamed draw method to _draw which is public but shouldn't be used
2. Particles
   1. Removed props floatVX, floatVY and changed to floatVelocity Vector2
3. Core
   1. Removed render method of scene
   2. Added displayList property
   3. Game loop uses displayList to render renderable objects
4. Scene
   1. Removed render method
   2. Added preload method
5. Misc
   1. Rewritten types, moved all types into Duck.Types and all classes into Duck

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
