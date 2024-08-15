import {Request, Response} from 'express';
import StatusCodes from 'http-status-codes';
import {failure, success} from "@shared/response";
import ErrorMessage from "@shared/errorMessage";
const {OK, INTERNAL_SERVER_ERROR, BAD_REQUEST} = StatusCodes;
import InsiderEatsService from "@services/InsiderEatsService";
//af71080f-b6e6-779e-aad0-11e16f576962
class CloverController {
  async webhook(req: Request, res: Response) {
    try {
      const event = req.body;

      // Handle the event
      console.log('Received event:', event);
      return res.status(OK).send(success(ErrorMessage.HTTP_OK, {
        data: event
      }));
    } catch (err) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send(failure({
          message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR,
          errors: err
        }));
    }
  }
}

export default new CloverController();