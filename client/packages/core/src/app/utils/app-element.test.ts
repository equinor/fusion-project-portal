import { describe, test, expect } from 'vitest';
import { createAppElement } from './app-element';
import { JSDOM } from 'jsdom';
const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

describe('createAppElement', () => {
	test('Should return element', () => {
		const element = createAppElement();
		expect(element).toBeTruthy();
	});
	test('Should return element with id', () => {
		const element = createAppElement('test');
		expect(element.id).toEqual('test');
	});
	test('Should return element with display contents', () => {
		const element = createAppElement('test');
		expect(element.style.display).toEqual('contents');
	});
});
