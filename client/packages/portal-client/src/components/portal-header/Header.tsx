import { useMenuContext, useViewController, appMounted } from '@equinor/portal-core';
import { MenuButton, Header } from '@equinor/portal-ui';

import { useNavigate } from 'react-router-dom';

export function MainHeader() {
	const { getId, setViewId } = useViewController();
	const navigate = useNavigate();
	useMenuContext();

	const handleLogoClick = () => {
		const id = getId();
		if (appMounted() && id) {
			setViewId(id);
		} else {
			setViewId(undefined);
		}
		navigate('/');
	};

	return <Header onLogoClick={handleLogoClick} MenuButton={MenuButton} title="Project Portal" />;
}

export default MainHeader;
