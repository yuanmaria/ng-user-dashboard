export interface User {
    id: string;
    name: string;
    address?: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
    company?: {
        name: string;
        catchPhrase: string;
        bs: string;
    },
    email: string;
    phone: string;
    username: string;
    website: string;
  }