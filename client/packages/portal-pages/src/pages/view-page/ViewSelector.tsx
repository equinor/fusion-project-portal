import { Button, Icon } from '@equinor/eds-core-react';
import { arrow_drop_right } from '@equinor/eds-icons';
import { View } from '@equinor/portal-core';
import { StyledViewSelectorWrapper } from './ViewPage.Styles';

interface ViewSelectorProps {
  views: View[];
  currentView: View;
  setViewId: (viewId: string | undefined) => void;
}

export const ViewSelector = ({
  views,
  currentView,
  setViewId,
}: ViewSelectorProps) => {
  return (
    <StyledViewSelectorWrapper>
      {currentView &&
        views.map((view) => {
          if (view.key === currentView.key) {
            return <div key={view.id}></div>;
          }
          return (
            <Button
              key={view.key}
              variant="ghost"
              onClick={() => {
                setViewId(view.key);
              }}
            >
              {view.name} <Icon {...arrow_drop_right} />
            </Button>
          );
        })}
    </StyledViewSelectorWrapper>
  );
};
