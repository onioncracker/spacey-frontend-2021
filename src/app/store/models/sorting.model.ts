export interface ISorting {
  id: number;
  name: string;
}

export const SortingMock: ISorting[] = [
  {
    id: 1,
    name: 'new',
  },
  {
    id: 2,
    name: 'old',
  },
  {
    id: 3,
    name: 'cheap',
  },
  {
    id: 4,
    name: 'expensive',
  },
  {
    id: 5,
    name: 'name',
  },
];
