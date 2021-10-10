import hyRequest from "../../index";
import { IDataType } from "../../types";

export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  });
}

export function deletePageDataById(url: string) {
  return hyRequest.delete<IDataType>({
    url
  });
}
