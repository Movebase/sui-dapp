"use client";

// import dataProviderNestjsxCrud from "@refinedev/nestjsx-crud";
import API from "../api";
import dataProviderNestjsxCrud from "./dataProvider";

const API_URL = process.env.NEXT_PUBLIC_DAPP_API_URL as string;

export const dataProvider = dataProviderNestjsxCrud(API_URL, API);
