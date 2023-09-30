import DashboardCard from "@/components/DashboardCard";
import { CardContentForUtilizationRate } from "./cardContent/CardContentForUtilizationRate";
import { CardContentForDatePriceTrend } from "./cardContent/CardContentForDataPriceTrend";
import CardContentForTransactionHistory from "./cardContent/CardContentForTransactionHistory";
import { CardContentForTotalRevenue } from "./cardContent/CardContentForTotalRevenue";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 mb-10">
      <div className="flex gap-10">
        <DashboardCard
          cardTitle="Total Revenue"
          cardContent={<CardContentForTotalRevenue />}
        />
      </div>
      <div className="flex gap-10"></div>
      <div className="flex gap-10">
        <DashboardCard
          cardTitle="Utilization Rate"
          cardContent={<CardContentForUtilizationRate />}
        />
        <div className="flex-grow">
          <DashboardCard
            cardTitle="Date Price Trend"
            cardContent={<CardContentForDatePriceTrend />}
          />
        </div>
      </div>
      <div>
        <DashboardCard
          cardTitle="Transaction History"
          cardContent={<CardContentForTransactionHistory />}
        />
      </div>
    </div>
  );
}
