import {Request, Response} from 'express';
import StatusCodes from 'http-status-codes';
import {failure, success} from "@shared/response";
import ErrorMessage from "@shared/errorMessage";
const {OK, INTERNAL_SERVER_ERROR, BAD_REQUEST} = StatusCodes;
import InsiderEatsService from "@services/InsiderEatsService";
import SquareService from "@services/SquareService";
import SquareRepo from "@repos/SquareRepo";
import IOrder from "@customType/controller/Parser";

class InsiderEatsController {
  async parse(req: Request, res: Response) {
    // try {
      const sanitizedEmail = InsiderEatsService.sanitizeInput(req.body.email);
      const parsedOrder = await InsiderEatsService.parse(sanitizedEmail);

      return res.status(OK).send(success(ErrorMessage.HTTP_OK, {
         parsedOrder
      }));
    // } catch (err) {
    //   return res
    //     .status(INTERNAL_SERVER_ERROR)
    //     .send(failure({
    //       message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR,
    //       errors: err
    //     }));
    // }
  }
}

export default new InsiderEatsController();