import { Icon } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { Availability, PresenceInfo } from './types';

export function getPresenceInfo(
  status: Availability | undefined
): PresenceInfo {
  if (!status) return { icon: <Icon name="help" />, status: 'Unknown' };

  switch (status) {
    case 'Available':
      return {
        icon: <StatusCircle color="#4bb748" />,
        status: 'Available',
      };

    case 'Away':
      return {
        icon: <StatusCircle color="#fbca36" />,
        status: 'Away',
      };

    case 'BeRightBack':
      return {
        icon: <StatusCircle color="#fbca36" />,
        status: 'Be right back',
      };

    case 'Busy':
      return {
        icon: <StatusCircle color="#eb0000" />,
        status: 'Busy',
      };

    case 'DoNotDisturb': {
      return {
        icon: <StatusCircle color="#eb0000" />,
        status: 'Do not disturb',
      };
    }

    case 'Offline':
      return {
        icon: <StatusCircle color="#bfbfbf" />,
        status: 'Offline',
      };

    default: {
      return {
        icon: <StatusCircle color="grey" />,
        status: 'Unknown',
      };
    }
  }
}

const StatusCircle = styled.div<{ color: string }>`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;
