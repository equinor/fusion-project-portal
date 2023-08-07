import { render } from '@testing-library/react';

import { test, expect, describe } from 'vitest';
import { InfoMessage } from './InfoMessage';

import React from 'react';
import { Icon } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';

Icon.add({ info_circle });

describe('InfoMessage Component', () => {
	test('Should render successfully', () => {
		const { baseElement } = render(<InfoMessage></InfoMessage>);
		expect(baseElement).toBeTruthy();
	});

	test('Should render child element successfully', () => {
		render(
			<InfoMessage>
				<div id="test">test</div>
			</InfoMessage>
		);

		const childElement = document.getElementById('test');
		expect(childElement).toBeTruthy();
		expect(childElement?.innerHTML).toEqual('test');
	});

	test('Should render Icon successfully', () => {
		render(
			<InfoMessage>
				<div id="test">test</div>
			</InfoMessage>
		);

		const infoMessageIconElement = document.getElementById('InfoMessageIcon');
		expect(infoMessageIconElement).toBeTruthy();
	});
});
