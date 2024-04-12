"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
} from "@refinedev/mui";
import React from "react";
import { useDataGrid } from "../../hook/useDatagrid";
import { apiUrl } from "../../providers/api";

// export const revalidate = +(process.env.NEXT_REVALIDATION_TIME || 0) || 3600;
// export const dynamic = "force-static";
const DApps = () => {
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
        field: "shortDescription",
        flex: 1,
        headerName: "Short description",
        minWidth: 100,
      },
      {
        field: "description",
        flex: 1,
        headerName: "Description",
        minWidth: 200,
      },
      {
        field: "icon",
        flex: 1,
        headerName: "Icon",
        maxWidth: 100,
        renderCell: function render({ row }) {
          return (
            <img
              src={`${apiUrl}/storage/dapps${row.icon}`}
              alt="logo"
              className="w-16 h-16"
            />
          );
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              {/* <ShowButton hideText recordItemId={row.id} /> */}
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
    <List
      headerButtons={
        <CreateButton variant="contained">Create an app</CreateButton>
      }
    >
      <DataGrid
        {...dataGridProps}
        columns={columns}
        // autoHeight
        getRowHeight={() => "auto"}
      />
    </List>
  );
};

export default DApps;
