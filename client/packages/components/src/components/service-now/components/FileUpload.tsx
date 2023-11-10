import React, { useState } from 'react';

import { ChangeHandler, RefCallBack } from 'react-hook-form';
import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { clear, upload } from '@equinor/eds-icons';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

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
	files: File[];
};
const overrideDefaults = (e: React.DragEvent<HTMLDivElement>) => {
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
		background-color: #fefefe;
	`,
	CenterTypography: styled(Typography)`
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		align-items: center;
		padding: 1rem;
	`,
	File: styled.div`
		display: flex;
		align-items: center;
		padding: 0 0.2rem;
		justify-content: space-between;
	`,
	FilesWrapper: styled.div`
		padding-top: 1rem;
	`,
};

export const FileUpload = ({ inputProps, onDrop, files, onRemoved }: FileUploadProps) => {
	const [dragOver, setDragOver] = useState<boolean>(false);
	const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
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

					<Styles.CenterTypography variant="h6">
						Drop pictures here, <b /> or click browse.
					</Styles.CenterTypography>
					<input
						{...inputProps}
						onChange={(e) => inputProps.onChange({ target: e.target, type: e.type })}
						type="file"
						multiple
						accept="image/png, image/jpeg"
						style={{ display: 'none' }}
					/>
				</Styles.Dropdown>
			</label>
			<Styles.FilesWrapper>
				{files && Boolean(Array.from(files).length) && (
					<>
						<Typography variant="h5"> Added Files ({Array.from(files).length})</Typography>
						{Array.from(files).map((file, idx) => {
							return (
								<Styles.File key={idx}>
									<Typography>{file.name}</Typography>
									<Button
										variant="ghost_icon"
										onClick={() => {
											onRemoved(
												files
													? Array.from(files).filter(
															(f) => f.name !== file.name && f.size !== file.size
													  )
													: []
											);
										}}
									>
										<Icon data={clear} />
									</Button>
								</Styles.File>
							);
						})}
					</>
				)}
			</Styles.FilesWrapper>
		</div>
	);
};
