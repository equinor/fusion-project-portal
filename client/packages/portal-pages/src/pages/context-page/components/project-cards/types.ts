export interface Relations {
  relationSource: string;
  relationType?: any;
  id: string;
  externalId: string;
  source?: any;
  type: Type;
  value: Value;
  title: string;
  isActive: boolean;
  isDeleted: boolean;
  created: string;
  updated?: string;
}

interface Value {
  identity?: string;
  sapPlant?: string;
  schema?: string;
  subFacilities?: string[];
  parentFacility?: any;
  contractNumber?: string;
  companyName?: string;
  startDate?: string;
  endDate?: string;
  projectMasterId?: string;
  isValid?: boolean;
  taskName?: string;
  taskType?: string;
  taskState?: string;
  orgChartId?: string;
  orgUnitSapId?: string;
  orgUnitShortName?: string;
  orgUnitName?: string;
  orgUnitDepartment?: string;
  orgUnitFullDepartment?: string;
  orgUnitType?: string;
  domainId?: string;
  dgPhase?: string;
  siteCode?: string;
  projectIdentifier?: string;
  wbs?: string;
}

interface Contract {
    contractNumber?: number;
    companyName?: string;
    startDate?: string;
    endDate?: string;
    projectMasterId?: string;
    isValid: boolean;
}

interface Facility {
    identity: string;
    sapPlant: string;
    schema: string;
    subFacilities?: string[];
    parentFacility?: string[];
}

interface OrgChart {
    orgChartId?: string;
    domainId?: string;
    dgPhase?: string;
}

interface EquinorTask {
    taskName?: string;
    taskType?: string;
    taskState?: string;
    orgChartId?: string;
    orgUnitSapId?: string;
    orgUnitShortName?: string;
    orgUnitName?: string;
    orgUnitDepartment?: string;
    orgUnitFullDepartment?: string;
    orgUnitType?: string;
    projectMasterId?: string;
}

interface PDP {
    siteCode: string;
    projectIdentifier: string;
}

interface PimsDomain {
    domainId?: string;
    projectMasterId?: string;
}

interface Type {
  id: string;
  isChildType: boolean;
  parentTypeIds: string[];
}

[
    {
      "relationSource": "Facility|ProjectMaster",
      "relationType": null,
      "id": "71db33bb-cb1b-42cf-b5bf-969c77e40931",
      "externalId": "JCA",
      "source": null,
      "type": {
        "id": "Facility",
        "isChildType": false,
        "parentTypeIds": []
      },
      "value": {
        "identity": "JCA",
        "sapPlant": "1930",
        "schema": "PCS$JOHAN_CASTBERG",
        "subFacilities": [],
        "parentFacility": null
      },
      "title": "Johan Castberg",
      "isActive": true,
      "isDeleted": false,
      "created": "2020-02-24T09:15:47.1133333+00:00",
      "updated": null
    },
    {
      "relationSource": "ProjectMaster|Contract",
      "relationType": null,
      "id": "436a21bd-24fc-4041-9ee9-06adc87221b9",
      "externalId": "4502790898",
      "source": null,
      "type": {
        "id": "Contract",
        "isChildType": true,
        "parentTypeIds": [
          "ProjectMaster"
        ]
      },
      "value": {
        "contractNumber": "4502790898",
        "companyName": "Aker Solutions",
        "startDate": "2013-07-12T00:00:00",
        "endDate": "2022-10-01T00:00:00",
        "projectMasterId": "FC5FFCBC-392F-4D7E-BB14-79A006579337",
        "isValid": true
      },
      "title": "Johan Castberg Floater - Extended Concept study + EPMa option",
      "isActive": true,
      "isDeleted": false,
      "created": "2022-10-07T10:27:31.61+00:00",
      "updated": null
    },
    {
      "relationSource": "ProjectMaster|Contract",
      "relationType": null,
      "id": "eb125ba8-2a7d-43a4-ba69-12ece029c40c",
      "externalId": "4503591780",
      "source": null,
      "type": {
        "id": "Contract",
        "isChildType": true,
        "parentTypeIds": [
          "ProjectMaster"
        ]
      },
      "value": {
        "contractNumber": "4503591780",
        "companyName": "Aker Solutions",
        "startDate": "2017-12-05T00:00:00",
        "endDate": "2023-06-01T00:00:00",
        "projectMasterId": "FC5FFCBC-392F-4D7E-BB14-79A006579337",
        "isValid": true
      },
      "title": "NCS 2017 + Subsea Production System EPC",
      "isActive": true,
      "isDeleted": false,
      "created": "2022-10-07T10:27:21.4033333+00:00",
      "updated": null
    },
    {
      "relationSource": "ProjectMaster|Contract",
      "relationType": null,
      "id": "3021ee92-5db9-4835-8bd2-14a2e544bdab",
      "externalId": "4503580306",
      "source": null,
      "type": {
        "id": "Contract",
        "isChildType": true,
        "parentTypeIds": [
          "ProjectMaster"
        ]
      },
      "value": {
        "contractNumber": "4503580306",
        "companyName": "Subsea7 Norway AS",
        "startDate": "2018-01-24T00:00:00",
        "endDate": "2022-10-15T00:00:00",
        "projectMasterId": "FC5FFCBC-392F-4D7E-BB14-79A006579337",
        "isValid": true
      },
      "title": "Rigid Flowlines and structures (WP2)",
      "isActive": true,
      "isDeleted": false,
      "created": "2022-10-07T10:27:22.8633333+00:00",
      "updated": null
    },
    {
      "relationSource": "ProjectMaster|OrgChart",
      "relationType": null,
      "id": "f78b2a4a-cf9e-44b0-a5a3-18f1508e3176",
      "externalId": "3cf72ff9-c50f-4e94-ba79-31721ba42dec",
      "source": null,
      "type": {
        "id": "OrgChart",
        "isChildType": true,
        "parentTypeIds": [
          "Project",
          "Portfolio"
        ]
      },
      "value": {
        "orgChartId": "3cf72ff9-c50f-4e94-ba79-31721ba42dec",
        "domainId": "SKRUGARD",
        "dgPhase": ""
      },
      "title": "Johan Castberg",
      "isActive": true,
      "isDeleted": false,
      "created": "2020-02-24T09:15:47.1133333+00:00",
      "updated": null
    },
    {
      "relationSource": "ProjectMaster|EquinorTask",
      "relationType": null,
      "id": "2c49b999-2feb-49dc-bb13-42a651cd92bc",
      "externalId": "1d68b234-a09c-443c-e435-08d9afe59742",
      "source": null,
      "type": {
        "id": "EquinorTask",
        "isChildType": true,
        "parentTypeIds": [
          "OrgChart"
        ]
      },
      "value": {
        "taskName": "Johan Castberg",
        "taskType": "PDOG",
        "taskState": "Active",
        "orgChartId": "3cf72ff9-c50f-4e94-ba79-31721ba42dec",
        "orgUnitSapId": "53014029",
        "orgUnitShortName": "NAN",
        "orgUnitName": "New Assets Norway",
        "orgUnitDepartment": "PDP PRD NAN",
        "orgUnitFullDepartment": "PDP PRD NAN",
        "orgUnitType": "DeliveryEntity",
        "projectMasterId": "fc5ffcbc-392f-4d7e-bb14-79a006579337"
      },
      "title": "Johan Castberg",
      "isActive": true,
      "isDeleted": false,
      "created": "2022-02-02T15:24:20.39+00:00",
      "updated": "2022-05-18T21:19:59.3067793+00:00"
    },
    {
      "relationSource": "ProjectMaster|Contract",
      "relationType": null,
      "id": "1c974c28-5aef-456e-95a0-4895820e3c72",
      "externalId": "4600023772",
      "source": null,
      "type": {
        "id": "Contract",
        "isChildType": true,
        "parentTypeIds": [
          "ProjectMaster"
        ]
      },
      "value": {
        "contractNumber": "4600023772",
        "companyName": "Kværner",
        "startDate": "2018-02-13T00:00:00",
        "endDate": "2024-10-01T00:00:00",
        "projectMasterId": "FC5FFCBC-392F-4D7E-BB14-79A006579337",
        "isValid": true
      },
      "title": "FPSO Integration",
      "isActive": true,
      "isDeleted": false,
      "created": "2022-10-07T10:27:21.79+00:00",
      "updated": null
    },
    {
      "relationSource": "ProjectMaster|PDP",
      "relationType": null,
      "id": "25b66711-2bc5-41d5-b271-4f39e6b26caf",
      "externalId": "JCA|L.O532C.002",
      "source": null,
      "type": {
        "id": "PDP",
        "isChildType": true,
        "parentTypeIds": [
          "Facility",
          "Project"
        ]
      },
      "value": {
        "siteCode": "JCA",
        "projectIdentifier": "L.O532C.002"
      },
      "title": "Johan Castberg Facilities Project",
      "isActive": true,
      "isDeleted": false,
      "created": "2020-02-24T23:04:45.4033333+00:00",
      "updated": null
    },
    {
      "relationSource": "ProjectMaster|Contract",
      "relationType": null,
      "id": "d8fd1173-408e-4b1c-b68f-523767f5ff72",
      "externalId": "4503668898",
      "source": null,
      "type": {
        "id": "Contract",
        "isChildType": true,
        "parentTypeIds": [
          "ProjectMaster"
        ]
      },
      "value": {
        "contractNumber": "4503668898",
        "companyName": "Alcatel Submarine Networks",
        "startDate": "2018-08-21T00:00:00",
        "endDate": "2024-12-02T00:00:00",
        "projectMasterId": "FC5FFCBC-392F-4D7E-BB14-79A006579337",
        "isValid": true
      },
      "title": "Johan Castberg Permanent Reservoir Monitoring EPCI",
      "isActive": true,
      "isDeleted": false,
      "created": "2022-10-07T10:27:21.4966667+00:00",
      "updated": null
    },
    {
      "relationSource": "ProjectMaster|PDP",
      "relationType": null,
      "id": "adb5c342-2f92-4ab1-ba37-658761ad4ab5",
      "externalId": "STP|L.O532C.002",
      "source": null,
      "type": {
        "id": "PDP",
        "isChildType": true,
        "parentTypeIds": [
          "Facility",
          "Project"
        ]
      },
      "value": {
        "siteCode": "STP",
        "projectIdentifier": "L.O532C.002"
      },
      "title": "Johan Castberg Facilities Project",
      "isActive": true,
      "isDeleted": false,
      "created": "2020-02-24T23:03:59.8933333+00:00",
      "updated": null
    },
    {
      "relationSource": "ProjectMaster|Contract",
      "relationType": null,
      "id": "c708f290-55e1-459b-b6a8-66a7994a009b",
      "externalId": "4503596990",
      "source": null,
      "type": {
        "id": "Contract",
        "isChildType": true,
        "parentTypeIds": [
          "ProjectMaster"
        ]
      },
      "value": {
        "contractNumber": "4503596990",
        "companyName": "Oceaneering",
        "startDate": "2017-12-22T00:00:00",
        "endDate": "2022-12-31T00:00:00",
        "projectMasterId": "FC5FFCBC-392F-4D7E-BB14-79A006579337",
        "isValid": true
      },
      "title": "Umbilical System, Engineering, procurement and construction (EPC)",
      "isActive": true,
      "isDeleted": false,
      "created": "2022-10-07T10:27:22.45+00:00",
      "updated": null
    },
    {
      "relationSource": "ProjectMaster|Contract",
      "relationType": null,
      "id": "58500c57-10ab-4b87-b956-6dee7e5f210b",
      "externalId": "4503479274",
      "source": null,
      "type": {
        "id": "Contract",
        "isChildType": true,
        "parentTypeIds": [
          "ProjectMaster"
        ]
      },
      "value": {
        "contractNumber": "4503479274",
        "companyName": "SBM Offshore",
        "startDate": "2022-01-06T00:00:00",
        "endDate": "2024-10-31T00:00:00",
        "projectMasterId": "FC5FFCBC-392F-4D7E-BB14-79A006579337",
        "isValid": true
      },
      "title": "Offshore Turret Mooring System",
      "isActive": true,
      "isDeleted": false,
      "created": "2022-10-07T10:27:22.55+00:00",
      "updated": null
    },
    {
      "relationSource": "ProjectMaster|PimsDomain",
      "relationType": null,
      "id": "17e3e17f-ee2c-44de-8a14-7f9490c6dfaf",
      "externalId": "SKRUGARD",
      "source": null,
      "type": {
        "id": "PimsDomain",
        "isChildType": true,
        "parentTypeIds": [
          "ProjectMaster",
          "Project"
        ]
      },
      "value": {
        "domainId": "SKRUGARD",
        "projectMasterId": "FC5FFCBC-392F-4D7E-BB14-79A006579337"
      },
      "title": "Johan Castberg",
      "isActive": true,
      "isDeleted": false,
      "created": "2020-02-24T09:15:47.1133333+00:00",
      "updated": null
    },
    {
      "relationSource": "ProjectMaster|Contract",
      "relationType": null,
      "id": "49d868fa-f0b1-48b9-956a-877b67a922cc",
      "externalId": "4600023614",
      "source": null,
      "type": {
        "id": "Contract",
        "isChildType": true,
        "parentTypeIds": [
          "ProjectMaster"
        ]
      },
      "value": {
        "contractNumber": "4600023614",
        "companyName": "Sembcorp Marine",
        "startDate": "2017-11-09T00:00:00",
        "endDate": "2022-04-30T00:00:00",
        "projectMasterId": "FC5FFCBC-392F-4D7E-BB14-79A006579337",
        "isValid": true
      },
      "title": "Rigs & Floaters pte Ltd Hull and LQ EPC",
      "isActive": true,
      "isDeleted": false,
      "created": "2022-10-07T10:27:22.7066667+00:00",
      "updated": null
    },
    {
      "relationSource": "ProjectMaster|Project",
      "relationType": null,
      "id": "b6552a8f-9173-416f-9fc0-996387ff7e3a",
      "externalId": "L.O532C.002",
      "source": null,
      "type": {
        "id": "Project",
        "isChildType": true,
        "parentTypeIds": [
          "ProjectMaster"
        ]
      },
      "value": {
        "wbs": "L.O532C.002",
        "projectMasterId": "FC5FFCBC-392F-4D7E-BB14-79A006579337",
        "isValid": true
      },
      "title": "Johan Castberg Facilities Project",
      "isActive": true,
      "isDeleted": false,
      "created": "2020-02-24T09:15:47.1133333+00:00",
      "updated": null
    },
    {
      "relationSource": "ProjectMaster|Contract",
      "relationType": null,
      "id": "2d3c95f0-3f96-40a1-aab2-af03581b39dc",
      "externalId": "4503605511",
      "source": null,
      "type": {
        "id": "Contract",
        "isChildType": true,
        "parentTypeIds": [
          "ProjectMaster"
        ]
      },
      "value": {
        "contractNumber": "4503605511",
        "companyName": "Havfram AS",
        "startDate": "2018-02-01T00:00:00",
        "endDate": "2024-10-31T00:00:00",
        "projectMasterId": "FC5FFCBC-392F-4D7E-BB14-79A006579337",
        "isValid": true
      },
      "title": "Marine Operations",
      "isActive": true,
      "isDeleted": false,
      "created": "2022-10-07T10:27:22.3666667+00:00",
      "updated": null
    },
    {
      "relationSource": "ProjectMaster|Contract",
      "relationType": null,
      "id": "d607c651-ed38-4618-8d46-b5eaa3c92cb3",
      "externalId": "4600023779",
      "source": null,
      "type": {
        "id": "Contract",
        "isChildType": true,
        "parentTypeIds": [
          "ProjectMaster"
        ]
      },
      "value": {
        "contractNumber": "4600023779",
        "companyName": "Kværner",
        "startDate": "2018-02-15T00:00:00",
        "endDate": "2022-12-31T00:00:00",
        "projectMasterId": "FC5FFCBC-392F-4D7E-BB14-79A006579337",
        "isValid": true
      },
      "title": "Topside FC and Integration (DUMMY Contract)",
      "isActive": true,
      "isDeleted": false,
      "created": "2022-10-07T10:27:21.96+00:00",
      "updated": null
    },
    {
      "relationSource": "ProjectMaster|Contract",
      "relationType": null,
      "id": "f5513dd3-a778-4487-983f-cb10111395c7",
      "externalId": "4600023771",
      "source": null,
      "type": {
        "id": "Contract",
        "isChildType": true,
        "parentTypeIds": [
          "ProjectMaster"
        ]
      },
      "value": {
        "contractNumber": "4600023771",
        "companyName": "Kværner",
        "startDate": "2017-11-01T00:00:00",
        "endDate": "2022-06-01T00:00:00",
        "projectMasterId": "FC5FFCBC-392F-4D7E-BB14-79A006579337",
        "isValid": true
      },
      "title": "Topside FC",
      "isActive": true,
      "isDeleted": false,
      "created": "2022-10-07T10:27:22.2333333+00:00",
      "updated": null
    },
    {
      "relationSource": "ProjectMaster|Contract",
      "relationType": null,
      "id": "8d423a55-c411-4faf-8bd7-f2e2c63daea0",
      "externalId": "4503592277",
      "source": null,
      "type": {
        "id": "Contract",
        "isChildType": true,
        "parentTypeIds": [
          "ProjectMaster"
        ]
      },
      "value": {
        "contractNumber": "4503592277",
        "companyName": "Alcatel Submarine Networks",
        "startDate": "2017-12-12T00:00:00",
        "endDate": "2021-09-03T00:00:00",
        "projectMasterId": "FC5FFCBC-392F-4D7E-BB14-79A006579337",
        "isValid": true
      },
      "title": "EPCI DC/FO System",
      "isActive": true,
      "isDeleted": false,
      "created": "2022-10-07T10:27:21.6533333+00:00",
      "updated": null
    },
    {
      "relationSource": "ProjectMaster|Contract",
      "relationType": null,
      "id": "df58ad2c-c3dd-421e-b14c-fa81c3f8c1bb",
      "externalId": "4503596980",
      "source": null,
      "type": {
        "id": "Contract",
        "isChildType": true,
        "parentTypeIds": [
          "ProjectMaster"
        ]
      },
      "value": {
        "contractNumber": "4503596980",
        "companyName": "NOV - National Oilwell Varco Denmark I/S",
        "startDate": "2017-12-21T00:00:00",
        "endDate": "2022-12-31T00:00:00",
        "projectMasterId": "FC5FFCBC-392F-4D7E-BB14-79A006579337",
        "isValid": true
      },
      "title": "Johan Castberg Flexible Flowlines and Risers",
      "isActive": true,
      "isDeleted": false,
      "created": "2022-10-07T10:27:22.06+00:00",
      "updated": null
    }
  ]

