import React, { ReactNode } from 'react';
import './modal.css';
import { useNavigate } from 'react-router-dom';

/**
 * Пропсы для компонента Modal.
 * 
 * @interface ModalProps
 * @property {ReactNode} content - Содержимое модального окна (например, сообщение о результате).
 * @property {string} playAgainButtonText - Текст для кнопки "Играть снова".
 * @property {VoidFunction} onClose - Функция для закрытия модального окна (например, для перезапуска игры).
 */
type ModalProps = {
  content: ReactNode;
  playAgainButtonText: string;
  onClose: VoidFunction;
};

/**
 * Компонент `Modal` отображает модальное окно с результатом игры и кнопкой для перезапуска.
 * 
 * @component
 * @param {ModalProps} props - Пропсы компонента.
 * @returns {JSX.Element} Отрисованное модальное окно.
 */
export const Modal: React.FC<ModalProps> = ({
  content,
  playAgainButtonText,
  onClose,
}) => {
  const navigate = useNavigate()
  return (
    <div className="modal-overlay">
      <div className="modal">
        {content}
        <div className="modal-actions">
          <button onClick={onClose}>{playAgainButtonText}</button>
          <button onClick={() => navigate('/')}>Выйти из крестики-нолики</button>
        </div>
      </div>
    </div>
  );
};

