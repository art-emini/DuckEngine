# 3.0.0 Changelog - 2022-06-28

This update improves and adds flexibility to rendering.

This update overhauls the physics system by adding a complete new SAT collision system with different shaped hitboxes and multiple adjustable
hitboxes for PhysicsBody. - [DuckPhysics](https://github.com/ksplatdev/DuckPhysics)

This update overhauls the sound system by adding support for WebAudio and fallback to HTMLAudio.

This update improves the animation system by adding Tweens and more.

------------------------------------------------------------------------------------------------------

## Added

- New Classes
  - Added Color class to store and manage color info and strokes
- Scene
  - Add
    - Added color method to Scene.add
  - Tools
    - Added staticColor property which refers to new Color class
    - Added arguments to Scene.tools.color.random(), stroke and strokeWidth may now be passed
- PluginManager
  - PluginManager.call can now take overrideArgs to override passed arguments with the ones passed in PluginManager.call

## Changed

- Core
  - Loop
    - Made Scene.update get called before the PhysicsServer.tick
    - Current Loop Steps:
      - Active Camera Start
      - Scene.update
      - Scene.__tick
      - Renderables are drawn
      - Active Camera End
- Misc
  - Changed startup message and version
- Rendering
  - Replaced all use of strings for colors with new Color class
- Scene
  - Tools
    - color.random now returns a Color instance and not a string
- Coding Style
  - Use of two spaces for indentions

## Removed

## Deprecated

## Fixed

- Scene
  - Tools
    - Fixed chance of color.random returning invalid color
- CanvasRenderer
  - Fixed setStrokeStyle not properly setting stroke color

## FaQ
