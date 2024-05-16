"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CreateButton, DeleteButton, EditButton, List } from "@refinedev/mui";
import React from "react";
import CustomImage from "../../components/common/Image";
import { useDataGrid } from "../../hook/useDatagrid";
import { checkAuth } from "../../helper/checkAuth";
import { redirect } from "next/navigation";

const DApps = () => {
  const data = checkAuth();
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
            <CustomImage
              src={row.icon}
              alt="logo"
              width={70}
              height={70}
              className="flex h-[70px] items-center justify-center rounded-xl object-contain p-1"
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
    [],
  );
  if (!data?.authenticated) {
    return redirect(data?.redirectTo ?? "/login");
  }
  return (
    <List
      headerButtons={
        <CreateButton variant="contained">Create an app</CreateButton>
      }
    >
      <DataGrid
        {...dataGridProps}
        columns={columns}
        // autoHeight={dataGridProps.rowCount === 0 ? true : false}
        getRowHeight={() => (dataGridProps.rowCount === 0 ? null : "auto")}
      />
    </List>
  );
};

export default DApps;
