export interface IData {
  info: Array<IObj>;
}

export interface IObj {
  name: string;
  cwa: string;
  observationStations: string;
}
export interface IGeo {
  lat: number;
  lon: number;
}

export interface IGetInfo {
  getInfo: IInfoForStaition;
  nameCity: string;
}

export interface IInfoForStaition {
  cwa: string;
  gridX: number;
  gridY: number;
}
