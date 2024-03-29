"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGo, useMany, useNavigation } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import Head from "next/head";
import React from "react";
import { useDocumentTitle } from "@refinedev/nextjs-router/pages";
import { Metadata } from "next";

export default function BlogPostList() {
  // useDocumentTitle("Posts | Refine");
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
  });
  const { edit, show } = useNavigation();
  const go = useGo();
  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids:
      dataGridProps?.rows
        ?.map((item: any) => item?.category?.id)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
      },
      {
        field: "title",
        flex: 1,
        headerName: "Title",
        minWidth: 200,
      },
      {
        field: "content",
        flex: 1,
        headerName: "content",
        minWidth: 250,
        renderCell: function render({ value }) {
          if (!value) return "-";
          return <MarkdownField value={value?.slice(0, 80) + "..." || ""} />;
        },
      },
      {
        field: "category",
        flex: 1,
        headerName: "Category",
        minWidth: 300,
        valueGetter: ({ row }) => {
          const value = row?.category;
          return value;
        },
        renderCell: function render({ value }) {
          return categoryIsLoading ? (
            <>Loading...</>
          ) : (
            categoryData?.data?.find((item) => item.id === value?.id)?.title
          );
        },
      },
      {
        field: "status",
        flex: 1,
        headerName: "Status",
        minWidth: 200,
      },
      {
        field: "createdAt",
        flex: 1,
        headerName: "Created at",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        disableColumnMenu: true,

        renderCell: function render({ row }) {
          return (
            <>
              <EditButton
                hideText
                recordItemId={row.id}
                onClick={(e) => {
                  e.stopPropagation();
                  go({
                    to: {
                      resource: "blog_posts", // resource name or identifier
                      action: "edit",
                      id: row.id,
                    },
                    type: "push",
                  });
                }}
              />
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
    [categoryData]
  );

  return (
    <div>
      {/* <title>Abc</title> */}

      <List>
        <DataGrid
          {...dataGridProps}
          columns={columns}
          autoHeight
          isRowSelectable={() => true}
          sx={{
            "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
          onRowClick={(row, e) => {
            e.stopPropagation();
            go({
              to: {
                resource: "blog_posts", // resource name or identifier
                action: "show",
                id: row.id,
              },
              type: "push",
            });
          }}
        />
      </List>
    </div>
  );
}
