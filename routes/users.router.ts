import { Router, Request, Response } from "express";
import { Fail } from "../interfaces/Fail";
import { Success } from "../interfaces/Success";

const router: Router = Router();

const users = [
  {
    id: 1,
    username: "Khappa",
  },
  {
    id: 2,
    username: "Zo",
  },
];

router.get("/", (_, res: Response) => {
  res.json(users);
});

router.get("/:id", (req: Request, res: Response): void => {
  const { id } = req.params;

  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    const errorNoData: Fail = {
      success: false,
      message: "User doesn't exists",
    };

    res.status(400).json(errorNoData);

    return;
  }

  res.json(user);
});

router.post("/", (req: Request, res: Response): void => {
  const { username } = req.body;

  if (!username) {
    const errorNoData: Fail = {
      success: false,
      message: "Username is missing",
    };

    res.status(400).json(errorNoData);

    return;
  }

  const alreadyExist = users.some((user) => user.username === username);

  if (alreadyExist) {
    const errorRepetData: Fail = {
      success: false,
      message: "User already exists",
    };

    res.status(409).json(errorRepetData);

    return;
  }

  users.push({ id: users.length + 1, username });

  const successCreated: Success = {
    success: true,
    data: users,
  };

  res.status(201).json(successCreated);
});

export default router;
