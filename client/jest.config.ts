import { getJestProjects } from '@nrwl/jest';
import type { Config } from 'jest';

const config: Config = {
  projects: getJestProjects(),
  verbose: true,
};

export default config;
