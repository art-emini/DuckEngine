import DisplayEvents from './main/displayEvents';
import GameEvents from './main/gameEvents';
import RendererEvents from './main/rendererEvents';
import ButtonEvents from './other/buttonEvents';
import CutsceneEvents from './other/cutsceneEvents';
import GroupEvents from './other/groupEvents';

const EVENTS = {
	BUTTON: ButtonEvents,
	GROUP: GroupEvents,
	CUTSCENE: CutsceneEvents,
	GAME: GameEvents,
	RENDERER: RendererEvents,
	DISPLAY: DisplayEvents,
};

export default EVENTS;
