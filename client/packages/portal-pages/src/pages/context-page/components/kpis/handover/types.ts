export type KPIStatus = Extract<PackageStatus, 'RFOC Accepted' | 'RFOC Sent' | 'OS'> | 'RFOC Partly';
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
