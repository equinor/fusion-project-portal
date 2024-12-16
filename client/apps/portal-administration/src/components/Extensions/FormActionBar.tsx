import { styled } from 'styled-components';
import { Breadcrumbs, Button, Icon } from '@equinor/eds-core-react';
import { save } from '@equinor/eds-icons';

import { DataClarification } from '../DataClarification';
import { useNavigate } from 'react-router-dom';

const Style = {
	ActionBar: styled.div<{ gap: string }>`
		display: flex;
		justify-content: 'flex-end';
		gap: ${(props) => props.gap};
	`,
	Wrapper: styled.div`
		display: flex;
		justify-content: space-between;
		width: 100%;
	`,
	Row: styled.div`
		display: flex;
		align-items: center;
	`,
	Breadcrumbs: styled(Breadcrumbs)`
		> * > li > * {
			font-size: 1.25em;
		}
	`,
};

type FormActionBarProps = {
	isDisabled: boolean;
	isIcons?: boolean;
	onClose?: VoidFunction;
};

export const FormActionBar = ({ isDisabled, isIcons, onClose }: FormActionBarProps) => {
	const navigation = useNavigate();

	return (
		<Style.Wrapper>
			<Style.Row>
				{isIcons && <DataClarification />}
				<Style.ActionBar gap={isIcons ? '0' : '1rem'}>
					<Button
						variant={isIcons ? 'ghost_icon' : 'contained'}
						form="extensions"
						type="submit"
						disabled={isDisabled}
					>
						{!isIcons ? <Icon data={save} size={16} /> : <Icon data={save} />}
						{!isIcons && 'Save'}
					</Button>
				</Style.ActionBar>
			</Style.Row>
		</Style.Wrapper>
	);
};
