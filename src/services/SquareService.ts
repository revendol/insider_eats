import SquareRepo from "@repos/SquareRepo";
import {ISquareLocation, ISquareOrder} from "@customType/Square";
import {IChef, ILocation} from "@customType/controller/Parser";

class SquareService{
  //Create customer if not exists
  async createCustomerIfNotExists (customer: {givenName: string, phoneNumber: string}) {
    //Check if customer exists
    const customerExists : any = await SquareRepo.getCustomerByPhoneNumber(customer.phoneNumber);
    if(customerExists){
      return customerExists;
    }
    //Create customer
    const response = await SquareRepo.createCustomer(customer);
    return response;
  }

  //Create location if not exists
  async createLocationIfNotExists (location: ILocation, chef: IChef) {
    const ln = chef.nationality+ ' Chef ' + chef.name;
    const locations = await SquareRepo.getLocations();
    const locationExists = await SquareRepo.filterLocation(locations, ln);
    if(locationExists.length > 0){
      return locationExists[0].id;
    }

    const address = location.address.split(',');
    const sl : ISquareLocation = {
      name: ln,
      address: {
        addressLine1: address[0].trim(),
        locality: address[1].trim(),
        administrativeDistrictLevel1: address[2].trim().split(' ')[0],
        postalCode: address[2].trim().split(' ')[1]
      },
      country: 'US',
      description: ln,
    } as ISquareLocation;
    //Create location
    const response:any = await SquareRepo.createLocation(sl);
    return response.location.id;
  }

  //Create order
  // async createOrder (order: IOrder) {
  //   const response = await SquareRepo.createOrder(order);
  //   return response;
  // }

  //Parse order data
  async parseOrderData(data: any) {
    const customerId = await this.createCustomerIfNotExists({
      givenName: data.guest.name,
      phoneNumber: data.guest.phone,
    });
    const order: ISquareOrder = {
      idempotencyKey: this.generateIdempotencyKey(),
      locationId: await this.createLocationIfNotExists(data.deliveryFrom, data.chef),
      customerId: customerId,
      lineItems: data.items.map((item: any) => {
        return {
          name: item.name,
          quantity: item.quantity.toString(),
          basePriceMoney: {
            amount: BigInt(Math.round(item.price * 100)), // Convert to BigInt
            currency: data.currency,
          },
          totalMoney: {
            amount: BigInt(Math.round(item.total * 100)), // Convert to BigInt
            currency: data.currency,
          },
        };
      }),
      totalMoney: {
        amount: BigInt(Math.round(data.total * 100)), // BigInt value
        currency: data.currency,
      },
      totalTipMoney: {
        amount: BigInt(Math.round(data.tip * 100)), // BigInt value
        currency: data.currency,
      },
    };
    //Check if order type is pickup then set order pickup details
    if(data.orderType === 'Pick-Up'){
      order.fulfillments = [
        {
          pickupDetails: {
            recipient: {
              customerId: customerId,
              displayName: data.guest.name,
              phoneNumber: data.guest.phone
            },
            scheduleType: data.scheduleType? data.scheduleType : 'ASAP',
            pickupAt: data.pickUpTime
          }
        }
      ];
    }
    //Check if order type is delivery then set order delivery details
    if(data.orderType === 'Delivery'){
      const customerAddress = data.guest.address.split(',');
      order.fulfillments = [
        {
          deliveryDetails: {
            recipient: {
              customerId: customerId,
              displayName: data.guest.name,
              phoneNumber: data.guest.phone,
              address: {
                addressLine1: customerAddress[0].trim(),
                locality: customerAddress[1].trim(),
                administrativeDistrictLevel1: customerAddress[2].trim().split(' ')[0],
                postalCode: customerAddress[2].trim().split(' ')[1],
                country: 'US',
                firstName: data.guest.name.split(' ')[0],
                lastName: data.guest.name.split(' ')[1],
              }
            },
            scheduleType: data.scheduleType? data.scheduleType : 'ASAP',
            deliverAt: data.deliveryTime.toString(),
            note: data.notes,
            courierPickupAt: data.pickUpTime,
            isNoContactDelivery: false
          }
        }
      ];
    }
    return order;
  }


  generateIdempotencyKey(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

export default new SquareService();