import Decimal from "decimal.js";
import { nanoid } from "nanoid";

export default function use$cart() {
  const _cart = useCookie<Cart[]>("AXUM_RS_CART", { default: () => [] });
  const $cart = computed(() => _cart.value || []);
  const $setCart = (cart: Cart[]) => {
    _cart.value = cart;
  };

  const $emptyCart = () => {
    _cart.value = [];
  };

  const $findItem = (cart_id: string) => {
    return $cart.value.find((c) => c.cart_id === cart_id);
  };

  const $findIndex = (cart_id: string) => {
    return $cart.value.findIndex((c) => c.cart_id === cart_id);
  };

  const $updateItem = (cart: Cart) => {
    const index = $findIndex(cart.cart_id);
    if (index !== -1) {
      $cart.value[index] = { ...cart };
    }
  };

  const $delItem = (cart: Cart) => {
    const index = $findIndex(cart.cart_id);
    if (index !== -1) {
      $cart.value.splice(index, 1);
    }
  };

  const $count = computed(() => {
    return _cart.value.reduce((p, c) => p + c.quantity, 0);
  });
  const $countAmount = computed(() => {
    return _cart.value.reduce(
      (p, c) => new Decimal(p).add(new Decimal(c.amount)).toString(),
      "0"
    );
  });
  const $hasItem = computed(() => _cart.value.length > 0);

  const $addItem = (cart: Cart) => {
    if (!$hasItem) {
      $setCart([cart]);
      return;
    }
    const index = _cart.value.findIndex((c) => c.id === cart.id);
    if (index !== -1) {
      if (cart.is_subject) {
        return;
      }
      $cart.value[index].quantity += cart.quantity;
      $cart.value[index].amount = new Decimal($cart.value[index].amount)
        .add(new Decimal(cart.amount))
        .toString();
    } else {
      $cart.value.push(cart);
    }
  };

  const $addToCart = (s: Service) => {
    const _c: Cart = {
      cart_id: nanoid(),
      quantity: 1,
      amount: s.price,
      ...s,
    };
    $addItem(_c);
  };

  return {
    $cart,
    $setCart,
    $emptyCart,
    $findItem,
    $delItem,
    $findIndex,
    $updateItem,
    $hasItem,
    $addItem,
    $addToCart,
    $count,
    $countAmount,
  };
}
