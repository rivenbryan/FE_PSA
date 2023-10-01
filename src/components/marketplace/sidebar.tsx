import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/ui/button";
import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import { useRouter } from "next/router";
import {
  ContainerType,
  GoodsClassification,
  Port,
} from "@/app/marketplace/page";
import { DestPortFilter } from "./destinationPortFilter";
import { CheckIcon } from "@radix-ui/react-icons";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  destPorts: Port[];
  containerTypes: ContainerType[];
  goodsClassifications: GoodsClassification[];
  setDestPortFilter: any;
  setContainerTypeFilter: any;
  setGoodsClassificationFilter: any;
}

export function Sidebar({
  className,
  goodsClassifications,
  destPorts,
  containerTypes,
  setDestPortFilter,
  setContainerTypeFilter,
  setGoodsClassificationFilter,
}: SidebarProps) {
  //   const router = useRouter();

  //   const handleDestPortFilter = (destPort: string) => {
  //     router.push({
  //       pathname: "/marketplace",
  //       query: {
  //         destPort,
  //       },
  //     });
  //   };
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Destination Port
          </h2>
          <div className="space-y-1">
            <DestPortFilter
              className=" pl-6 w-full justify-start"
              portData={destPorts}
              setDestPortFilter={setDestPortFilter}
            />
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Container Type
          </h2>
          <div className="space-y-1">
            {containerTypes.map((containerType) => (
              <Button
                key={containerType.type}
                variant="ghost"
                className="pl-6 w-full justify-start"
              >
                {containerType.type}
              </Button>
            ))}
          </div>
        </div>
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Goods Classification
          </h2>
          <ScrollArea className=" px-1">
            <div className="space-y-4 p-2">
              {goodsClassifications?.map((goodsClassification, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  className="w-full justify-start font-normal text-sm text-left"
                >
                  <CheckIcon className="mr-2" />
                  {goodsClassification.type}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
