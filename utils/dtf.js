export default function datelineFormat(dateline) {
  const d = new Date(dateline);
  return `${d.getFullYear()}/${zeroFill(d.getMonth() + 1)}/${zeroFill(
    d.getDate()
  )} ${zeroFill(d.getHours())}:${zeroFill(d.getMinutes())}:${zeroFill(
    d.getSeconds()
  )}`;
}

export function zeroFill(v, n = 2) {
  const vs = "" + v;
  return vs.padStart(n, "0");
}
