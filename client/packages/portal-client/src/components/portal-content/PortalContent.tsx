import { usePhases } from '@equinor/portal-core';
import { HomePage, PhasePage } from '@equinor/portal-pages';

export function PortalContent() {
  const { currentPhase, phases, setActivePhase } = usePhases();

  if (!phases) return <div>Loading phases....</div>;

  if (!currentPhase)
    return (
      <HomePage
        phases={phases.map((phase) => ({
          ...phase,
          onClick: () => phase.active && setActivePhase(phase),
        }))}
      />
    );

  return (
    <>
      <PhasePage {...currentPhase} />
    </>
  );
}
