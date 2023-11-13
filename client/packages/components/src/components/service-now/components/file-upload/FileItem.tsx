import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { clear } from '@equinor/eds-icons';
import styled from 'styled-components';

const Styles = {
	File: styled.div`
		display: flex;
		align-items: center;
		padding: 0 0.2rem;
		justify-content: space-between;
	`,
};

export const FileItem = ({ file, onClick, key }: { file: File; onClick: () => void; key: string }) => {
	return (
		<Styles.File key={key}>
			<Typography>{file.name}</Typography>
			<Button
				variant="ghost_icon"
				onClick={() => {
					onClick();
				}}
			>
				<Icon data={clear} />
			</Button>
		</Styles.File>
	);
};
