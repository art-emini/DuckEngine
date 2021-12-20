// Yay for typescript!
// Intellisense with DuckEngine!
// * No Intellisense? Look at the root README under Typescript to setup intellisense. -
// * - (Note, you may not need to do this step at all if your types are in the same directory as duckengine)

import DuckEngine, { Duck } from '../../dist';
import MainScene from './myScene';

const game = new DuckEngine.Game({
	canvas: Duck.AutoCanvas(), //  grabs canvas element from document if exists, if doesn't, it creates a canvas and appends it to the body
	defaultScene: 'main',
	background: '#ffffff',
	physics: {
		enabled: true, // enable use of the PhysicsServer
	},
	focus: true, // auto focus
	roundPixels: true, // does not allow for floating point values for coordinates for gameobjects excluding particles
});

const main = new MainScene(game);

game.scenes.add([main]);

game.start();

export default game;
