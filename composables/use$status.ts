export default function use$status() {
  const asideMenu = useState("ASIDE-MENU", () => false);

  return { asideMenu };
}
