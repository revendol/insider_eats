export interface ILocation {
  storeNumber: string;
  address: string;
  phone: string;
}
export interface IChef{
  name: string;
  nationality: string;
}
export interface IGuest {
  name: string;
  phone: string;
}

export interface IPayment {
  total: number;
  method: string;
  last4: string;
  authTime: string;
  balanceDue: string;
}

export interface IItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
  comments?: string;
}

interface IOrder {
  id: number;
  orderType: string;
  chef: IChef;
  pickUpTime: string;
  placedTime: string;
  location: ILocation;
  guest: IGuest;
  payment: IPayment;
  comments: string;
  items: IItem[];
  currency: string;
  subtotal: number;
  tip: number;
  total: number;
}
export default IOrder;