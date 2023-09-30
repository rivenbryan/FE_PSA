import { DataTable } from '@/components/DataTable'
import React from 'react'
import { Payment, columns } from '@/components/table/columns'
type Props = {}
const data = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
export default function CardContentForTransactionHistory({}: Props) {
  // return (
  //   <DataTable columns={columns} data={data} />
  // )
}
