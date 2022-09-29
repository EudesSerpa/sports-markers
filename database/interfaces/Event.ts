import { ISport } from "./Sport";
import { ITeam } from "./Team";

export interface IEvent {
  name: String;
  initDate: Date;
  teams: ITeam[];
  sport: ISport;
  results: [];
}
