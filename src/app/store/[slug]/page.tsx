import { getDapps } from "../../../providers/api/dappStore";
import AppDetail from "./AppDetail";

export const dynamicParams = false; // true | false,
export async function generateStaticParams() {
  const apps = await getDapps({});
  const slugs = apps?.map((app: any) => ({
    slug: app.id,
  }));

  return slugs;
}
const OneApp = ({ params }: { params: { slug: string } }) => {
  return <AppDetail id={params.slug} />;
};

export default OneApp;
