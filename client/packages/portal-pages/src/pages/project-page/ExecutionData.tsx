import { bar_chart } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { Styles } from './ProjectPage';
import { CCKpis } from './components/cc-kpis/CCKpis';
import { Milestones } from './components/milestones/Milestones';

export const ExecutionData = () => {
	return (
		<Styles.Row>
			<Styles.Col>
				<CCKpis
					appKey="handover"
					valueKey="handover"
					title="Handover"
					visual={{
						icon: bar_chart,
						color: tokens.colors.interactive.primary__hover_alt.hex,
					}}
				/>
				<CCKpis
					appKey="workorder"
					valueKey="work-orders"
					title="Workorder"
					visual={{
						icon: bar_chart,
						color: tokens.colors.interactive.primary__hover_alt.hex,
					}}
				/>
				<CCKpis
					appKey="mechanical-completion"
					valueKey="mechanical-completion"
					title="Mechanical completion"
					visual={{
						icon: bar_chart,
						color: tokens.colors.interactive.primary__hover_alt.hex,
					}}
				/>
				<CCKpis
					appKey="punch"
					valueKey="punch"
					title="Punch"
					visual={{
						icon: bar_chart,
						color: tokens.colors.interactive.primary__hover_alt.hex,
					}}
				/>
			</Styles.Col>
			<Styles.Col>
				<CCKpis
					appKey="swcr"
					valueKey="swcr"
					title="SWCR"
					visual={{
						icon: bar_chart,
						color: tokens.colors.interactive.warning__highlight.hex,
					}}
				/>
				<CCKpis
					appKey="loop"
					valueKey="loop"
					title="Loop"
					visual={{
						icon: bar_chart,
						color: tokens.colors.interactive.warning__highlight.hex,
					}}
				/>
				<Milestones />
			</Styles.Col>
		</Styles.Row>
	);
};
