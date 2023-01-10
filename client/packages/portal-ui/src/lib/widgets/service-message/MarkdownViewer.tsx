import { marked } from 'marked';
import dompurify from 'dompurify';
import { FC } from 'react';
import { Typography } from '@equinor/eds-core-react';

type MarkdownViewerProps = {
    markdown: string;
};



const MarkdownViewer: FC<MarkdownViewerProps> = ({ markdown }) => {
    return (
        < Typography variant="body_long"
            dangerouslySetInnerHTML={{ __html: dompurify.sanitize(marked.parse(markdown)) }}
        />
    );
};

export default MarkdownViewer;