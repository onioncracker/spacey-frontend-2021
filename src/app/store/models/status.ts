export class Status {
  statusId!: number;
  statusName!: string;
}

export class OrderStatus {
  constructor(orderId: number, orderStatusId: number) {
    this.orderId = orderId;
    this.orderStatusId = orderStatusId;
  }

  orderId!: number;
  orderStatusId!: number;
}

export const statuses = [
  {
    statusId: 1,
    statusName: 'DELIVERED',
  },
  {
    statusId: 2,
    statusName: 'FAIL',
  },
];
