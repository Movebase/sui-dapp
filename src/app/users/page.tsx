"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

export default function ListUsers() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: false,
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "name",
        headerName: "Name",
        type: "string",
        minWidth: 50,
      },
      {
        field: "email",
        flex: 1,
        headerName: "Email",
        minWidth: 200,
      },
      {
        field: "role",
        flex: 1,
        headerName: "Role",
        minWidth: 200,
      },
      {
        field: "createdAt",
        flex: 1,
        headerName: "Created at",
        minWidth: 200,
      },
      {
        field: "updatedAt",
        flex: 1,
        headerName: "Updated at",
        minWidth: 200,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
}
