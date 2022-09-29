import { Model, model, Schema, Types } from "mongoose";
import { IEvent } from "../interfaces/Event";
import { ISport } from "../interfaces/Sport";
import { ITeam } from "../interfaces/Team";

// Types for apply Subdocuments with the 3rd generic param of the Model<>
// TMethodsAndOverrides
type EventDocumentOverrides = {
  sport: Types.Subdocument<Types.ObjectId> & ISport;
  teams: Types.DocumentArray<ITeam>;
};

type EventModelType = Model<IEvent, {}, EventDocumentOverrides>;

const eventSchema: Schema = new Schema<IEvent, EventModelType>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Event must have a name"],
    },
    initDate: {
      type: Date,
      required: [true, "Event must have an init date"],
    },
    sport: {
      type: new Schema<ISport>({ name: String }, { _id: false }),
      trim: true,
      required: [true, "Event must have a defined sport"],
    },
    teams: {
      type: [
        new Schema<ITeam>({ name: String, imageURI: String }, { _id: false }),
      ],
      required: [true, "Event must have two teams as items of the teams array"],
    },
    results: {
      type: [],
      required: [true, "Event must have its corresponding result as an array"],
    },
  },
  {
    timestamps: true,
  }
);

export const Event = model<IEvent, EventModelType>("Event", eventSchema);
