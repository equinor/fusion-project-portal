import { Phase } from '../types/portal-config';
import { Early } from './phase-icons/Early';
import { Execution } from './phase-icons/Execution';
import { Renewable } from './phase-icons/Renewable';

export const phases: Phase[] = [
  {
    id: 'early-phase',
    title: 'Early phase',
    description: 'Here you can find all the tools that you need.',
    icon: Early,
    active: true,
  },
  {
    id: 'execution-phase',
    title: 'Project Execution',
    description: 'Go to this phase to work with projects that are beyond DG3.',
    icon: Execution,
    active: true,
  },
  {
    id: 'renewable-phase',
    title: 'Renewable Execution',
    description:
      'Go to this phase to work with renewable projects that are beyond DG3.',
    icon: Renewable,
    // active: true,
  },
];
