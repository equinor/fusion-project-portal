import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Styles = {
	Content: styled.div`
		flex: 1;
		position: relative;
		overflow: auto;
		overflow-x: hidden;
	`,
	Section: styled.section`
		display: flex;
		height: inherit;
	`,
	Wrapper: styled.div`
		display: block;
		height: inherit;
		width: 100%;
	`,
};

export const Root = () => {
	return (
		<Styles.Wrapper>
			<Outlet />
		</Styles.Wrapper>
	);
};
