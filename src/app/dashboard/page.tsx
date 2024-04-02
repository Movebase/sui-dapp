"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGo, useMany, useNavigation } from "@refinedev/core";
import {
  CreateButton,
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
import { Button } from "@mui/material";

const Dashboard = () => {
  return (
    <List
      headerButtons={
        <CreateButton variant="contained">Create an app</CreateButton>
      }
    ></List>
  );
};

export default Dashboard;
