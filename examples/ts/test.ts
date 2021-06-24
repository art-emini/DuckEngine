// Yay for typescript!
// Intellisense with DuckEngine!
// * No Autocomplete? Look at the root README under Typescript to setup autocomplete. -
// * - (Note, you may not need to do this step at all if your types are in the same directory as duckengine)

import DuckEngine from '../../dist';
import MainScene from './myScene';

const game = new DuckEngine.Game({
	canvas: null,
	defaultScene: 'main',
	background: '#fff',
});

const main = new MainScene();

game.scenes.add(main);

game.start();

export default game;
