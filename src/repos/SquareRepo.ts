import {Client, Environment, ApiError} from 'square';
import envVars from "@shared/env-vars";
import {ISquareCustomer, ISquareLocation, ISquareOrder} from "@customType/Square";
const squareClient = new Client({
  bearerAuthCredentials: {
    accessToken: envVars.square.accessToken
  },
  environment: envVars.square.environment === 'sandbox'?Environment.Sandbox:Environment.Production
});

class SquareRepo{
  //Create customer
  async createCustomer(data: ISquareCustomer){
    try {
      const response = await squareClient.customersApi.createCustomer({
        givenName: data.givenName,
        phoneNumber: data.phoneNumber
      });
      if(response.result.customer){
        return response.result.customer.id
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }
  //Get customer by phone number
  async getCustomerByPhoneNumber(phoneNumber: string){
    try {
    const response : any = await squareClient.customersApi.searchCustomers({
      query: {
        filter: {
          phoneNumber: {
            fuzzy: phoneNumber
          }
        }
      }
    });
    if(response.result.customers){
      return response.result.customers[0].id;
    }
    return null;
    } catch (error) {
      console.log(error);
    }
  }
  //Get Locations
  async getLocations(){
    try {
      const response = await squareClient.locationsApi.listLocations();
      return (response.result.locations);
    } catch (error) {
      console.log(error);
    }
  }
  //Filter location by name
  async filterLocation(locations: any, name: string){
    return locations.filter((location: any) => location.name === name);
  }
  //Create location
  async createLocation(data: ISquareLocation){
    try {
      const response = await squareClient.locationsApi.createLocation({
        location: data
      });
      return response.result;
    } catch (error) {
      console.log(error);
    }
  }
  //Create order
  async createOrder(data: ISquareOrder){
    try {
      const response = await squareClient.ordersApi.createOrder({
        idempotencyKey: data.idempotencyKey,
        order: {
          locationId: data.locationId,
          lineItems: data.lineItems,
          customerId: data.customerId
        }
      });
      return response.result;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new SquareRepo();