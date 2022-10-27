import { Search } from '@equinor/eds-core-react';
import { PortalMenu } from '@equinor/portal-ui';
import { useObservable } from '@equinor/portal-utils';
import { GroupWrapper } from './GroupWrapper/GroupWrapper';
import { menuController } from '@equinor/portal-core';

const { groupsMatchingSearch$, setSearchText } = menuController;

export function MenuGroups() {
  const groups = useObservable(groupsMatchingSearch$);

  if (!groups) return null;

  return (
    <PortalMenu>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2em' }}>
        <Search
          placeholder="Search for apps"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <GroupWrapper groups={groups} />
      </div>
    </PortalMenu>
  );
}
