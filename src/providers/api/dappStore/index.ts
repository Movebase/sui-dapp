import API from "..";

export const getDapps = async (params: any): Promise<any> => {
  // params.filters?.forEach(({ field, value }: any, index: number) => {
  //   //filters for auditlog

  //   return (params[`filter[${index}]`] = `${field}||$eq||${value}`);
  // });
  delete params.filters;
  const pathParams = new URLSearchParams(Object.entries(params));
  const res = await API.get(`dapps?${pathParams}`).then((res) => res.data);
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

export const getAppDetail = async (id: string): Promise<any> => {
  const res = await API.get(`dapps/${id}`).then((res) => res.data);
  return res;
};
