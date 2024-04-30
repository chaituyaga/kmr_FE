import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

export default function MrtTable(props) {
  const { columns, data } = props;
  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableSorting: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableExpanding: false,
    enableColumnResizing: true,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    initialState: {
      density: "compact",
    },
    enableHiding: false,
  });
  return <MaterialReactTable table={table} />;
}
