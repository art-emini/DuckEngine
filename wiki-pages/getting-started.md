# DuckEngine Wiki | Getting Started

In this tutorial, you will make a DuckEngine game and basic scene with TypeScript.

You will learn:

- How to create a Game instance
- How to create a Scene instance
- How to preload Assets
- How to create Sprites and Cameras
- How to create Animations
- How Scenes are loaded, rendered, and updated
- How to add input and movement
- How to play animations
- And more basic concepts of DuckEngine

## Setup

Download DuckEngine from any of [these sources](README.md#download). In this demo we will download DuckEngine from npm by
running `npm install duckengine` or `yarn add duckengine`.

Next setup a new project with a bundler such as webpack or parcel.

## Making a Simple Game

### Creating the Game

To create a DuckEngine game, we create a new instance and run Game.start().

First we will set up the game config.

```ts
import DuckEngine, { Duck } from 'duckengine';
import MyScene from './myScene'; // we will create this scene later

const config: Duck.Types.Game.Config = {
 canvas: myCanvas, // canvas to render to
 defaultScene: 'MyScene', // default scene key
 background: '#ffffff', // background style of canvas
 physics: {
  enabled: true, // enable physics
 },
 debug: true, // enable debug messages
}

```

Create a game instance with the config.

```ts
const game = new DuckEngine.Game(config);
```

Add a scene to the game. (We will create the scene later.)

```ts
game.scenes.add([new MyScene(game)])
```

Start the game.

```ts
game.start();
```

### Creating the Scene

To create a DuckEngine scene, we create a class and extend it.

```ts
import DuckEngine, { Duck } from 'duckengine';

export default class MyScene extends DuckEngine.Scene {
    constructor(game: Duck.TypeClasses.Game.TypeClasses.Game) {
        super(
            game, // game instance
            'MyScene', // scene key
            true, // set to visible
        )
    }
}

```

Now we will preload some assets.

```ts
...

class MyScene extends DuckEngine.Scene {
    constructor(game: Duck.TypeClasses.Game.TypeClasses.Game) {
        ...
    }

    // gets called on Game.start
    public async preload() {
        await this.loader.loadTexture(
            'mySpriteSheet.png',  // path to image
            'myTextureKey', // key to save texture as
            64, // width
            64 // height
        )
    }
}
```

Use the preloaded asset to create a sprite and a camera.

```ts
...

class MyScene extends DuckEngine.Scene {
    public mySprite!: Duck.TypeClasses.GameObjects.Sprite;
    public myCamera!: Duck.TypeClasses.Cameras.Camera;

    constructor(game: Duck.TypeClasses.Game.TypeClasses.Game) {
        ...
    }

    public async preload() {
        await this.loader.loadTexture(
            'mySpriteSheet.png',  // path to image
            'myTextureKey', // key to save texture as
            64, // width
            64 // height
        )
    }

    // called after preload in Game.start
    public create() {
        // create sprite with a sprite sheet and animations
        this.mySprite = this.add.gameobject.sprite(
            150, // x
            200, // y
            64, // width
            64, // height
            'myTextureKey', // texture key from preload
            // all of the following are optional and are configuration for the sprite if the texture is a spritesheet
            16, // frame width
            16, // frame height
            1, // amount of rows in preloaded spritesheet texture
            4, // amount of columns in preloaded spritesheet texture
            1, // current row to set as default
            1, // current column to set as default
        )

        // create main camera
        this.myCamera = this.add.mainCamera();
        
        // start follow
        this.myCamera.startFollow(this.mySprite);

        // set zoom
        this.myCamera.setZoom(700) // 1000 is default
    }
}
```

Create animations for the sprite.

```ts
...

class MyScene extends DuckEngine.Scene {
    public mySprite!: Duck.TypeClasses.GameObjects.Sprite;
    public myCamera!: Duck.TypeClasses.Cameras.Camera;

    constructor(game: Duck.TypeClasses.Game.TypeClasses.Game) {
        ...
    }

    public async preload() {
        await this.loader.loadTexture(
            'mySpriteSheet.png',  // path to image
            'myTextureKey', // key to save texture as
            64, // width
            64 // height
        )
    }

    // called after preload in Game.start
    public create() {
        // create sprite with a sprite sheet
        this.mySprite = ...;

        // create main camera
        this.myCamera = ...;
        
        // start follow
        this.myCamera.startFollow(this.mySprite);

        // set zoom
        this.myCamera.setZoom(700) // 1000 is default

        // add jump animation
        this.mySprite.anims.add({
            key: 'jump', // key of animation
            // frames of animation
            frames: [
                {
                    col: 2, // not zero-based like arrays
                    row: 1, // not zero-based like arrays
                },
                {
                    col: 3,
                    row: 1,
                },
                {
                    col: 4,
                    row: 1,
                },
                {
                    col: 1,
                    row: 1,
                },
            ], 
            frameRate: 3, // frame rate of animation
            useDelta: true, // set to true so that animation can be played in loop
            repeat: 1, // amount of times to repeat
        })

        // set the selected animation to jump, 
        //(does not play animation, just sets the selected animation so that this.mySprite.anims.play() plays the jump animation)
        this.mySprite.anims.setCurrentAnimation('jump')
    }
}
```

Add input and keys.

```ts
...

class MyScene extends DuckEngine.Scene {
    public mySprite!: Duck.TypeClasses.GameObjects.Sprite;
    public myCamera!: Duck.TypeClasses.Cameras.Camera;
    public myInput!: Duck.TypeClasses.Input.KeyboardInput;

    constructor(game: Duck.TypeClasses.Game.TypeClasses.Game) {
        ...
    }

    public async preload() {
        await this.loader.loadTexture(
            'mySpriteSheet.png',  // path to image
            'myTextureKey', // key to save texture as
            64, // width
            64 // height
        )
    }

    // called after preload in Game.start
    public create() {
        // create sprite with a sprite sheet
        this.mySprite = ...;

        // create main camera
        this.myCamera = ...;
        
        // start follow
        this.myCamera.startFollow(this.mySprite);

        // set zoom
        this.myCamera.setZoom(700) // 1000 is default

        // add jump animation
        this.mySprite.anims.add(...)

        // make input
        this.myInput = this.add.input().createKeyboardInput();

        // add keys
        this.myInput.addKeys(
            [
                {
                    keyCode: 32, // spacebar keycode
                    descriptor: 'JUMP', // descriptor/key that is used to refer to this key
                },
                {
                  keyCode: 83, // s
                  descriptor: "S"
                },
                {
                  keyCode: 65, // a
                  descriptor: "A"
                },
                {
                  keyCode: 68, // d
                  descriptor: "D"
                },
            ]
        )
    }
}
```

Use input to move sprite.

```ts
...

class MyScene extends DuckEngine.Scene {
    public mySprite!: Duck.TypeClasses.GameObjects.Sprite;
    public myCamera!: Duck.TypeClasses.Cameras.Camera;
    public myInput!: Duck.TypeClasses.Input.KeyboardInput;

    constructor(game: Duck.TypeClasses.Game.TypeClasses.Game) {
        ...
    }

    public async preload() {
        await this.loader.loadTexture(
            'mySpriteSheet.png',  // path to image
            'myTextureKey', // key to save texture as
            64, // width
            64 // height
        )
    }

    // called after preload in Game.start
    public create() {
        ...
    }

    // called on every frame after physics tick
    public update(deltaTime: number /* time since last frame */) {
        // gravity
        this.mySprite.setVelocity('y' 150) // move down by 150px per second

        if (this.myInput.inputs.JUMP.isJustPressed) {
            this.mySprite.setVelocity('y', -450)  // move up by 450px per second

            // play jump animation
            this.mySprite.anims.play() // plays current animation which is jump as we set the current animation to jump earlier
        }
        if (this.myInput.inputs.S.state) {
            this.mySprite.setVelocity("y", 300); // move down by 300px per second
        }
        if (this.myInput.inputs.A.state) {
            this.mySprite.setVelocity("x", -300); // move left by 300px per second
        }
        if (this.myInput.inputs.D.state) {
            this.mySprite.setVelocity("x", 300); // move right by 300px per second
        }
    }
}
```

Now you have a sprite that can move, jump and animate on the screen!
