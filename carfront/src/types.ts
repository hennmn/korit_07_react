export type CarResponse = {
  brand: string;
  model: string;
  color: string;
  registrationNumber: string;
  modelYear: number;
  price: number;
  _links: {
    self: {
      href: string;
    };
    car: {
      href: string;
    };
    owner: {
      href: string;
    };
  };
};

export type Car = {
  // 일종의 DTO로 사용됨
  brand: string;
  model: string;
  color: string;
  registrationNumber: string;
  modelYear: number;
  price: number;
};
