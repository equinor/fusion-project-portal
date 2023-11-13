import { useState, DragEvent } from 'react';
import { ChangeHandler, RefCallBack } from 'react-hook-form';
import { Icon, Typography } from '@equinor/eds-core-react';
import { upload } from '@equinor/eds-icons';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { FileList } from './FileList';

type FileUploadProps = {
	inputProps: {
		onChange: ChangeHandler;
		onBlur: ChangeHandler;
		ref: RefCallBack;
		name: string;
		min?: string | number;
		max?: string | number;
		maxLength?: number;
		minLength?: number;
		pattern?: string;
		required?: boolean;
		disabled?: boolean;
	};
	onDrop: (files: File[]) => void;
	onRemoved: (file: File[]) => void;
	accept: string;
	files: File[];
	title: string;
	acceptTitle: string;
};
const overrideDefaults = (e: DragEvent<HTMLDivElement>) => {
	e.stopPropagation();
	e.preventDefault();
};

const Styles = {
	Dropdown: styled.div<{ dragOver: boolean }>`
		display: flex;
		flex-direction: column;
		height: 120px;
		border: 2px dashed
			${({ dragOver }) =>
				dragOver
					? tokens.colors.interactive.primary__hover.hex
					: tokens.colors.interactive.disabled__border.hex};
		border-radius: 4px;
		align-items: center;
		padding: 3rem;
		gap: 1rem;
		background-color: #fefefe;
	`,
	CenterTypography: styled(Typography)`
		text-align: center;
		align-items: center;
	`,
};

export const FileUpload = ({ inputProps, onDrop, files, onRemoved, accept, acceptTitle, title }: FileUploadProps) => {
	const [dragOver, setDragOver] = useState<boolean>(false);
	const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
		overrideDefaults(e);

		if (!e.dataTransfer) {
			return;
		}

		const fileList = e.dataTransfer.files;
		if (!fileList) return;

		onDrop(Array.from(fileList));
	};

	return (
		<div>
			<label>
				<Styles.Dropdown
					dragOver={dragOver}
					onDrop={(e) => {
						handleOnDrop(e);
					}}
					onDragEnter={(e) => {
						overrideDefaults(e);
						setDragOver(true);
					}}
					onDragLeave={(e) => {
						setDragOver(false);
						overrideDefaults(e);
					}}
					onDragOver={(e) => {
						overrideDefaults(e);
						!dragOver && setDragOver(true);
					}}
				>
					<Icon size={40} data={upload} color={tokens.colors.interactive.primary__resting.hex} />
					<div>
						<Styles.CenterTypography variant="h6">{title}</Styles.CenterTypography>
						<Styles.CenterTypography variant="overline">{acceptTitle}</Styles.CenterTypography>
					</div>
					<input
						{...inputProps}
						onChange={(e) => inputProps.onChange({ target: e.target, type: e.type })}
						type="file"
						multiple
						accept={accept}
						style={{ display: 'none' }}
					/>
				</Styles.Dropdown>
			</label>
			<FileList files={files} onRemoved={onRemoved} />
		</div>
	);
};
