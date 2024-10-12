import UseTable from "../../hooks/useTable";

export const hostesAction = (status: string, id: string) => {
  const { updateTable } = UseTable();
  updateTable(status, id);
  return;
};
