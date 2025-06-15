import { type GameEmpty, GameFigure, type BoardType, type InitialGameConfig, GameRole } from '../types/types';


/**
 * Начальная конфигурация игры.
 * Определяет, кто ходит первым и какие фигуры у игрока и бота.
 * @type {InitialGameConfig}
 */
export const INITIAL_GAME: InitialGameConfig = {
  starter: GameRole.PLAYER,
  playerFigure: GameFigure.X,
  botFigure: GameFigure.O,
};

/**
 * Размер игрового поля (количество ячеек).
 * В классических крестиках-ноликах — 3x3, т.е. 9.
 * @constant {number}
 */
export const BOARD_SIZE = 9;

/**
 * Значение, обозначающее пустую ячейку на игровом поле.
 * @constant {GameEmpty}
 */
export const EMPTY_CELL_VALUE: GameEmpty = null;

/**
 * Начальное состояние игрового поля: массив из 9 пустых ячеек.
 * @constant {Board}
 */
export const BOARD_INITIAL_STATE: BoardType = Array(BOARD_SIZE).fill(EMPTY_CELL_VALUE);

/**
 * Время задержки перед ходом бота, имитирующее "размышление".
 * Измеряется в миллисекундах.
 * @constant {number}
 */
export const BOT_MOVE_TIME = 600;
