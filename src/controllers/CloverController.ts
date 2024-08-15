import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { success, failure } from "@shared/response";
import CloverService from "@services/CloverService";
import ErrorMessage from "@shared/errorMessage";
const { OK, INTERNAL_SERVER_ERROR } = StatusCodes;

class CloverController {
  async createOrder(req: Request, res: Response) {
    try {
      const orderData = await CloverService.createOrderService();
      return res.status(OK)
      .send(success(ErrorMessage.HTTP_OK, req.body));
    } catch (err) {
      return res
          .status(INTERNAL_SERVER_ERROR)
          .send(failure({ message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors: err }));
  }
  }
}

export default new CloverController();
