export default function use$cucurrency() {
  const cucurrency = useState<Cucurrency>("CUCURRENCY", () => "usdt");
  return { cucurrency };
}
