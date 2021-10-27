# v2.0.0 Changelog - 2021-10-27

## Added

- GameObjects
  - Added zIndex and visible properties
  - Added isColliding, isOnFloor, isOnCeiling, and isOnWall methods
  - Added new misc gameobject CanvasModulate
- Map
  - Added id, zIndex, and visible properties
- Core
  - Added id, zIndex, and visible properties to all renderable objects
  - Added better rendering with depth sorting and only rendering and updating objects that are set to be visible
- Game
  - Added roundPixels option to config
- Scene
  - Added preload method
  - Added displayList property
  - Added misc.canvasModulate to add property
  - Tools
    - Added math property
  - Add
    - Added misc to gameobjects property
    - Added raycast to gameobjects.misc property
- Input
  - Added Keyboard event parameter to callback for onKeyUp and onKeyDown methods
- Camera
  - Added lerpX and lerpY to startFollow method
  - Added cull method to only render certain objects
  - Added autoCull method to only render in view objects, aka Frustum Culling
- Effect
  - Added id, zIndex, and visible properties
- Math
  - Added lerp function
  - Added Vector2 class
- Misc
  - Added renderableObject type to Duck.Types
  - Added jsdoc comments
  - Added Duck.TypeClasses which holds all of the classes as types
  - Added Duck.Classes which holds all of the classes as constants

## Changed

- GameObjects
  - Renamed draw method to _draw which is a public method, but should *not* be called manually
- Core
  - Game loop now uses displayList to render all visible renderable objects
- Game
  - Improved AutoCanvas
  - Typescript: canvas and ctx properties are never undefined
- Scene
  - Tools
    - Moved randomInt and randomFloat to math
  - Renamed this.add.sound to this.add.soundPlayer
- StaticLight
  - Made class extend GameObject class
- Interactive
  - Button and Text now extend the GameObject class
  - Button default zIndex is set to 3
  - Text default zIndex is set to 4
  - Text width and height properties are correctly set using context.measureText
  - Buttons now can be interacted with even with an active camera
- Camera
  - Made viewport property public
  - Renamed follow method to startFollow
- Map
  - Changed all private properties to be public
- Sound
  - Renamed Sound class to SoundPlayer
- Misc
  - Changed all classes that included the game property to be a public property
  - File Structure
    - Moved particles and interactive folders to gameobjects folder
  - Modified start message
  - Changed project from npm to yarn
  - Changed build script
  - Updated README.md
  - Updated security policy
  - Updated dev dependencies

## Removed

- GameObjects
  - Removed props x and y and changed to position which is a Vector2
  - Removed props vx and vy and changed to velocity which is a Vector2
- Particle
  - Removed props floatVX and floatVY and changed to floatVelocity Vector2
- Scene
  - Removed render method
- Math
  - Removed Duck.Types.Helper.alphaValue return type from randomFloat
- ParticleEmitter
  - Removed draw method

## Fixed

- Fixed "bouncy" and "laggy" rect to round-rect collision response [#16](https://github.com/ksplatdev/DuckEngine/issues/16)
- Fixed Button unable to be interacted with if there is an active camera

## Bugs

## Security

### Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x | :white_check_mark:   |
| 1.2.x | :white_check_mark: |
| 1.0.x -> 1.1.x | :x: |
| 1.x.x-beta | :x: |
