import { getDapps } from "../../../providers/api/dappStore";
import AppDetail from "./AppDetail";

// export async function generateStaticParams() {
//   const apps = await getDapps({});
//   return apps?.data?.map((app: any) => ({
//     slug: app.id,
//   }));
// }
const OneApp = ({ params }: { params: { slug: string } }) => {
  return <AppDetail id={params.slug} />;
};

export default OneApp;
