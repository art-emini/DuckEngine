import GameEvents from './main/gameEvents';
import ButtonEvents from './other/buttonEvents';
import CutsceneEvents from './other/cutsceneEvents';
import GroupEvents from './other/groupEvents';

const EVENTS = {
	BUTTON: ButtonEvents,
	GROUP: GroupEvents,
	CUTSCENE: CutsceneEvents,
	GAME: GameEvents,
};

export default EVENTS;
