import { Router, Request, Response } from 'express';
import InsiderEatsController from "@controller/InsiderEatsController";

const router = Router();

export const p = {
  basePath: '/square',
  parse: '/parse'
} as const;

router.post(
  p.parse,
  (req: Request, res: Response) => InsiderEatsController.parse(req, res)
);

export default router;