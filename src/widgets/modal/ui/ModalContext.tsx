import React, { createContext, useContext, useState, ReactNode } from 'react';

interface IModalInstance {
	id: string;
	component: ReactNode;
}

interface IModalContextType {
	modals: IModalInstance[];
	openModal: (component: ReactNode) => string;
	closeModal: (id: string) => void;
	closeAllModals: () => void;
}

const ModalContext = createContext<IModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [modals, setModals] = useState<IModalInstance[]>([]);

	const openModal = (component: ReactNode): string => {
		const id = crypto.randomUUID();
		setModals((prev) => [...prev, { id, component }]);
		return id;
	};

	const closeModal = (id: string) => {
		setModals((prev) => prev.filter((modal) => modal.id !== id));
	};

	const closeAllModals = () => {
		setModals([]);
	};

	return (
		<ModalContext.Provider value={{ modals, openModal, closeModal, closeAllModals }}>
			{children}
		</ModalContext.Provider>
	);
};

export const useModal = (): IModalContextType => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider');
	}
	return context;
};
