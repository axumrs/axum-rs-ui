export default function usdt2rmb(p, div = 100) {
  // NEXT_PUBLIC_USDT_TO_RMB
  const rate = parseFloat(process.env.NEXT_PUBLIC_USDT_TO_RMB);
  const price = p * rate;
  if (div <= 0) {
    return price;
  }
  return price / div;
}
