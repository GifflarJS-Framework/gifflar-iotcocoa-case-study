import { IElementaryTypeName } from "gifflar-library/bin/modules/types/IElementaryTypeName";

export interface IIoTValue {
  idv: string;
  type: IElementaryTypeName;
  default: string;
  max?: string;
  min?: string;
}
