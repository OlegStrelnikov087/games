import './balda-keyboard.css';

type BaldaKeyboardProps = {
  onKeyClick: (letter: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
};

const ROWS = [
  ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й'],
  ['К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф'],
  ['Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'],
];

export const BaldaKeyboard = ({ onKeyClick, onEnter, onBackspace }: BaldaKeyboardProps) => {
  return (
    <div className="balda-keyboard">
      {ROWS.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="keyboard-row">
          {row.map((letter) => (
            <button
              key={letter}
              className="keyboard-key"
              onClick={() => onKeyClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
      <div className="keyboard-controls">
        <button className="keyboard-key control-key" onClick={onBackspace}>
          ⌫
        </button>
        <button className="keyboard-key control-key enter-key" onClick={onEnter}>
          Готово
        </button>
      </div>
    </div>
  );
};