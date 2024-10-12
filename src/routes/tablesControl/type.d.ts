type Usertype = any;

export interface Table {
  _id: string;
  tableNum: string;
  server: string;
  status: string;
  bill: any[];
  user: Usertype;
  zone: string;
  assigned: true;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
