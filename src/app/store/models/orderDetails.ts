import ProductOrder from "./productOrder";

export default class OrderDetails {
  products!: ProductOrder[];
  orderId!: number;
  dateTimeOrder!: Date;
  status!: string;
  address!: string;
  firstName!: string;
  lastName!: string;
  phoneNumber!: string;
  dateTimeDelivery!: Date;
  comment!: string;
  sum!: number;
  courierId!: number;

}
export const products =
  [
    {
      name: 'prod1',
      color: 'black',
      size: 'L',
      amount: 10,
      price: 100,
      photo: 'https://spacey-photo-storage.s3.eu-west-2.amazonaws.com/2546248_blue.jpg',
      id: 12
    },
    {
      name: 'prod1',
      color: 'black',
      size: 'L',
      amount: 10,
      price: 140,
      photo: 'https://spacey-photo-storage.s3.eu-west-2.amazonaws.com/white-tee-front_1.jpg',
      id: 15
    },
    {
      name: 'prod1',
      color: 'black',
      size: 'L',
      amount: 10,
      price: 200,
      photo: 'https://spacey-photo-storage.s3.eu-west-2.amazonaws.com/DD925864_01.jpg',
      id: 13
    },
    {
      name: 'prod1',
      color: 'black',
      size: 'L',
      amount: 10,
      price: 200,
      photo: 'https://spacey-photo-storage.s3.eu-west-2.amazonaws.com/DD925864_01.jpg',
      id: 13
    }
  ]


export const orderDetail = {
  products: products,
  orderId: 1,
  dateTimeOrder: new Date("2019-01-16"),
  status: 'active',
  address: 'Pol`ova 20',
  firstName: 'Artem',
  lastName: 'Isaiev',
  phoneNumber: '1234567890',
  dateTimeDelivery: new Date("2019-01-16"),
  comment: 'commentcommentcommentcommentcommentcommentcomment',
  sum: 440,
  courierId: 21
}
