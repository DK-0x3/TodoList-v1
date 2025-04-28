const ROUTES = {
	HOME: '/',
	TODOS: '/:sort/:search?',
	TODOS_ARCHIVE: 'archive/:sort/:search?',
	TODOS_CREATE: '/create',
	NOT_FOUND: '*',
	EDIT: '/:sort/:search?/edit/:id',
};

export default ROUTES;
