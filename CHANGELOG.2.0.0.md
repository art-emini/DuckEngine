# v2.0.0 Changelog - 2021-10-28

## Added

- GameObjects
  - Added zIndex and visible properties
  - Added new misc gameobject CanvasModulate
  - Added internalRaycasts for checking if it is colliding with an object
  - Added isColliding, isOnFloor, isOnCeiling, and isOnWall methods
  - Added texture prop
  - Added type generic to GameObject for Texture class
  - Rect, RoundRect, Circle, StaticLight, CanvasModulate
    - Added texture colors support
  - Sprite, Spritesheet
    - Added textureKey parameter which is the key of a preloaded texture loaded with scene.loader
  - Particle
    - Added texture color and image support
  - Now extends PhysicsObject which adds a lot more methods and properties (check [docs](https://ksplatdev.github.io/DuckEngine/))
- Map
  - Added id, zIndex, and visible properties
- Core
  - Added id, zIndex, and visible properties to all renderable objects
  - Added better rendering with depth sorting and only rendering and updating objects that are set to be visible
  - Added ability to preload assets
- New Classes
  - Models
    - Added DisplayList class to manage renderable objects
    - Added Texture to save and load images and colors
  - Misc
    - Added Raycast class to cast a ray and check for intersections
    - Added Area class to detect intersections with other PhysicsBody hitboxes
  - Math
    - Added Vector2 class to manage coordinates and more
  - GameObjects
    - Misc
      - Added CanvasModulate with zIndex of 1 witch fills up the entire canvas with a color
- Game
  - Added roundPixels option to config
  - Added isRendering property
  - Added pauseRenderingOnBlur to config
  - Added onPauseRendering to config
  - Added onResumeRendering to config
  - Added splashScreen object config to config
  - Added fps property which is the current fps
  - Added start sequence to start method
  - Added physics option to config
    - Start Sequence:
      - Show splash screen
      - Preload all assets from all scenes
      - Create all assets from all scenes
- Scene
  - Added preload and create method
  - Added displayList property
  - Added loader property
  - Added misc.canvasModulate to add property
  - Tools
    - Added math property
      - Added createVector function to tools.math
      - Added vector property to tools.math which is a reference to the Vector2 class
  - Add
    - Added misc to gameobjects property
    - Added raycast to gameobjects.misc property
- Physics
  - Added PhysicsServer class
  - Added PhysicsBody class
  - Added Hitbox class
  - Collider
    - Added support for group class as a collidesWith
- Input
  - Added Keyboard event parameter to callback for onKeyUp and onKeyDown methods
- Loader
  - Added constructor with scene parameter
  - Added loadJSON, loadHTML, loadXML, loadFont, and loadAudio async methods
  - Added imageStack, jsonStack, htmlStack, xmlStack, fontStack, and audioStack public properties
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
  - Added Duck.Types which holds all of the types needed by classes
  - Added Loader and Texture namespaces to Duck.Types
  - Added Duck.Layers

## Changed

- GameObjects
  - Renamed draw method to _draw which is a public method, but should *not* be called manually
  - Collider should not be updated manually, automatically updated in scene.physicsServer
  - Moved most methods and properties to PhysicsBody
- Core
  - Game loop now uses displayList to render all visible renderable objects
  - Reworked how assets are loaded and created
  - All private properties and methods in all classes are either public or protected
- Game
  - Improved AutoCanvas
  - Typescript: canvas and ctx properties are never undefined
  - Moved scene.currentCamera.begin and end to if visible condition
  - Changed start method to be async
  - Changed how delta time is calculated
- Scene
  - Tools
    - Moved randomInt and randomFloat to math
  - Renamed this.add.sound to this.add.soundPlayer
- Physics
  - Collider
    - Changed collider.shape to collider.object
    - Changed collider.update diffCollidesWith parameter to be required and renamed to updatedCollidesWith
    - Changed collider.update to collider.__update which shouldn't be called manually as it is called by PhysicsServer
    - Changed collider.shape to collider.hitbox
    - Reworked how colliders work
- StaticLight
  - Made class extend GameObject class
- Interactive
  - Button and Text now extend the GameObject class
  - Button default zIndex is set to 4
  - Text default zIndex is set to 5
  - Text width and height properties are correctly set using context.measureText
  - Buttons now can be interacted with even with an active camera
  - Button.scene is now a public property
- Camera
  - Made viewport property public
  - Renamed follow method to startFollow
- Map
  - Changed all private properties to be public
- Sound
  - Renamed Sound class to SoundPlayer
- Loader
  - Changed static method load to non-static loadTexture method
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
  - Removed fillColor prop (now is called texture)
  - Removed most methods and properties from GameObject as it now extends PhysicsBody which as all removed methods and properties and more
- Particle
  - Removed props floatVX and floatVY and changed to floatVelocity Vector2
- Scene
  - Removed render method
  - Removed adding itself to game scene stack as that produced duplicate scenes
- Math
  - Removed Duck.Types.Helper.alphaValue return type from randomFloat
- StaticLight
  - Removed x and y props, now is position vector2
- Interactive
  - Removed x and y props, now is position vector2
- ParticleEmitter
  - Removed draw method

## Fixed

- Fixed "bouncy" and "laggy" rect to round-rect collision response [#16](https://github.com/ksplatdev/DuckEngine/issues/16)
- Fixed Button unable to be interacted with if there is an active camera
- Fixed scene adding itself to game scene stack as that produced duplicate scenes

## Bugs

## Security

### Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x | :white_check_mark:   |
| 1.2.x | :white_check_mark: |
| 1.0.x -> 1.1.x | :x: |
| 1.x.x-beta | :x: |