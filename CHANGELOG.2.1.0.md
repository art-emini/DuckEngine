# v2.1.0 Changelog - 2021-11-23

## Added

- SoundPlayer
  - Added loop to config
  - Added loop and stop method
- ParticleEmitter
  - Added autoCreate option to constructor
- Misc
  - Added wiki-pages folder
  - Added new wiki page, [Getting Started](https://github.com/ksplatdev/DuckEngine/wiki/Getting-Started)

## Changed

- ParticleEmitter
  - Made create and createOne methods public

## Fixed

- SoundPlayer
  - Fixed all types in config to true types
- Game.scaleToWindow always debugs without config setting
- Fixed effects showing the particles before emitting
- Fixed particleEmitter particles showing before emitting
