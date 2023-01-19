import { Icon, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { GroupWrapper } from '@equinor/portal-ui';
import { useNavigate } from 'react-router-dom';
import { ContextProvider, ContextSelector } from '../context-selector';
import { useAppGroupsQuery } from '../queries';
import { StyledContent, StyledPaper, StyledWrapper, Wrapper } from './styles';

import { useAppModule } from './uss-app-module';

export const AppNotAvailable = () => {
  const { appManifest } = useAppModule();
  const { data, isLoading } = useAppGroupsQuery();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <StyledWrapper>
        <StyledContent>
          <StyledPaper elevation="raised">
            <Icon
              size={48}
              name="error_outlined"
              color={tokens.colors.interactive.warning__resting.rgba}
            />
            <Typography
              variant="h3"
              color={tokens.colors.interactive.warning__resting.rgba}
            >
              {appManifest?.name}
            </Typography>

            <Typography>
              Application not available for the selected context
            </Typography>

            <ContextProvider>
              <ContextSelector navigate={navigate} />
            </ContextProvider>
          </StyledPaper>

          {!isLoading && data && (
            <div>
              <p>Current apps are available for the selected context</p>
              <div>
                <GroupWrapper appGroups={data} />
              </div>
            </div>
          )}
        </StyledContent>
      </StyledWrapper>
    </Wrapper>
  );
};
