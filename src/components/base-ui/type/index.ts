type IFromType = "password" | "select" | "input" | "datepicker"

export interface IFromItems {
  type: IFromType,
  label: string,
  rules?: any[],
  placeholder?: any,
  options?: any[],
  otherOptions?: any
}
export interface IFrom {
  fromItems: IFromItems [],
  labelWidth?: string,
  colLayout?: any,
  itemLayout?: any
}
