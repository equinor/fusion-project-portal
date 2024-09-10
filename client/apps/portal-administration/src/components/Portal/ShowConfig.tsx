import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useGetPortal } from '../../hooks/use-portal-query';
import { useGetPortalApps } from '../../hooks/use-portal-apps';
import { Card } from '@equinor/eds-core-react';
import { Message } from '../Message';

const CodeStyle = styled.pre`
	background-color: #242a2d;
	border: 2px solid #3a3d3e;
	color: #ffffff;
	padding: 1.5rem;
	font-family: monospace;
	max-height: 1000px;
	overflow: auto;
	.key {
		color: rgb(156, 220, 254);
	}
	.string {
		color: rgb(214, 157, 133);
	}
	.boolean {
		color: rgb(86, 156, 214);
	}
	.null {
		color: rgb(86, 156, 214);
	}
	.number {
		color: rgb(184, 215, 163);
	}
`;

const Style = {
	Wrapper: styled.div`
		gap: 1rem;
		display: flex;
		width: 100%;
		flex-direction: column;
	`,
	Content: styled.div`
		padding: 1rem;
		gap: 1rem;
		display: flex;

		flex-direction: column;
	`,
};

export const ShowConfigPage: React.FC = () => {
	const { portalId } = useParams();

	const { data } = useGetPortal(portalId);
	const { data: apps } = useGetPortalApps(portalId);

	const portal = { ...data };
	if (portal) {
		delete portal.contexts;
	}

	const config = {
		...portal,

		configuration: {
			router: JSON.parse((portal as any)?.configuration?.router || '{}'),
			extensions: [
				{
					type: 'topbar-widget',
					key: 'bookmark',
					config: {
						// some config
					},
				},
				{
					type: 'topbar-widget',
					key: 'service message',
				},
				{
					type: 'topbar-widget',
					key: 'notifications',
				},
				{
					type: 'topbar-action,',
					key: 'search',
				},
			],
		},
		apps: portal.contexts && portal.contexts.length > 0 ? apps : [],
	};

	return (
		<Style.Wrapper>
			<Style.Content>
				<CodeStyle>
					<Code config={config} />
				</CodeStyle>
				<Card>
					<Message
						title="Configuration"
						messages={['This is used for developers to ensure the configuration is proper']}
					/>
				</Card>
			</Style.Content>
		</Style.Wrapper>
	);
};

const Code = ({ config }: { config: any }) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) ref.current.innerHTML = syntaxHighlight(config);
	}, [ref, config]);

	return <div ref={ref}></div>;
};

function syntaxHighlight(json: any) {
	if (typeof json != 'string') {
		json = JSON.stringify(json, null, 2);
	}

	json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

	return json.replace(
		/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
		function (match: string) {
			var cls = 'number';
			if (/^"/.test(match)) {
				if (/:$/.test(match)) {
					cls = 'key';
				} else {
					cls = 'string';
				}
			} else if (/true|false/.test(match)) {
				cls = 'boolean';
			} else if (/null/.test(match)) {
				cls = 'null';
			}
			return '<span class="' + cls + '">' + match + '</span>';
		}
	);
}
