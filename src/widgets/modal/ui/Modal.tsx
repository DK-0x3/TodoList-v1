import './Modal.scss';
import { createPortal } from 'react-dom';
import { useModal } from './ModalContext';
import { FC, useEffect, useRef, useState } from 'react';

interface IModalWrapperProps {
	id: string;
	children: React.ReactNode;
	onClose: (id: string) => void;
}

const ModalWrapper: FC<IModalWrapperProps> = ({ id, children, onClose }) => {
	const modalRef = useRef<HTMLDivElement | null>(null);
	const [isTransitioning, setIsTransitioning] = useState(true);

	useEffect(() => {
		setIsTransitioning(true);
	}, []);

	const handleClose = () => {
		setIsTransitioning(false);
		setTimeout(() => {
			onClose(id);
		}, 300);
	};

	return createPortal(
		<div
			className={`modal-overlay ${isTransitioning ? 'open' : ''}`}
			onClick={handleClose}
		>
			<div
				className={`modal-content ${isTransitioning ? 'open' : ''}`}
				ref={modalRef}
				onClick={(e) => e.stopPropagation()}
			>
				<button className="modal-close" onClick={handleClose}>
					×
				</button>
				<div>{children}</div>
			</div>
		</div>,
		document.body
	);
};

export const ModalManager: FC = () => {
	const { modals, closeModal } = useModal();

	return (
		<>
			{modals.map(({ id, component }) => (
				<ModalWrapper key={id} id={id} onClose={closeModal}>
					{component}
				</ModalWrapper>
			))}
		</>
	);
};
