import { useRef, useMemo, useCallback, useEffect, FC } from 'react';
import * as AdaptiveCards from 'adaptivecards';
import { marked } from 'marked';

import getDefaultHostConfig from './defaultHostConfig';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

type AdaptiveCardViewerProps = {
	/** The hostConfig object that is passed along to the native AdaptiveCards. [More Info](https://docs.microsoft.com/en-us/adaptive-cards/display/hostconfig) */
	hostConfig?: object;
	/** The card schema.  It must comply with the card schema. [More Info](https://docs.microsoft.com/en-us/adaptive-cards/create/cardschema) */
	payload: object;
	/** Method that will be invoked anytime a card action is executed. [More Info](https://docs.microsoft.com/en-us/adaptive-cards/display/implementingrenderer#actions) */
	onExecuteAction?: (action: AdaptiveCards.Action) => void;
	/** Method that will be invoked when a Submit action is executed. [More Info](https://docs.microsoft.com/en-us/adaptive-cards/display/implementingrenderer#actionsubmit) */
	onActionSubmit?: (action: AdaptiveCards.Action) => void;
	/** Method that will be invoked when an Open Url action is executed. [More Info](https://docs.microsoft.com/en-us/adaptive-cards/display/implementingrenderer#actionopenurl) */
	onActionOpenUrl?: (action: AdaptiveCards.Action) => void;
	/** Method that will be invoked when a Show Card action is executed. [More Info](https://docs.microsoft.com/en-us/adaptive-cards/display/implementingrenderer#actionshowcard) */
	onActionShowCard?: (action: AdaptiveCards.Action) => void;
	/** CSS classes that will bew applied to the card container */
	className?: string;
};

const ACTION_OPEN_URL = 'Action.OpenUrl';
const ACTION_SHOW_CARD = 'Action.ShowCard';
const ACTION_SUBMIT = 'Action.Submit';

const AdaptiveCardViewer: FC<AdaptiveCardViewerProps> = ({
	hostConfig,
	payload,
	onExecuteAction,
	onActionOpenUrl,
	onActionShowCard,
	onActionSubmit,
	className,
}) => {
	const cardContainerRef = useRef<HTMLDivElement | null>(null);
	const adaptiveCard = useMemo(() => new AdaptiveCards.AdaptiveCard(), []);

	AdaptiveCards.AdaptiveCard.onProcessMarkdown = (text, result) => {
		result.outputHtml = marked.parse(text);
		result.didProcess = true;
	};

	adaptiveCard.hostConfig = new AdaptiveCards.HostConfig(hostConfig ? hostConfig : getDefaultHostConfig());

	const executeAction = useCallback(
		(action: AdaptiveCards.Action) => {
			switch (action.getJsonTypeName()) {
				case ACTION_OPEN_URL:
					onActionOpenUrl ? onActionOpenUrl(action) : window.open(action.getHref(), action.title || '_blank');
					break;
				case ACTION_SHOW_CARD:
					onActionShowCard && onActionShowCard(action);
					break;
				case ACTION_SUBMIT:
					onActionSubmit && onActionSubmit(action);
					break;
				default:
					break;
			}
			onExecuteAction && onExecuteAction(action);
		},
		[onExecuteAction, onActionOpenUrl, onActionShowCard, onActionSubmit]
	);

	adaptiveCard.onExecuteAction = executeAction;

	const result = useMemo(() => {
		adaptiveCard.parse(payload);
		return adaptiveCard.render();
	}, [payload]);

	useEffect(() => {
		const { current } = cardContainerRef;
		if (result && current) {
			current && result && current.appendChild(result);
		}
		return () => {
			current && current.firstChild && current.removeChild(current.firstChild);
		};
	}, [result, className]);

	return <StyledAdaptiveCard ref={cardContainerRef} />;
};

export default AdaptiveCardViewer;

const StyledAdaptiveCard = styled.div`
	.ac-adaptiveCard {
		width: inherit;
		:focus {
			box-shadow: none;
			outline: none;
		}

		button {
			display: flex;
			box-sizing: border-box;
			border: 1px solid;
			border-radius: 4px;
			position: relative;
			z-index: 1;
			vertical-align: middle;
			overflow: hidden;
			align-items: center;
			font-weight: 500;
			background-color: ${tokens.colors.interactive.primary__resting.hex};
			padding-top: ${tokens.spacings.comfortable.small};
			padding-bottom: ${tokens.spacings.comfortable.small};
			padding-left: ${tokens.spacings.comfortable.large};
			padding-right: ${tokens.spacings.comfortable.large};

			color: ${tokens.colors.text.static_icons__primary_white.hex};
			cursor: pointer;

			&:hover {
				background-color: ${tokens.colors.interactive.primary__hover.hex};
			}
			&:active {
				outline: none;
				background-color: ${tokens.colors.interactive.primary__selected_highlight.hex};
			}
			&:focus {
				outline: none;
			}
		}
	}
`;
