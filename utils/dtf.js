export default function datelineFormat(dateline, opts) {
  const d = new Date(dateline);
  const dateOnly = opts?.dateOnly || false;
  const timeOnly = opts?.timeOnly || false;
  const datePart = `${d.getFullYear()}/${zeroFill(d.getMonth() + 1)}/${zeroFill(
    d.getDate()
  )}`;
  const timePart = `${zeroFill(d.getHours())}:${zeroFill(
    d.getMinutes()
  )}:${zeroFill(d.getSeconds())}`;

  if (dateOnly) {
    return datePart;
  }
  if (timeOnly) {
    return timePart;
  }
  return `${datePart} ${timePart}`;
}

export function zeroFill(v, n = 2) {
  const vs = "" + v;
  return vs.padStart(n, "0");
}
