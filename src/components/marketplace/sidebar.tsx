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
}

export function Sidebar({
  className,
  goodsClassifications,
  destPorts,
  containerTypes,
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
            {/* {destPorts?.map((destPort, i) => (
                <Button
                  variant="secondary"
                  className=" pl-6 w-full justify-start"
                  // onClick={() => handleDestPortFilter(destPort.name)}
                >
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg> 
                  {destPort.name}
                </Button>
            ))}
             */}
            <DestPortFilter
              className=" pl-6 w-full justify-start"
              portData={destPorts}
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
