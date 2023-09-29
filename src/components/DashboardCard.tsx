import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  cardTitle: string;
  cardContent: React.ReactNode;

};

export default function DashboardCard({cardTitle, cardContent}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent>
       {cardContent}
      </CardContent>
    </Card>
  );
}
