# 3.0.0 Changelog - 2022-06-28

This update improves and adds flexibility to rendering.

This update overhauls the physics system by adding a complete new SAT collision system with different shaped hitboxes and multiple adjustable hitboxes for PhysicsBody. DuckPhysics

This update overhauls the sound system by adding support for WebAudio and fallback to HTMLAudio.

This update improves the animation system by adding Tweens and more.

This update overhauls the input system by adding support for Gamepads and Touch support. As well as the new InputServer and pooling.

This updates improves tilemaps by adding support and parsing of Tiled maps. As well as camera culling & autoCulling and collisions by new DuckPhysics physics engine.

------------------------------------------------------------------------------------------------------

## Added

- Rendering
  - Added Color class to store and manage color info and strokes
- Sound
  - Added Sound class which stores DuckEngine WebAudio or HTMLAudio sound player classes to play audio
  - Added abstract BaseSoundPlayer class
  - Added WebSoundPlayer class for use of WebAudio API to play audio
  - Added HTMLSoundPlayer class for use of HTMLAudio to play audio (replace old SoundPlayer)
  - Added new SoundSprite class for the use and making of sound sprites
- Scene
  - Add
    - Added color method to Scene.add
    - Added sound method to Scene.add to add the new Sound class
  - Tools
    - Added staticColor property which refers to new Color class
    - Added arguments to Scene.tools.color.random(), stroke and strokeWidth may now be passed
- Loader
  - Added loadAudioBuffer to load AudioBuffer for new WebSoundPlayer class and for use of WebAudio API
  - Added audioBufferStack to store loaded AudioBuffer

## Changed

- Core
  - Loop
    - Made Scene.update get called before the PhysicsServer.tick
    - Current Loop Steps:
      - Clear Frame
      - Active Camera Start
      - Scene.update
      - Scene.__tick
        - Scene.physicsServer.__tick
      - Renderables are drawn
      - Active Camera End
  - CanvasRenderer & RendererPipeline
    - Does not take poolingInterval argument anymore
- Misc
  - Changed startup message and version
- Rendering
  - Replaced all use of strings for colors with new Color class
- Scene
  - Tools
    - color.random now returns a Color instance and not a string
  - Properties onSceneActive and onSceneInactive renamed to onActive and onInactive
- Coding Style
  - Use of two spaces for indentions
- Sound
  - HTMLSoundPlayer (old SoundPlayer class)
    - Changed name to HTMLSoundPlayer (new and improved HTML audio player, look at Added/Sound)
    - Changed playSprite method to be renamed to playSoundSprite
    - Changed sprites property to be renamed to soundSprites which is now an array of new SoundSprite class
- PluginManager
  - PluginManager.call can now take overrideArgs to override passed arguments with the ones passed in PluginManager.call
- Game
  - DisplayManager
    - Fixed smartScale not being called on camera load and switch when needed
- Types
  - Sound
    - Renamed interface Config to SoundConfig
    - Renamed interface Sprite to SpriteStruct
    - SoundConfig
      - Renamed sprites option to spriteStruct

## Removed

- Sound
  - Removed SoundPlayer class which is replace by HTMLSoundPlayer class which is accessed through new Sound.soundPlayer class if using HTMLAudio
- Scene
  - Add
    - Removed soundPlayer from Scene.add which is replaced by new Sound class
- Scene/Render
  - Removed onChange method as it was deprecated in v2.1.0, replaced by properties Scene.onActive and Scene.onInactive (old names .onSceneActive and onSceneInactive)
- Duck
  - Types
    - Helper
      - Removed useless AlphaValue type and replace all occurrences with number

## Deprecated

## Fixed

- Game
  - switchScene
    - Fixed scenes not switching instantly as it would set the Scene.visible prop instead of calling Scene.setVisible to skip the poolingInterval
  - renderer
    - pipeline
      - Fixed RendererPipeline ignoring Game.config.poolingInterval
- Scene
  - Tools
    - Fixed chance of color.random returning invalid color
- CanvasRenderer
  - Fixed setStrokeStyle not properly setting stroke color

## FaQ
