export interface ISquareLocation {
  name: string;
  address: {
    addressLine1: string;
    locality: string;
    administrativeDistrictLevel1: string;
    postalCode: string;
  }
  country: string;
  description: string;
}

export interface ISquareCustomer {
  givenName: string;
  phoneNumber: string;
}
export interface ISquareMoney {
  amount: bigint | null;
  currency: string;
}

export interface ISquareLineItem {
  name: string;
  quantity: string;
  basePriceMoney: ISquareMoney;
  totalMoney: ISquareMoney;
}
export interface IPickupDetails {
  pickupDetails: {
    recipient: {
      customerId: string;
      displayName: string;
      phoneNumber: string;
    }
    scheduleType: string;
    pickupAt: string;
  }
}

export interface IDeliveryDetails {
  deliveryDetails: {
    recipient: {
      customerId: string;
      displayName: string;
      phoneNumber: string;
      address: {
        addressLine1: string;
        locality: string;
        administrativeDistrictLevel1: string;
        postalCode: string;
        country: string;
        firstName: string;
        lastName: string;
      }
    },
    scheduleType: string;
    deliverAt: string;
    note: string;
    courierPickupAt: string;
    isNoContactDelivery: boolean;
    courierProviderName?: string;
  }
}


export interface ISquareOrder {
  id?: string;
  idempotencyKey: string;
  locationId: string;
  customerId: string;
  lineItems: ISquareLineItem[];
  totalMoney: ISquareMoney;
  totalTipMoney?: ISquareMoney;
  fulfillments?: IPickupDetails[] | IDeliveryDetails[];
}