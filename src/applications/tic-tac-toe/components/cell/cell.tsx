import { type BoardValue, GameFigure } from '../../types/types';
import Lottie from 'lottie-react';
import './cell.css';
import crossAnimation from '../../../../assets/cross.json'
import ovalAnimation from '../../../../assets/oval.json'

/**
 * Словарь, отображающий фигуры (`X`, `O`) в соответствующие анимации Lottie.
 * 
 * @constant
 * @type {Record<GameFigure, object>}
 */
const animationData: Record<GameFigure, object> = {
  [GameFigure.X]: crossAnimation,
  [GameFigure.O]: ovalAnimation
};

/**
 * Пропсы для компонента Cell.
 * 
 * @interface CellProps
 * @property {BoardValue} value - Значение ячейки: X, O или null.
 * @property {number} index - Индекс ячейки в массиве игрового поля.
 * @property {(index: number, event: 'click' | 'complete') => void} onSelect - Колбэк при выборе ячейки или завершении анимации.
 * @property {boolean} isLastMove - Флаг, указывающий, была ли эта ячейка последним совершённым ходом.
 */
interface CellProps {
  value: BoardValue;
  index: number;
  onSelect: (index: number, event: 'click' | 'complete') => void;
  isLastMove: boolean;
}

/**
 * Компонент `Cell` отображает отдельную ячейку игрового поля.
 * 
 * При клике вызывает `onSelect` с событием `'click'`, если в ячейке уже есть значение,
 * проигрывается соответствующая Lottie-анимация.
 * По завершении анимации последнего хода вызывает `onSelect` с событием `'complete'`.
 * 
 * @component
 * @param {CellProps} props - Пропсы компонента.
 * @returns {JSX.Element} Отрисованная ячейка игрового поля.
 */
export const Cell = ({ value, index, onSelect, isLastMove }:CellProps) => {
  return (
    <div className="tic-tac-toe-cell" onClick={() => onSelect(index, 'click')}>
      {value && (
        <Lottie
          animationData={animationData[value]}
          autoplay
          loop={false}
          onComplete={() => {
            if (isLastMove) {
              onSelect(index, 'complete');
            }
          }}
        />
      )}
    </div>
  );
};
