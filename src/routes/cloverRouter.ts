import { Router, Request, Response } from 'express';
import CloverController from "@controller/CloverController";

const router = Router();

export const p = {
  basePath: '/clover',
  webhook: '/webhook'
} as const;

router.post(
  p.webhook,
  (req: Request, res: Response) => CloverController.webhook(req, res)
);

export default router;