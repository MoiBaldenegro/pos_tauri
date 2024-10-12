export type FilterType = string;
export type OrderType = string;

interface Order {
  name: string;
  value: OrderType;
}

interface Filter {
  name: string;
  value: FilterType;
}
// filter and order libs
//filters
export const SELL_TYPE_FILTER: FilterType = "SELL_TYPE_FILTER";
// export const BILL_FILTER: FilterType = "BILL_FILTER";
export const OPEN_BY_FILTER: FilterType = "OPEN_BY_FILTER";
// export const TOTAL_FILTER: FilterType = "TOTAL_FILTER";
// export const HOUR_FILTER: FilterType = "HOUR_FILTER";
// export const TIME_FILTER: FilterType = "TIME_FILTER";
// export const CLIENT_NUMBER_FILTER: FilterType = "CLIENT_NUMBER_FILTER";
export const STATUS_FILTER: FilterType = "STATUS_FILTTER";

// orders
export const SELL_TYPE_ORDER: OrderType = "SELL_TYPE_FILTER";
export const BILL_ORDER: OrderType = "BILL_ORDER";
export const OPEN_BY_ORDER: OrderType = "OPEN_BY_ORDER";
export const TOTAL_ORDER: OrderType = "TOTAL_ORDER";
export const HOUR_ORDER: OrderType = "HOUR_ORDER";
export const TIME_ORDER: OrderType = "TIME_ORDER";
export const CLIENT_NUMBER_ORDER: OrderType = "TIME_NUMBER_FILTER";
export const STATUS_ORDER: OrderType = "STATUS_ORDER";

// filter and order objects
// filters

export const filters: Filter[] = [
  {
    name: "Tipo de venta",
    value: SELL_TYPE_FILTER,
  },
  {
    name: "Usuario",
    value: OPEN_BY_FILTER,
  },
  {
    name: "Estatus",
    value: STATUS_FILTER,
  },
];

// orders
export const headers: Order[] = [
  {
    name: "Tipo de venta",
    value: SELL_TYPE_ORDER,
  },
  {
    name: "Cuenta",
    value: BILL_ORDER,
  },
  {
    name: "Abierta por",
    value: OPEN_BY_ORDER,
  },
  {
    name: "Total",
    value: TOTAL_ORDER,
  },
  {
    name: "Hora",
    value: HOUR_ORDER,
  },
  {
    name: "Tiempo",
    value: TIME_ORDER,
  },
  {
    name: "Clientes",
    value: CLIENT_NUMBER_ORDER,
  },
  {
    name: "Estatus",
    value: STATUS_ORDER,
  },
];
