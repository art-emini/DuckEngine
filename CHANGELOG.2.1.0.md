# v2.1.0 Changelog - 2021-11-23

This update increases performance and decreases memory usage and GC calls by creating a new CanvasRenderer and RendererPipeline.

This update completely overhauls the UI *(previously Interactive)* system with new features and fixes.

*Most changes and additions are included in this changelog, however, some may be missing.*
*(Found something missing? [Contribute!](README.md#developers-guide))*

------------------------------------------------------------------------------------------------------

## Added

- SoundPlayer
  - Added loop to config
  - Added loop and stop method
- Core
  - Renderer
    - Added new CanvasRenderer and RendererPipeline
  - Made Game loop more efficient by looping only through visible scenes and already pooled visible renderables use RendererPipeline
    - This makes GC calls less often
  - DisplayManager
    - Added new class DisplayManages, Manages the scale of the canvas
- Scene
  - Added onSceneActive and onSceneInactive methods that are called when visible is set to true and false
  - Added createTimer method that returns a new Timer instance
  - Added setVisible method to set the visibility of the scene and it immediately updates it by pooling the RendererPipeline
- GameObject
  - Added setVisible method to set the visibility of the scene and it immediately updates it by pooling the RendererPipeline
- Events
  - Added Renderer Events
- ParticleEmitter
  - Added autoCreate option to constructor
- UI
  - Added new UI class
- Group
  - Added physics filter can now also filter hitboxes
- Types
  - Added new Renderable type (replaces old renderable type)
    - Added new prop culled
- Misc
  - Added wiki-pages folder
  - Added new layer "fades" to Duck.Layers.Rendering.zIndex
  - Added new wiki page, [Getting Started](https://github.com/ksplatdev/DuckEngine/wiki/Getting-Started)

## Changed

- ParticleEmitter
  - Made create and createOne methods public
- Core
  - Changed how rendering is handled (new CanvasRenderer and RendererPipeline)
  - All renderables now implement the new Renderable interface
- Game
  - Loading always has a delay for pooling of RendererPipeline: (config.splashScreen.extraDuration || 0) + (config.poolingInterval || 1000)
  - oldWidth and oldHeight properties are now public instead of protected
  - New DisplayManager now handles scaling
  - Changed config.scale to be Duck.Types.Math.Vector2Like instead of Duck.Types.Misc.Scale
- StaticLight
  - Blend mode is now lighten instead of lighter
- Gameobjects/interactive is now Gameobjects/ui in the file structure and type classes and classes
- UI
  - All previous uis *(previously called Interactive)* now extend the new UI class
- Group
  - Change group filter interactive to ui
  - Changed type generic to any making groups allow a group of anything
- Helpers
  - Colors
    - getValuesRGB now returns numbers instead of strings

## Removed

- Game
  - Removed ctx property which is now replaced by Game.renderer.ctx
  - Removed fullscreen and unfullscreen methods, replaced by Game.displayManager.fullscreen and unfullscreen
  - Removed scaleToWindow and resetScale methods, replaced by Game.displayManager.scaleToWindow and resetScale
- Types
  - Removed **type** Duck.Types.Renderable which has been replaced with Duck.Types.Renderable **interface** that is now implemented into classes

## Deprecated

- Render
  - Deprecated onChange method

## Fixed

- SoundPlayer
  - Fixed all types in config to true types
- Game.scaleToWindow always debugs without config setting
- Fixed effects showing the particles before emitting
- Fixed ParticleEmitter particles showing before emitting
- Fixed EventEmitter not applying args correctly to callbacks
- Fixed PhysicsServer also applying gravity which was incorrect
- Fixed ParticleEmitter.setRange not updated existing particle positions based on new ranges
- Fixed Effect following not setting the ranges correctly
- Fixed JSDoc Comments "@returns"
- Fixed group filter method not correctly filtering
