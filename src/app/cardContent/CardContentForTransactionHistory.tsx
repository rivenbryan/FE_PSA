import { DataTable } from '@/components/DataTable'
import React from 'react'
import { Payment, columns } from '@/components/table/columns'
type Props = {
  data:any
}
const data = [

    {
        account: "Tencent International ",
        price: 700,
        status: "pending"
    },

  ]
export default function CardContentForTransactionHistory({data}: Props) {

  if (data === undefined) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  return (
    <DataTable columns={columns} data={data} />
  )
}