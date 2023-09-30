import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {BsRobot} from "react-icons/bs";
type Props = {
  cardTitle: string;
  cardContent: React.ReactNode;
  isIcon?: boolean;
  handleClick?: () => void;
};

export default function DashboardCard({ cardTitle, cardContent, isIcon, handleClick }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex gap-3">{cardTitle} 
          {isIcon && <BsRobot onClick={handleClick}/>}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>{cardContent}</CardContent>
    </Card>
  );
}
