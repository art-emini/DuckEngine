# v2.1.0 Changelog - 2021-11-23

This update increases performance and decreases memory usage and GC calls by creating a new CanvasRenderer and RendererPipeline.

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
- Scene
  - Added onSceneActive and onSceneInactive methods that are called when visible is set to true and false
  - Added createTimer method that returns a new Timer instance
- Events
  - Added Renderer Events
- ParticleEmitter
  - Added autoCreate option to constructor
- Misc
  - Added wiki-pages folder
  - Added new layer "fades" to Duck.Layers.Rendering.zIndex
  - Added new wiki page, [Getting Started](https://github.com/ksplatdev/DuckEngine/wiki/Getting-Started)

## Changed

- ParticleEmitter
  - Made create and createOne methods public
- Core
  - Changed how rendering is handled (new CanvasRenderer and RendererPipeline)
- Game
  - Loading always has a delay for pooling of RendererPipeline: (config.splashScreen.extraDuration || 0) + (config.poolingInterval || 1000)
- StaticLight
  - Blend mode is now lighten instead of lighter
- Helpers
  - Colors
    - getValuesRGB now returns numbers instead of strings

## Removed

- Game
  - Removed ctx property which is now replaced by Game.renderer.ctx

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
