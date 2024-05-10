export interface IDropdownVolumen{
    label: string,
    id:string,
    placeholder:string,
    name:string,
    value:string,
    onChange(e:{name:string, value:string|number}):void,
}