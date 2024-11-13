type PayStatus = "Pending" | "Failed" | "Success";
type Pay = {
  id: string;
  order_id: string;
  user_id: string;
  amount: string;
  currency: Currency;
  tx_id: string;
  method: PaymentKind;
  status: PayStatus;
  is_via_admin: boolean;
  approved_time: string;
  approved_opinion: string;
  proof: string;
  dateline: string;
};
