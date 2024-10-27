type Order = {
  id: string;
  user_id: string;
  amount: string;
  actual_amount: string;
  status: string;
  snapshot: string;
  allow_pointer: boolean;
  dateline: string;
};

type OrderSnapShot = {
  service: OrderSnapShotService;
  user: User;
};

type OrderSnapShotService = {
  amount: string;
  actual_amount: string;
  actual_price: string;
  discount: number;
  num: number;
} & Service;
