export interface Table {
  tableNum: string;
  server: string;
  status: string;
}

export interface Props {
  item: Table;
  route: string;
}
