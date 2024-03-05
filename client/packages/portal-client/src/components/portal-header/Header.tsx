import { useMenuContext } from '@equinor/portal-core';
import { MenuButton, Header } from '@equinor/portal-ui';

import { useNavigate } from 'react-router-dom';

export function MainHeader() {
	const navigate = useNavigate();
	useMenuContext();

	const handleLogoClick = () => {
		navigate('/');
	};

	return <Header onLogoClick={handleLogoClick} MenuButton={MenuButton} />;
}

export default MainHeader;
