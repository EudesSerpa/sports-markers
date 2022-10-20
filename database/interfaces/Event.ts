import { ObjectId } from "mongoose";
import { ISport } from "./Sport";
import { ITeam } from "./Team";

export interface IEvent {
  userId: ObjectId;
  name: String;
  initDate: Date;
  teams: ITeam[];
  sport: ISport;
  results: [];
}
