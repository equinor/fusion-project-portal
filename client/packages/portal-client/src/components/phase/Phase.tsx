import { usePhases } from '@equinor/portal-core';
import { HomePage, PhasePage } from '@equinor/portal-pages';
import { useObservable } from '@equinor/portal-utils';
import { selectedPhase$, setActivePhase } from '../../utils/phases/phases';

export function Phase() {
  const { data, isLoading } = usePhases();
  const phaseId = useObservable(selectedPhase$);

  //TODO: Handle this better
  if (isLoading || !data) return <div>Loading phases</div>;

  const selectedPhase = data.find((s) => s.id === phaseId);

  if (!selectedPhase)
    return (
      <HomePage
        phases={data.map((s) => ({
          ...s,
          onClick: () => s.active && setActivePhase(s),
        }))}
      />
    );

  return (
    <>
      <PhasePage {...selectedPhase} />
    </>
  );
}
