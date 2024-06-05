"use client";

import { Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";
import { User } from "./type";
import dayjs from "../../helper/dayjs";
import { CanAccess } from "@refinedev/core";
import { ErrorComponent } from "../../components/common/Error";

export default function ListUsers() {
  const { dataGridProps } = useDataGrid<User>({
    syncWithLocation: false,
  });

  const columns = React.useMemo<GridColDef<User>[]>(
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
        renderCell: ({ row }) => {
          return (
            <Typography>
              {dayjs(row.createdAt).format("DD/MM/YYYY hh:mm:ss")}
            </Typography>
          );
        },
      },
      {
        field: "updatedAt",
        flex: 1,
        headerName: "Updated at",
        renderCell: ({ row }) => {
          return (
            <Typography>
              {dayjs(row.updatedAt).format("DD/MM/YYYY hh:mm:ss")}
            </Typography>
          );
        },
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
    [],
  );

  return (
    //Access by role
    <CanAccess fallback={<ErrorComponent />}>
      <List>
        <DataGrid {...dataGridProps} columns={columns} autoHeight />
      </List>
    </CanAccess>
  );
}
