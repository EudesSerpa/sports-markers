import { Router } from "express";
import { createTeam, getTeam, getTeams } from "../controllers/team.controller";

const router: Router = Router();

// TODO: Apply validations
router.get("/", getTeams);

router.get("/:id", getTeam);

router.post("/", createTeam);

export default router;
