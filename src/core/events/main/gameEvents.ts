const GameEvents = {
  FOCUS: 'GAME_FOCUS',
  BLUR: 'GAME_BLUR',
  START: 'GAME_START',
  STOP: 'GAME_STOP',
  LOAD_BEGIN: 'GAME_LOAD_BEGIN',
  LOAD_FINISH: 'GAME_LOAD_FINISH',
  SCENE_ADD: 'GAME_SCENE_ADD',
  SCENE_REMOVE: 'GAME_SCENE_REMOVE',
  LOAD_SCENE: 'GAME_LOAD_SCENE',
  SWITCH_SCENE: 'GAME_SWITCH_SCENE',
  SHOW_SCENE: 'GAME_SHOW_SCENE',
  DRAW_SPLASH: 'GAME_DRAW_SPLASH',
  CLEAR_FRAME: 'GAME_CLEAR_FRAME',
  SET_SCALE: 'GAME_SET_SCALE',
  SET_BACKGROUND: 'GAME_SET_BACKGROUND',
  SYNC_CACHE: 'GAME_SYNC_CACHE',
  LOCK_POINTER: 'GAME_LOCK_POINTER',
  UNLOCK_POINTER: 'GAME_UNLOCK_POINTER',
  CONTEXT_LOST: 'GAME_CONTEXT_LOST',
  CONTEXT_RESTORED: 'GAME_CONTEXT_RESTORED',
};

export default GameEvents;
