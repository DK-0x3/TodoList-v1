import './styles/App.css';
import './styles/global.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ModalProvider } from '../widgets/modal/ui/ModalContext';
import { Modal } from '../widgets/modal/ui/Modal';
import AppRouter from './routing/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../store/types/useAppDispatch';
import { initSession } from '../store/services/session/thunk/initSession';
import { addTodos } from '../store/services/todo-list/slice/todoListSlice';
import { TodoAPI } from './api/todoApi';

const App = () => {
	const queryClient = new QueryClient();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(initSession());

		const getTodos = async () => {
			try {
				const fetchedTodos = await TodoAPI.fetchTodos();
				dispatch(addTodos(fetchedTodos));
			} catch (err) {
				console.log(err);
			}
		};

		getTodos();
	}, [dispatch]);

	return (
		<QueryClientProvider client={queryClient}>
			<ModalProvider>
				<BrowserRouter>
					<div className="App">
						<AppRouter/>
						<Modal/>
					</div>
				</BrowserRouter>
			</ModalProvider>
			<Toaster position="top-center" />
		</QueryClientProvider>
	);
};

export default App;
