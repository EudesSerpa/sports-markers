import { IEvent } from "../database/interfaces/Event";
import { Event } from "../database/models/event.model";
import { CustomError } from "../models/custom-error.model";
import { validateId } from "../helpers/db/validateId";

export class eventService {
  constructor() {}

  async find(): Promise<IEvent[]> {
    return await Event.find({}).lean();
  }

  async findWithPagination({
    limit = 5,
    offset = 0,
  }: {
    limit: number;
    offset: number;
  }): Promise<IEvent[]> {
    const options = {
      limit,
      skip: offset,
    };

    return await Event.find({}, null, options).lean();
  }

  async findOne(id: any): Promise<IEvent> {
    validateId(id);

    const event = await Event.findById(id);

    if (!event) {
      throw new CustomError("Event doesn't exists", 404);
    }

    return event;
  }

  async create({
    name,
    initDate,
    teams,
    sport,
    results,
  }: IEvent): Promise<IEvent> {
    const alreadyExist = await Event.exists({ name, initDate });

    if (alreadyExist) {
      throw new CustomError(
        "Event already created previously with the same name and date",
        409
      );
    }

    const newEvent: IEvent = { name, initDate, teams, sport, results };

    const sportCreated = await Event.create(newEvent);

    return sportCreated;
  }

  async update({ id, data }: { id: any; data: {} }): Promise<IEvent> {
    if (!Object.keys(data).length) {
      throw new CustomError(
        "You don't send any data to update. If you want clean up the Event, you can delete it",
        400
      );
    }

    validateId(id);

    const eventUpdated = await Event.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });

    if (!eventUpdated) {
      throw new CustomError("Event doesn't exist", 404);
    }

    return eventUpdated;
  }

  async delete(id: any): Promise<IEvent | object> {
    validateId(id);

    const eventDeleted = await Event.findByIdAndDelete(id);

    if (!eventDeleted) {
      return { info: "There's no any event to delete :)" };
    }

    return eventDeleted;
  }
}
