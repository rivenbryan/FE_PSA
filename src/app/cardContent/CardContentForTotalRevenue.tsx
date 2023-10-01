
interface Props {
  revenue?: number;
  percentage?: number;
}


export function CardContentForTotalRevenue({revenue, percentage}: Props) {
    return (
      <>
        <div className="text-2xl font-bold">${revenue}</div>
        <p className="text-xs text-muted-foreground">{percentage}% from last month</p>
      </>
    );
  }