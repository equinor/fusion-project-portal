import { CustomCellRendererProps } from '@ag-grid-community/react';

import { AgStyles } from '../AgStyle';
import { ColDef } from '@equinor/workspace-ag-grid';

const FAIL_MESSAGE = 'Application Error!';

export const colDefs: ColDef<any, any>[] = [
	{
		field: 'isActive',
		headerName: 'Status',
		maxWidth: 110,
		cellRenderer: (
			params: CustomCellRendererProps<{
				isActive?: boolean;
				isContextual?: boolean;
				appKey: string;
				appManifest?: { name: string };
			}>
		) => {
			return (
				<AgStyles.CellWrapper key={`active-${params.context?.appKey}`}>
					{params.data?.isContextual ? (
						<AgStyles.ContextIndicator
							title={`${params.data?.appManifest?.name} is activated with contexts`}
							active={params.data?.isContextual?.toString()}
						/>
					) : (
						<AgStyles.Indicator
							title={`${params.data?.appManifest?.name} is active`}
							active={params.data?.isActive?.toString()}
						/>
					)}
				</AgStyles.CellWrapper>
			);
		},
	},
	{
		field: 'isContextual',
		headerName: 'Is Contextual',

		width: 110,
		hide: true,
		cellRenderer: (
			params: CustomCellRendererProps<{
				isContextual?: boolean;
				appKey: string;
			}>
		) => {
			return (
				<AgStyles.CellWrapper key={`active-${params.context?.appKey}`}>
					<AgStyles.ContextIndicator active={params.data?.isContextual?.toString()} />
				</AgStyles.CellWrapper>
			);
		},
	},
	{
		field: 'appManifest.displayName',
		headerName: 'Name',
		width: 110,
		filterParams: {
			filterOptions: ['contains', 'startsWith', 'endsWith'],
			defaultOption: 'startsWith',
		},
		cellRenderer: (
			params: CustomCellRendererProps<{
				appManifest?: { displayName: string };
			}>
		) => {
			return (
				<AgStyles.TextCellWrapperLeft key={`active-${params.context?.appKey}`}>
					{params.data?.appManifest ? params.data?.appManifest.displayName : FAIL_MESSAGE}
				</AgStyles.TextCellWrapperLeft>
			);
		},
	},
	{
		field: 'appKey',
		maxWidth: 350,
		width: 200,
		headerName: 'Application key',
		filterParams: {
			filterOptions: ['contains', 'startsWith', 'endsWith'],
			defaultOption: 'startsWith',
		},
	},
	{
		field: 'appManifest.category.displayName',
		maxWidth: 350,
		width: 200,
		headerName: 'Category',
		filterParams: {
			filterOptions: ['contains', 'startsWith', 'endsWith'],
			defaultOption: 'startsWith',
		},
		cellRenderer: (
			params: CustomCellRendererProps<{
				appManifest?: { category: { displayName: string } };
				doesNotExistInFusion: boolean;
			}>
		) => {
			return (
				<AgStyles.TextCellWrapperLeft key={`active-${params.context?.appKey}`}>
					{params.data?.doesNotExistInFusion === false
						? params.data?.appManifest?.category.displayName
						: FAIL_MESSAGE}
				</AgStyles.TextCellWrapperLeft>
			);
		},
	},
	{
		field: 'appManifest.build.version',
		headerName: 'Build Version',
		width: 200,
		filterParams: {
			filterOptions: ['contains', 'startsWith', 'endsWith'],
			defaultOption: 'startsWith',
		},
		maxWidth: 200,
		valueFormatter: (params) => {
			return params.data?.appManifest?.build?.version || 'No version available!';
		},
	},
	{
		field: 'appManifest',
		headerName: 'Description',
		filterParams: {
			filterOptions: ['contains', 'startsWith', 'endsWith'],
			defaultOption: 'startsWith',
		},
		width: 500,
		valueFormatter: (params) => {
			return params.data?.appManifest
				? params.data?.appManifest.description
				: 'Application Missing application manifest! Application may have been deleted from Fusion app service.';
		},
	},
	{
		field: 'contextTypes',
		headerName: 'Contexts Types',
		filter: false,
		width: 200,
		cellRenderer: (
			params: CustomCellRendererProps<{
				contextTypes: string[];
				appKey: string;
			}>
		) => {
			return (
				<AgStyles.CellWrapper key={`contexts-${params.context?.appKey}`}>
					{params?.data?.contextTypes?.map((type) => {
						return (
							<AgStyles.Chip variant="default" key={type}>
								{type}
							</AgStyles.Chip>
						);
					})}
				</AgStyles.CellWrapper>
			);
		},
	},
];
