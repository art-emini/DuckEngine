# v2.1.0 Changelog - 2021-11-23

## Added

- SoundPlayer
  - Added loop to config
  - Added loop and stop method
- Core
  - Renderer
    - Added new CanvasRenderer and RendererPipeline
  - Made Game loop more efficient by looping only through visible scenes and already pooled visible renderables use RendererPipeline
    - This makes GC calls less often
- Events
  - Added Renderer Events
- ParticleEmitter
  - Added autoCreate option to constructor
- Misc
  - Added wiki-pages folder
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

## Removed

- Game
  - Removed ctx property which is now replaced by Game.renderer.ctx

## Fixed

- SoundPlayer
  - Fixed all types in config to true types
- Game.scaleToWindow always debugs without config setting
- Fixed effects showing the particles before emitting
- Fixed ParticleEmitter particles showing before emitting
- Fixed EventEmitter not applying args correctly to callbacks
