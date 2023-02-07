import { IHttpClient } from "@equinor/fusion-framework-module-http";
import { useFramework } from "@equinor/fusion-framework-react";
import { useFrameworkCurrentContext } from "@equinor/portal-core";
import { KpiCard } from "@equinor/portal-ui"
import { useQuery } from "react-query";
import { ProjectMaster } from "../project-cards/ProjectDetails";


// This is temp kpis to show possibilities should be created
export async function getHandoverData(client: IHttpClient, contextId?: string ):  Promise<HandoverPackage[] | undefined> {
    if (!contextId) return;
    const res = await client.fetch(`/api/contexts/${contextId}/handover`);
    if (!res.ok) throw res;
    return (await res.json()) as HandoverPackage[];
  }
  
  export const useHandoverQuery = () => {
    const client = useFramework().modules.serviceDiscovery.createClient('data-proxy');
    const currentContext = useFrameworkCurrentContext<ProjectMaster>();
   const contextId = currentContext?.id;
    return useQuery({
      queryKey: ['´Handover-kpis', contextId],
      queryFn: async () =>
      getHandoverData(await client, contextId),
    });
  };

  export function numberFormat(number: number): string {
    return parseFloat(Math.round(number).toString()).toLocaleString('no');
  }


export const Handover = () => {

    const {data} = useHandoverQuery()
    const statusData = getStatusBarData(data);

    const length = data?.length || 0

    return <KpiCard title="Handover" items={[{
        title: 'Total CP',
        value: numberFormat(length),
      },
      {
        title: 'RFO Accepted',
        value: numberFormat(statusData['RFOC Accepted']),
      },
      {
        title: 'RFO Sent',
        value: numberFormat(statusData['RFOC Sent']),
      },
      {
        title: 'RFO Partly',
        value: statusData['RFOC Partly'].toString(),
      },
      {
        title: 'RFO OS',
        value: numberFormat(statusData.OS),
      },
  
      {
        title: 'RFO vs target',
        value: numberFormat(
          statusData['RFOC Accepted'] + statusData['RFOC Sent'] - statusData.targetSum
        ),
      },
      {
        title: 'RFO overdue',
        value: numberFormat(statusData.overdue),
      },
      {
        title: 'RFO %',
        value: `${(
          ((statusData['RFOC Accepted'] + statusData['RFOC Sent']) / length || 0) *
          100
        ).toFixed(1)}%`,
      }]}/>
}


const getStatusBarData = (data?: HandoverPackage[]): Record<KPI, number> => {
    if (!data) return    {
        'RFOC Accepted': 0,
        'RFOC Partly': 0,
        'RFOC Sent': 0,
        OS: 0,
        overdue: 0,
        targetSum: 0,
      } as Record<KPI, number>;
    return data.reduce(
      (acc, curr) => {
        /** status */
        const pkgStatus = getKPIStatus(curr);
        acc[pkgStatus] = acc[pkgStatus] + 1;
  
        /** overdue */
        if (
          curr.rfocActualDate === '' &&
          curr.rfocPlannedDate !== '' &&
          new Date(curr.rfocPlannedDate).getTime() < new Date().getTime()
        ) {
          acc.overdue = acc.overdue + 1;
        }
  
        /** rfo vs target */
        if (
          curr.rfocPlannedDate !== '' &&
          new Date(curr.rfocPlannedDate).getTime() <= new Date().getTime()
        ) {
          acc.targetSum = acc.targetSum + 1;
        }
  
        return acc;
      },
      {
        'RFOC Accepted': 0,
        'RFOC Partly': 0,
        'RFOC Sent': 0,
        OS: 0,
        overdue: 0,
        targetSum: 0,
      } as Record<KPI, number>
    );
  };


export const getKPIStatus = (pkg: HandoverPackage): KPIStatus => {
    if (
      pkg.mcPkgsRFOCSigned > 0 &&
      pkg.mcPkgsCount > 0 &&
      pkg.mcPkgsRFOCSigned === pkg.mcPkgsCount
    ) {
      return 'RFOC Accepted';
    }
    if (
      pkg.mcPkgsRFOCShipped > 0 &&
      pkg.mcPkgsCount > 0 &&
      pkg.mcPkgsRFOCShipped === pkg.mcPkgsCount
    ) {
      return 'RFOC Sent';
    }
    if (pkg.mcPkgsRFOCSigned > 0) {
      return 'RFOC Partly';
    }
    return 'OS';
  };

  export type KPIStatus =
  | Extract<PackageStatus, 'RFOC Accepted' | 'RFOC Sent' | 'OS'>
  | 'RFOC Partly';
export type KPI = Partial<KPIStatus> | 'overdue' | 'targetSum';

/** Union type of the basic statuses found in several of the CC items (Workorder, MC, Handover etc.) */
export type BaseStatus = 'OS' | 'OK' | 'PA' | 'PB';

export type PackageStatus =
  | 'PA'
  | 'PB'
  | 'RFOC Accepted'
  | 'RFOC Sent'
  | 'RFOC Rejected'
  | 'TAC Accepted'
  | 'TAC Sent'
  | 'TAC Rejected'
  | 'RFCC Rejected'
  | 'RFCC Accepted'
  | 'RFCC Sent'
  | 'DCC Accepted'
  | 'DCC Sent'
  | 'RFRC Accepted'
  | 'RFRC Sent'
  | 'OS'
  | 'No status'
  | 'OK';

export type HandoverPackage = {
    actualFinishDate: string;
    actualStartDate: string;
    area: string;
    commpkgNo: string;
    commpkgStatus: BaseStatus;
    createdDate: string;
    demolitionActualFinishDate: string;
    demolitionActualStartDate: string;
    demolitionDCCAcceptedDate: string;
    demolitionForecastFinishDate: string;
    demolitionForecastStartDate: string;
    demolitionPlannedFinishDate: string;
    demolitionPlannedStartDate: string;
    demolitionRFRCShippedDate: string;
    description: string;
    forecastFinishDate: string;
    forecastStartDate: string;
    forecastTacDate: string;
    hasMaintenanceProgram: boolean;
    hasOperationAgreement: boolean;
    hasUnsignedActions: boolean;
    hasYellowLineMarkup: boolean;
    hasBlueLineMarkup: boolean;
    id: string;
    isDemolition: boolean;
    isInOperation: boolean;
    isReadyForStartup: boolean;
    isSubsea: boolean;
    mcDisciplineCodes: string[];
    mcDisciplines: string[] | null;
    mcPkgsCount: number;
    mcPkgsRFCCShippedCount: number;
    mcPkgsRFCCSigned: number;
    mcPkgsRFOCShipped: number;
    mcPkgsRFOCSigned: number;
    mcStatus: BaseStatus;
    phase: string;
    plannedFinishDate: string;
    plannedStartDate: string;
    plannedTacDate: string;
    priority1: string;
    priority2: string;
    priority3: string;
    priority1Description: string;
    priority2Description: string;
    priority3Description: string;
    progress: string;
    projectIdentifier: string;
    projectDescription: string;
    remark: string;
    responsible: string;
    rfccIsAccepted: boolean;
    rfccIsRejected: boolean;
    rfccIsShipped: boolean;
    rfccShippedDate: string;
    rfocActualDate: string;
    rfocForecastDate: string;
    rfocIsAccepted: boolean;
    rfocIsRejected: boolean;
    rfocIsShipped: boolean;
    rfocPlannedDate: string;
    rfocShippedDate: string;
    rowKey: string;
    siteCode: string;
    subSystem: string;
    system: string;
    tacActualDate: string;
    tacIsAccepted: boolean;
    tacIsRejected: boolean;
    tacIsShipped: boolean;
    url: string;
    volume: number;
    yellowLineStatus: string | null;
    blueLineStatus: string | null;
  };