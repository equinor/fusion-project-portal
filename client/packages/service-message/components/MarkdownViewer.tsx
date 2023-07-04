import { marked } from 'marked';
import dompurify from 'dompurify';
import { FC } from 'react';
import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';

type MarkdownViewerProps = {
	markdown: string;
};

const StyledTypography = styled(Typography)`
	overflow: auto;
`;

const MarkdownViewer: FC<MarkdownViewerProps> = ({ markdown }) => {
	return (
		<StyledTypography
			variant="body_long"
			dangerouslySetInnerHTML={{ __html: dompurify.sanitize(marked.parse(markdown)) }}
		/>
	);
};

export default MarkdownViewer;
