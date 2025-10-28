// types.ts

// 사용자 로그인 자격 증명 타입
export type AccountCredentials = {
  username: string;
  password: string;
};

export type ShoppingItem = {
  id: number;
  product: string;
  amount: string;
  purchased: boolean;
};

export type ShoppingItemEntry = {
  product: string;
  amount: string;
  puchased: boolean;
};
// 나갈 때는 id가 필요없기 때문에 세 개만 있으면 됨
