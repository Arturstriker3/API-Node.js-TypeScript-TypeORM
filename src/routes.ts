import { Router } from "express";
import { Request, Response } from 'express';
import { SubjectController } from "./controllers/SubjectController";
import { RoomController } from "./controllers/RoomController";

const routes = Router();

routes.post('/subject', new SubjectController().create)
routes.post('/room', new RoomController().create)
routes.post('/room/:idRoom/create', new RoomController().createVideo)
routes.post('/room/:idRoom/subject', new RoomController().roomSubject)

export default routes;