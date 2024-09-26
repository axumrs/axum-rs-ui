export default function use$currency() {
  const currency = useState<Currency>("CUCURRENCY", () => "usdt");
  const changeCurrency = () => {
    if (currency.value === "usdt") {
      currency.value = "trx";
    } else if (currency.value === "trx") {
      currency.value = "pointer";
    } else {
      currency.value = "usdt";
    }
  };
  return { currency, changeCurrency };
}
