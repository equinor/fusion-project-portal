import { Typography } from '@equinor/eds-core-react';
import { StyledCardWrapper, StyledContent, StyledHeader } from '../styles';
import { useRelationsByType } from '@equinor/portal-core';

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

function verifyDate(date?: string): string {
	return date
		? new Date(date).toString() !== 'Invalid Date'
			? DateTime.fromJSDate(new Date(date)).toFormat('dd LLL yyyy')
			: '-'
		: '-';
}

export const Contracts = () => {
	const contracts = useRelationsByType('Contract');
	return (
		<StyledCardWrapper>
			<StyledHeader>
				<Typography variant="h5">Contracts</Typography>
			</StyledHeader>
			<StyledContent>
				<div className={styles.contractList}>
					{contracts.map((contract) => (
						<div className={styles.contractItem} key={contract.id}>
							<Typography variant="h6">{contract.title}</Typography>
							<Typography variant="overline">
								{contract.value.contractNumber} {contract.value.companyName}
								{verifyDate(contract.value.endDate)}
							</Typography>
						</div>
					))}
				</div>
			</StyledContent>
		</StyledCardWrapper>
	);
};
