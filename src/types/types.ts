/* в этом файле описываются глобальные типы, которые могут использоваться в различных частях приложения */
export interface IAddress {
  street: string;
  suite?: string;
  city: string;
  zipcode?: string;
  geo?: {
    lat: number;
    lng: number;
  };
}

/* https://jsonplaceholder.typicode.com/users */
export interface IUser {
  id: number;
  name: string;
  email: string;
  address: IAddress;
}

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
