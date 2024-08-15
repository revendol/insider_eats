import { Router, Request, Response } from 'express';
import InsiderEatsController from "@controller/InsiderEatsController";
import CloverController from '@controller/CloverController';

const router = Router();

export const p = {
  basePath: '/square',
  parse: '/parse',
  createOrder: '/createOrder'
} as const;

router.post(
  p.parse,
  (req: Request, res: Response) => InsiderEatsController.parse(req, res)
);
router.post(
  p.createOrder,
  (req: Request, res: Response) => CloverController.createOrder(req, res)
);

export default router;