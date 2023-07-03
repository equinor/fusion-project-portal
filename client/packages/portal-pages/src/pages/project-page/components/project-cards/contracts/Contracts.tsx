import { Typography } from '@equinor/eds-core-react';
import { StyledCardWrapper, StyledContent, StyledHeader } from '../styles';
import { useRelationsByType, Relations } from '@equinor/portal-core';

import { css } from '@emotion/css';
import { DateTime } from 'luxon';

const styles = {
	contractItem: css``,
	contractList: css`
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-height: 500px;
		width: 100%;
		overflow: auto;
	`,
};

const verifyDate = (date?: string): string => {
	return date
		? new Date(date).toString() !== 'Invalid Date'
			? DateTime.fromJSDate(new Date(date)).toFormat('dd LLL yyyy')
			: '-'
		: '-';
};

const sortByDate = (a: Relations, b: Relations) =>
	new Date(b.value.endDate || '').getTime() - new Date(a.value.endDate || '').getTime();

export const Contracts = () => {
	const contracts = useRelationsByType('Contract');
	return (
		<StyledCardWrapper>
			<StyledHeader>
				<Typography variant="h5">Contracts</Typography>
			</StyledHeader>
			<StyledContent>
				<div className={styles.contractList}>
					{contracts.sort(sortByDate).map((contract) => (
						<div className={styles.contractItem} key={contract.id}>
							<Typography variant="h6">{contract.title}</Typography>
							<Typography variant="overline">
								{contract.value.contractNumber} | {contract.value.companyName} |
								{verifyDate(contract.value.startDate)} - {verifyDate(contract.value.endDate)}
							</Typography>
						</div>
					))}
				</div>
			</StyledContent>
		</StyledCardWrapper>
	);
};
