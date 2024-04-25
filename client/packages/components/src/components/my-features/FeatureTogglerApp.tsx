import { IFeatureFlag, useCurrentAppFeatures } from '@equinor/fusion-framework-react/feature-flag';

import { Typography, Switch } from '@equinor/eds-core-react';

import { Styled } from './Styled';
import { Message } from '@portal/ui';

/**
 * JSX structure for Feature toggler tab for app features in the PersonSidesheet's Feature page.
 */
export const FeatureTogglerApp = (props: { onClick: (feature: IFeatureFlag) => void }) => {
	const { features, toggleFeature } = useCurrentAppFeatures();
	return (
		<Styled.SwitchList>
			{features?.length > 0 ? (
				features.map((feature) => {
					return (
						<Styled.SwitchListItem
							key={`feat-${feature.key}`}
							onClick={() => {
								toggleFeature(feature.key);
								props.onClick(feature);
							}}
						>
							<Styled.SwitchLabel>
								<Typography variant="body_short_bold">{feature.title ?? feature.key}</Typography>
								{feature.description && (
									<Typography variant="body_short_italic">{feature.description}</Typography>
								)}
							</Styled.SwitchLabel>
							<Styled.Switch>
								<Switch checked={feature.enabled} disabled={feature.readonly} />
							</Styled.Switch>
						</Styled.SwitchListItem>
					);
				})
			) : (
				<Styled.NoContent>
					<Message type="NoContent" title="There is no app features for the current app" />
				</Styled.NoContent>
			)}
		</Styled.SwitchList>
	);
};

export default FeatureTogglerApp;
