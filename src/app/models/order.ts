export interface Order {
  customerName: string;
  timeOfCreation: string;
  timeOfDelivery: string;
  status: string;
  price: number;
  order: {
    dishId: number;
    spice: string;
    meat: string;
  }[],
  _id: string;

}
