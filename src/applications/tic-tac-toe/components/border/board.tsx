import { isGameOver } from '../../utils/game-logic';
import { Cell } from '../cell/cell';
import { Modal } from '../modal/modal';
import { type BoardValue, GameNotFinished, type GameResult, GameRole } from '../../types/types';
import  { useState } from 'react';
import './board.css';
import Lottie from 'lottie-react';
import gridAnimation from '../../../../assets/grid.json';
import {
  BOARD_INITIAL_STATE,
  BOT_MOVE_TIME,
  EMPTY_CELL_VALUE,
  INITIAL_GAME
} from '../../utils/game-const';
import { botMove, getResultGameMessage } from '../../utils/game-logic';

/**
 * Компонент `Board` отвечает за отображение игрового поля и управление ходами игроков и бота.
 * 
 * Использует состояния React для управления:
 * - текущим состоянием доски;
 * - текущим победителем;
 * - активным игроком (игрок или бот);
 * - индексом последнего хода.
 * 
 * После каждого хода проверяет, завершена ли игра, и отображает модальное окно с результатом.
 * 
 * @component
 */
export const Board  = () => {
  /**
   * Состояние текущего состояния игрового поля.
   * @type {[BoardValue[], Function]}
   */
  const [board, setBoard] = useState<BoardValue[]>(BOARD_INITIAL_STATE);

  /**
   * Состояние результата игры: победитель, ничья или игра продолжается.
   * @type {[GameResult, Function]}
   */
  const [winner, setWinner] = useState<GameResult>(GameNotFinished.GAME_NOT_FINISHED);

  /**
   * Флаг, указывающий, является ли текущий ход ходом игрока.
   * @type {[boolean, Function]}
   */
  const [isPlayerMove, setIsPlayerMove] = useState<boolean>(
    INITIAL_GAME.starter === GameRole.PLAYER
  );

  /**
   * Индекс последнего хода на игровом поле.
   * @type {[number | null, Function]}
   */
  const [lastMoveIndex, setLastMoveIndex] = useState<number | null>(null);

  /**
   * Обрабатывает перезапуск игры. Сбрасывает все состояния к начальному виду.
   */
  const handleRestart = (): void => {
    setBoard([...BOARD_INITIAL_STATE]);
    setWinner(GameNotFinished.GAME_NOT_FINISHED);
    setIsPlayerMove(INITIAL_GAME.starter === GameRole.PLAYER);
    setLastMoveIndex(null);
  };

  /**
   * Обработчик выбора ячейки игроком или завершения анимации.
   * 
   * При `click`: если ход разрешён — обновляет доску и передаёт ход боту.
   * При `complete`: проверяет окончание игры, запускает ход бота, если необходимо.
   * 
   * @param {number} index - Индекс выбранной ячейки.
   * @param {'click' | 'complete'} event - Тип события: клик или завершение анимации.
   */
  const onSelect = (index: number, event: 'click' | 'complete') => {
    if (event === 'click') {
      if (
        board[index] !== EMPTY_CELL_VALUE ||
        !isPlayerMove ||
        winner !== GameNotFinished.GAME_NOT_FINISHED
      ) return;

      const newBoard = [...board];
      newBoard[index] = INITIAL_GAME.playerFigure;
      setBoard(newBoard);
      setIsPlayerMove(false);
      setLastMoveIndex(index);
    }

    if (event === 'complete') {
      const result = isGameOver(board);
      if (result !== GameNotFinished.GAME_NOT_FINISHED) {
        setWinner(result);
        setLastMoveIndex(null);
        return;
      }

      if (!isPlayerMove) {
        setTimeout(() => {
          const newBoard = botMove(board);
          const newMoveIndex = newBoard.findIndex((v, i) => v !== board[i]);
          setBoard(newBoard);
          setIsPlayerMove(true);
          setLastMoveIndex(newMoveIndex);
        }, BOT_MOVE_TIME);
      }
    }
  };

  return (
    <div className="tic-tac-toe-board-container">
      <Lottie animationData={gridAnimation} autoPlay loop={false} />
      <div className="tic-tac-toe-game-board">
        {board && board.map((cell, i) => (
          <Cell
            key={i}
            value={cell}
            index={i}
            onSelect={onSelect}
            isLastMove={lastMoveIndex === i}
          />
        ))}
      </div>

      {winner !== GameNotFinished.GAME_NOT_FINISHED && (
        <Modal
          content={<h2>{getResultGameMessage(winner, INITIAL_GAME.playerFigure)}</h2>}
          playAgainButtonText='Играть снова'
          onClose={handleRestart}
        />
      )}
    </div>
  );
};
