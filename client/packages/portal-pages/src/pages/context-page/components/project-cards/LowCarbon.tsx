import { KpiCard } from "../../../../../../portal-ui/src/lib/kpis/KpiCard"

export const LowCarbon = () => {
    return <KpiCard title="Low Carbon" items={[{title: "CO2 intensity", value: "14.48"},{title: "CO2 emission", value: "8.30"}]}/>
}