import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { FileItem } from './FileItem';

type FileListProps = {
	onRemoved: (file: File[]) => void;
	files: File[];
};

const Styles = {
	FilesWrapper: styled.div`
		padding-top: 1rem;
	`,
};

export const FileList = ({ files, onRemoved }: FileListProps) => {
	return (
		<Styles.FilesWrapper>
			{files && Boolean(Array.from(files).length) && (
				<>
					<Typography variant="h5"> Added Files ({Array.from(files).length})</Typography>
					{Array.from(files).map((file, idx) => {
						return (
							<FileItem
								file={file}
								key={idx.toString()}
								onClick={() => {
									onRemoved(
										files
											? Array.from(files).filter(
													(f) => f.name !== file.name && f.size !== file.size
											  )
											: []
									);
								}}
							/>
						);
					})}
				</>
			)}
		</Styles.FilesWrapper>
	);
};
