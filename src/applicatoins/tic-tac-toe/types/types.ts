/**
 * Возможные фигуры игроков на поле.
 * Используются для отображения и логики игры.
 */
export enum GameFigure {
  X = 'X',
  O = '0',
}

/**
 * Возможные роли участников игры.
 * Игрок может быть человеком (PLAYER) или ботом (BOT).
 */
export enum GameRole {
  PLAYER = 'PLAYER',
  BOT = 'BOT',
}

/**
 * Конфигурация начала игры.
 * Определяет, кто ходит первым и какие фигуры у игрока и бота.
 */
export interface InitialGameConfig {
  /** Кто ходит первым: игрок или бот */
  starter: GameRole;

  /** Фигура, которой играет игрок */
  playerFigure: GameFigure;

  /** Фигура, которой играет бот */
  botFigure: GameFigure;
}

/**
 * Значение, обозначающее пустую ячейку на игровом поле.
 */
export type GameEmpty = null;

/**
 * Возможное значение ячейки на поле: фигура игрока или пусто.
 */
export type BoardValue = GameFigure | GameEmpty;

/**
 * Значение, обозначающее ничейный результат игры.
 */
export enum DrawResult {
  DRAW_RESULT = 'draw',
}

/**
 * Значение, обозначающее, что игра ещё не завершена.
 */
export enum GameNotFinished {
  GAME_NOT_FINISHED = 'game is not finished',
}

/**
 * Игровое поле: массив из 9 ячеек.
 */
export type BoardType = Array<BoardValue>;

/**
 * Результат игры: одна из фигур (X или 0), ничья или признак незавершённой игры.
 */
export type GameResult = GameFigure | DrawResult | GameNotFinished;
