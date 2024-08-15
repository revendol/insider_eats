import { Router, Request, Response } from 'express';
import CloverController from "@controller/CloverController";

const router = Router();

export const p = {
  basePath: '/clover',
  createOrder: '/createOrder'
} as const;

export default router;