"use client";

import { Box, Switch, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useInvalidate } from "@refinedev/core";
import { CreateButton, DeleteButton, EditButton, List } from "@refinedev/mui";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import CustomImage from "../../components/common/Image";
import { AppStatus } from "../../enum";
import { useDataGrid } from "../../hook/useDatagrid";
import { changeAppStatus } from "../../providers/api/dappStore";
import { Dapp } from "./type";

const DApps = () => {
  const invalidate = useInvalidate();
  const { dataGridProps } = useDataGrid<Dapp>({
    syncWithLocation: false,
    sorters: {
      initial: [
        {
          field: "name",
          order: "asc",
        },
      ],
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["changeStatus"],
    mutationFn: changeAppStatus,
    onSuccess: async () => {
      await invalidate({
        resource: "dapps",
        invalidates: ["list", "many"],
      });
    },
  });

  const columns = React.useMemo<GridColDef<Dapp>[]>(
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
        maxWidth: 200,
      },
      {
        field: "description",
        flex: 1,
        headerName: "Description",
        minWidth: 400,
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
              <DeleteButton
                hideText
                recordItemId={row.id}
                confirmTitle={`Do you want to delete ${row.name}?`}
              />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
      {
        field: "status",
        headerName: "Status",

        minWidth: 180,
        renderCell: ({ row }) => {
          return (
            <Box className="flex w-full items-center justify-between">
              <Typography>{row.status}</Typography>
              <Switch
                checked={row.status === AppStatus.PUBLISHED}
                onChange={(e) => {
                  if (e.target.checked) {
                    mutate({ id: row.id, status: AppStatus.PUBLISHED });
                  } else {
                    mutate({ id: row.id, status: AppStatus.PENDING });
                  }
                }}
              />
            </Box>
          );
        },
        // minWidth: 100,
      },
    ],
    [],
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
        // autoHeight={dataGridProps.rowCount === 0 ? true : false}
        getRowHeight={() => (dataGridProps.rowCount === 0 ? null : "auto")}
      />
    </List>
  );
};

export default DApps;
