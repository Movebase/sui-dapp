import API from "..";
import { AppStatus } from "../../../enum";

export const getDapps = async (params: any): Promise<any> => {
  const result: any = {
    page: params.page,
    limit: params.limit,
    offset: params.offset,
  };

  if (params.filter)
    Object.entries(params.filter)
      .filter((item) => item[1])
      .forEach(([key, value], index) => {
        if (key === "name") {
          result[`filter[${index}]`] = `${key}||$cont||${value}`;
        }
        if (key === "category") {
          if (value !== "All") {
            result[`filter[${index}]`] = `category.id||$eq||${value}`;
          }
        }
      });

  const pathParams = new URLSearchParams(Object.entries(result));
  const res = await API.get(`dapps?${pathParams}`)
    .then((res) => res.data)
    .catch((err) => console.warn(err));

  return res;
};
export const getCategories = async (params: any): Promise<any> => {
  const pathParams = new URLSearchParams(Object.entries(params));
  const res = await API.get(`categories?${pathParams}`).then((res) => res.data);
  return res;
};

export const uploadDappIcon = async (id: string, params: any): Promise<any> => {
  const res = await API.post(`dapps/${id}/upload/icon`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => res.data);
  return res;
};
export const uploadDappScreenshots = async (
  id: string,
  params: any,
): Promise<any> => {
  const res = await API.post(`dapps/${id}/upload/screenshot`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => res.data);
  return res;
};

export const getAppDetail = async (id: string): Promise<any> => {
  const res = await API.get(`dapps/${id}`).then((res) => res.data);
  return res;
};

export const changeAppStatus = async (data: any): Promise<any> => {
  const res = await API.post(`dapps/status`, {
    ...data,
  }).then((res) => res.data);
  return res;
};
