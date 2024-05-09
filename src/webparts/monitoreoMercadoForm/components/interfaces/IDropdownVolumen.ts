export interface IDropdownVolumen{
    label: string,
    id:string,
    placeholder:string,
    name:string,
    value:string,
    onChange(e:| React.ChangeEvent<HTMLInputElement>| React.ChangeEvent<HTMLSelectElement>):void,
}