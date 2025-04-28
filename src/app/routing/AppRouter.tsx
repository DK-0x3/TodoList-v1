import { Navigate, Route, Routes } from 'react-router-dom';
import ROUTES from './routes';
import Layout from '../../pages/Layout/Layout';
import MainPage from '../../pages/main/MainPage';
import NotFoundPage from '../../pages/not-found/NotFoundPage';
import { EditPage } from '../../pages/edit-todo/EditPage';
import ArchivePage from '../../pages/archive/ArchivePage';
import CreatePage from '../../pages/create-todo/CreatePage';

const AppRouter = () => {
	return (
		<Routes>
			<Route path={ROUTES.HOME} element={<Layout/>}>
				<Route
					index
					element={<Navigate to={ROUTES.HOME + 'date'} replace />}
				/>
				<Route path={ROUTES.TODOS} element={<MainPage/>}/>
				<Route path={ROUTES.TODOS_ARCHIVE} element={<ArchivePage/>}/>
				<Route path={ROUTES.EDIT} element={<EditPage/>}/>
				<Route path={ROUTES.TODOS_CREATE} element={<CreatePage/>}/>
				<Route path={ROUTES.NOT_FOUND} element={<NotFoundPage/>}/>
			</Route>
		</Routes>
	);
};

export default AppRouter;
