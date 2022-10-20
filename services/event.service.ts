import { IEvent } from "../database/interfaces/Event";
import { Event } from "../database/models/event.model";
import { CustomError } from "../models/custom-error.model";
import { validateId } from "../helpers/db/validateId";

export class eventService {
  constructor() {}

  async find({ limit, offset, userId }: any): Promise<IEvent[]> {
    const filter: any = {};
    const options: any = {
      sort: {
        createdAt: "desc",
      },
    };

    // filtered
    if (userId) {
      filter.userId = userId;
    }

    // Paginated or limited
    if (limit && offset) {
      options.limit = limit;
      options.skip = offset;
    } else if (limit) {
      options.limit = limit;
    }

    return await Event.find(filter, null, options).lean();
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
    userId,
    name,
    initDate,
    teams,
    sport,
    results,
  }: IEvent): Promise<IEvent> {
    const alreadyExist = await Event.exists({ userId, name, initDate });

    if (alreadyExist) {
      throw new CustomError(
        "This user has previously created an event with the same name and date",
        409
      );
    }

    const newEvent: IEvent = { userId, name, initDate, teams, sport, results };

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
