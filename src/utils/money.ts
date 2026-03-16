import type { NxMPromo, PercentPromo } from "../types/services";

export const moneyFormat = (amount: number) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amount);
};

export const calculateServiceAmount = (
  quantity: number,
  price: number,
  promo_rules: unknown,
  promo_type: string | null,
) => {
  const subTotal = quantity * price;
  if (!promo_rules || typeof promo_rules !== "object" || !promo_type) {
    return {subTotal, discount: 0, total: subTotal};
  }
  
  // en caso de ser promocion de multiplos
  if (promo_type === "nxm") {
    const {buy, pay} = promo_rules as NxMPromo
    // separa la cantidad entera de los decimales para aplicar promocion solo a enteros y decimales siempre se pagan
    const integerQty = Math.floor(quantity);
    const decimalQty = quantity - integerQty;

    // obtiene el total de productos que son gratis por grupo (ej 3x1 por cada 3 productos 1 es gratis)
    const freeToGroup = buy - pay;

    // obtiene el total de grupos que acompleta por la cantidad ingresada (ej 6 productos acompletan 2 grupos de 3x1)
    const groups = Math.floor(integerQty / buy);

    // obtiene el total de productos gratis multiplicando los grupos acompletados por el total de productos que son gratis por grupo
    const totalFree = groups * freeToGroup

    // obtiene el total de productos que si se pagan
    const totalToPaidIntegers = integerQty - totalFree;

    // obtiene el total a pagar sumando el total de productos enteros con los decimales
    const totalToPaid = totalToPaidIntegers + decimalQty

    // obtiene el total real multiplicando por el precio
    const total = totalToPaid * price

    // calcula el descuento total
    const discount = subTotal - total;
    return {subTotal, discount, total};

  // en caso de ser promocion de porcentaje
  } else {
    const { percent } = promo_rules as PercentPromo;
    const discount = (subTotal * percent) / 100;
    const total = subTotal - discount;
    return {
      subTotal,
      discount,
      total,
    };
  }
};
