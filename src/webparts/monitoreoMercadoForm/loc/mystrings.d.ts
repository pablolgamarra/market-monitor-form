declare interface IMonitoreoMercadoFormWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;
}

declare module 'MonitoreoMercadoFormWebPartStrings' {
  const strings: IMonitoreoMercadoFormWebPartStrings;
  export = strings;
}

declare interface IMonitorFormHeaderStrings{
  PlaceholderUnidad:string,
  PlaceholderCliente:string,
  PlaceholderPeriodoCultivo:string,
  Unidad:string,
  Cliente:string,
  PeriodoCultivo:string,
}

declare module 'MonitorFormHeaderStrings' {
  const value: IMonitorFormHeaderStrings;
  export = value;
}