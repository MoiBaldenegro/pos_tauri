import UseTable from "../../hooks/useTable";

export const servingAction = (status: string, id: string) => {
  const { updateTable } = UseTable();
  updateTable(status, id);
  return;
};
