import { IFeatureFlag, useFrameworkFeatures } from '@equinor/fusion-framework-react/feature-flag';
import { Typography, Switch } from '@equinor/eds-core-react';
import { Styled } from './Styled';
import { Message } from '@portal/ui';

/**
 * Content for Feature toggler tab for portal features in the PersonSidesheet's Feature page.
 */
export const FeatureTogglerPortal = (props: { onClick: (feature: IFeatureFlag) => void }) => {
	const { features, toggleFeature } = useFrameworkFeatures();

	return (
		<Styled.SwitchList>
			{features.length > 0 ? (
				features.map((feature) => (
					<Styled.SwitchListItem
						key={`feat-${feature.key}`}
						onClick={() => {
							toggleFeature(feature.key);
							props.onClick(feature);
						}}
					>
						<Styled.SwitchLabel>
							<Typography variant="body_short_bold">{feature.title ?? feature.key}</Typography>
							<Typography variant="body_short_italic">{feature.description ?? ''}</Typography>
						</Styled.SwitchLabel>
						<Switch checked={feature.enabled} disabled={feature.readonly} />
					</Styled.SwitchListItem>
				))
			) : (
				<Styled.NoContent>
					<Message type="NoContent" title="There are no portal features"></Message>
				</Styled.NoContent>
			)}
		</Styled.SwitchList>
	);
};
export default FeatureTogglerPortal;
