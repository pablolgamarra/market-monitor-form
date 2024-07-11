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

declare interface IFormMonitoreoHeaderStrings{
  PlaceholderUnidad:string,
  PlaceholderCliente:string,
  PlaceholderPeriodoCultivo:string,
  Unidad:string,
  Cliente:string,
  PeriodoCultivo:string,
}

declare module 'FormMonitoreoHeaderStrings' {
  const value: IFormMonitoreoHeaderStrings;
  export = value;
}