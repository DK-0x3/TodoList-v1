import { useTranslation } from 'react-i18next';
import './MainPage.scss';

const MainPage = () => {
	const { t } = useTranslation();
    
	return (
		<div className="MainPage">
			<div className="MainPage-header">
Header
			</div>
			<div className="MainPage-content">
Content
			</div>
		</div>
	);
};

export default MainPage;