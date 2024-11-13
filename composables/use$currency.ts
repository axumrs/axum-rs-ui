export default function use$currency() {
  const currency = useState<Currency>("CUCURRENCY", () => "USDT");
  const changeCurrency = () => {
    if (currency.value === "USDT") {
      currency.value = "TRX";
    } else if (currency.value === "TRX") {
      currency.value = "PNT";
    } else {
      currency.value = "USDT";
    }
  };
  return { currency, changeCurrency };
}
