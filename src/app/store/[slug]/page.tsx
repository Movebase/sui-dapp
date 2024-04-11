import { getDapps } from "../../../providers/api/dappStore";
import AppDetail from "./AppDetail";

export const dynamicParams = false; // true | false,
export const generateStaticParams = async () => {
  const apps = await getDapps({});
  if (!apps || apps.length === 0) {
    return [{ slug: "not-found" }];
  }
  const slugs = apps?.map((app: any) => ({
    slug: app.id,
  }));

  return slugs;
};
const OneApp = ({ params }: { params: { slug: string } }) => {
  return <AppDetail id={params.slug} />;
};

export default OneApp;
