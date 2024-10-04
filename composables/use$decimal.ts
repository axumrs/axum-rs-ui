import Decimal from "decimal.js";

export default function use$decimal(v?: string | number | null) {
  const $ZERO = new Decimal(0);
  const $value = computed(() => {
    if (!v) {
      return $ZERO;
    }
    try {
      return new Decimal(v);
    } catch (_) {
      return $ZERO;
    }
  });

  return { $value, $ZERO };
}
