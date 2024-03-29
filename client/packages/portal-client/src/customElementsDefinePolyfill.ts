export const _customElementsDefine = window.customElements.define;
window.customElements.define = (name, cl, conf) => {
	if (!customElements.get(name)) {
		_customElementsDefine.call(window.customElements, name, cl, conf);
	}
};
