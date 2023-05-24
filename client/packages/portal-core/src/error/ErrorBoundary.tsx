import { Component, FC, PropsWithChildren, createElement } from 'react';
import { BasePortalError } from './base-error';

/**
 * ErrorBoundary
 * - [x] Should store the error in state
 * - [x] Should have a reset state function
 * - [x] Should handle all types of error
 * - [ ] Should have the possibility to register custom error components
 * - [ ] Should have default fallback component if none provided
 * - [x] Should have a hasError state.
 * - [ ] Should handle portal error by type.
 * - [x] Should have events
 */

type ErrorBoundaryState = {
	hasError: boolean;
	error: any;
};

type ErrorComponentProp = {
	error: any;
	resetErrorBoundary(...args: any[]): void;
};

type ErrorBoundaryProps = {
	fallback: FC<ErrorComponentProp>;
	onError?(error: any): void;
	onErrorReset?(...args: any[]): void;
	customComponents?: {
		[key: string]: FC<ErrorComponentProp>;
	};
};

const initialState = {
	hasError: false,
	error: null,
};

export class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
	constructor(props: PropsWithChildren<ErrorBoundaryProps>) {
		super(props);
		this.state = initialState;
	}

	resetErrorBoundary = (...args: []) => {
		if (this.state.error === null) {
			this.props.onErrorReset?.(args);
		}
		this.setState(initialState);
	};

	override componentDidCatch(error: BasePortalError) {
		if (this.props.onError) {
			this.props.onError(error);
		}

		this.setState({ error, hasError: true });
	}

	override render() {
		const errorComponentProps: ErrorComponentProp = {
			error: this.state.error,
			resetErrorBoundary: this.resetErrorBoundary,
		};
		if (this.props.customComponents?.[this.state.error?.name]) {
			return createElement(this.props.customComponents?.[this.state.error.name], errorComponentProps);
		}

		if (this.state.hasError) {
			return createElement(this.props.fallback, errorComponentProps);
		}

		return this.props.children;
	}
}
