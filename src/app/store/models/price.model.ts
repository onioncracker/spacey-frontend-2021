export interface IPrice {
  id: number;
  name: string;
  isSelected: boolean;
}

export const PricesMock: IPrice[] = [
  {
    id: 1,
    name: '2000-3000',
    isSelected: false,
  },
  {
    id: 2,
    name: '1500-1999',
    isSelected: false,
  },
  {
    id: 3,
    name: '1000-1499',
    isSelected: false,
  },
  {
    id: 4,
    name: '700-999',
    isSelected: false,
  },
  {
    id: 5,
    name: '300-699',
    isSelected: false,
  },
  {
    id: 6,
    name: '50-299',
    isSelected: false,
  },
];
