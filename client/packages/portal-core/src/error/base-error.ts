export class BasePortalError extends Error {
	override name: string;

	constructor(message: string, options?: { cause: unknown }) {
		super(message, options);
		this.name = this.constructor.name;
	}
}
