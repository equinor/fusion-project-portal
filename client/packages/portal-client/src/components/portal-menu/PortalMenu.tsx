import { PortalMenu } from '@equinor/portal-ui';

export function MenuGroups() {
  return (
    <PortalMenu>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5em' }}>
        {groups.map((group) => (
          <Group key={group.name} group={group} />
        ))}
      </div>
    </PortalMenu>
  );
}

type GroupProps = {
  group: MenuGroup;
};
const Group = ({ group }: GroupProps) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '0.5em',
        width: '200px',
        alignItems: 'flex-start',
      }}
    >
      <ColorTab color={group.color} />
      <div
        key={group.name}
        style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}
      >
        <div>{group.name}</div>
        <div style={{ display: 'flex', gap: '0.5em', flexDirection: 'column' }}>
          {group.children.map((child) => (
            <div key={child}>{child}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ColorTab = ({ color }: { color: string }) => {
  return (
    <div style={{ height: '16px', width: '4px', backgroundColor: color }}></div>
  );
};

type MenuGroup = {
  name: string;
  color: string;
  children: string[];
};

const groups: MenuGroup[] = [
  {
    name: 'Project Information',
    children: ['Home', 'Business analytics', 'Organization chart'],
    color: '#6D2FD5',
  },
  {
    name: 'SSU',
    color: '#E24973',
    children: ['Barrier management', 'Safety performance'],
  },
  {
    name: 'Engineering',
    color: ' #00977B',
    children: ['LCI Hanging garden', 'MDR analytics'],
  },
  {
    name: 'Quality and Risk',
    children: ['Non Conformity'],
    color: '#FF92A8',
  },
  {
    name: 'Construction & Commissioning',
    color: '#0084C4',
    children: [
      'Handover',
      'Project Browser',
      'Work preparation',
      'Installation',
      'Mechanical Completion',
      'Piping and Heat trace',
      'Preservation',
      'Checklist',
      'SWCR',
      'Invitation to Punch Out',
      'Commissioning Procedure',
    ],
  },
];
