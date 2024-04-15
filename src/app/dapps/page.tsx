"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CreateButton, DeleteButton, EditButton, List } from "@refinedev/mui";
import React from "react";
import CustomImage from "../../components/common/Image";
import { useDataGrid } from "../../hook/useDatagrid";

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
            <CustomImage
              src={row.icon}
              alt="logo"
              width={70}
              height={70}
              className="rounded-xl p-1 flex h-[70px] object-contain items-center justify-center"
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
