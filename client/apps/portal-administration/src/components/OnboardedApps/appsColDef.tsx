import { CustomCellRendererProps } from '@ag-grid-community/react';
import { Button, Icon } from '@equinor/eds-core-react';
import { delete_to_trash } from '@equinor/eds-icons';

import { FormattedError, PortalApp } from '../../types';
import { AgStyles } from '../AgStyle';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { ValueFormatterParams } from '@ag-grid-community/core';
import { ColDef } from '@equinor/workspace-ag-grid';
import { capitalizeFirstLetter } from '../Ag-Grid/defaultGridOptions';

export const appsColDefs = (
	deleteAppByAppKey: UseMutateAsyncFunction<
		boolean,
		FormattedError,
		string,
		{
			appKey: string;
			contextTypes: string[];
		}
	>
): ColDef<PortalApp, any>[] => [
	{
		field: 'id',
		headerName: 'Id',
		hide: true,
	},
	{
		field: 'displayName',
		headerName: 'Display Name',
		filter: true,
		valueFormatter: (params) => {
			return !params.data?.doesNotExistInFusion ? params.value : `${capitalizeFirstLetter(params.data.appKey)}`;
		},
	},
	{
		field: 'appKey',
		headerName: 'App Key',
		filter: true,
	},
	{
		field: 'description',
		headerName: 'Description',
		width: 700,
		valueFormatter: (params) => {
			return !params.data?.doesNotExistInFusion ? params.value : "This app doesn't exist in Fusion";
		},
	},

	{
		field: 'contexts',
		headerName: 'Contexts Types',
		filter: true,

		cellRenderer: (
			params: CustomCellRendererProps<{
				contextTypes: string[];
				appKey: string;
			}>
		) => {
			return (
				<AgStyles.CellWrapper key={params.context?.appKey}>
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
	{
		field: 'appKey',
		headerName: 'Action',
		maxWidth: 100,
		resizable: false,
		cellRenderer: (params: CustomCellRendererProps<PortalApp>) => {
			return (
				<AgStyles.CellWrapper key={params.context?.appKey}>
					<Button
						title={`Delete ${params.data?.name} from system`}
						variant="ghost"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							const appKey = params.data?.appKey;
							appKey && deleteAppByAppKey(appKey);
						}}
					>
						<Icon data={delete_to_trash} size={16} />
					</Button>
				</AgStyles.CellWrapper>
			);
		},
	},
];
