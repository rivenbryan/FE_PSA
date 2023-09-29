import { tempProducts } from "~/tempData";
import { Marketplace } from "@/components/marketplace";

export default function StoresCategoryPage() {
  return <Marketplace items={tempProducts} />;
}
