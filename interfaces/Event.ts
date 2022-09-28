import { ISport } from "./Sport";
import { ITeam } from "./Team";

export interface IEvent {
  initDate: Date;
  teams: ITeam[];
  sport: ISport;
  result: string;
}
