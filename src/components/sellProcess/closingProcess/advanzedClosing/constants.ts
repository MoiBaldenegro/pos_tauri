export const IS_PAPER = "IS_PAPER";
export const IS_METALLIC = "IS_METALLIC";

interface Denomination {
  type: string;
  value: number;
  tittle: string;
}

export const entrys: Denomination[] = [
  {
    type: IS_PAPER,
    value: 1000,
    tittle: "1,000.00 MXN",
  },
  {
    type: IS_PAPER,
    value: 500,
    tittle: "500.00 MXN",
  },
  {
    type: IS_PAPER,
    value: 200,
    tittle: "200.00 MXN",
  },
  {
    type: IS_PAPER,
    value: 100,
    tittle: "100.00 MXN",
  },
  {
    type: IS_PAPER,
    value: 50,
    tittle: "50.00 MXN",
  },
  {
    type: IS_PAPER,
    value: 20,
    tittle: "20.00 MXN",
  },
  {
    type: IS_METALLIC,
    value: 10,
    tittle: "10.00 MXN",
  },
  {
    type: IS_METALLIC,
    value: 5,
    tittle: "5.00 MXN",
  },
  {
    type: IS_METALLIC,
    value: 2,
    tittle: "2.00 MXN",
  },
  {
    type: IS_METALLIC,
    value: 1,
    tittle: "1.00 MXN",
  },
  {
    type: IS_METALLIC,
    value: 0.5,
    tittle: "0.50 MXN",
  },
];
