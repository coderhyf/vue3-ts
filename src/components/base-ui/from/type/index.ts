type IFromType = "password" | "select" | "input" | "datepicker"

export interface IFromItems {
  field: string,
  type: IFromType,
  label: string,
  rules?: any[],
  placeholder?: any,
  options?: any[],
  otherOptions?: any,
  isHidden?: boolean
}

export interface IFrom {
  fromItems: IFromItems [],
  labelWidth?: string,
  colLayout?: any,
  itemLayout?: any
}
