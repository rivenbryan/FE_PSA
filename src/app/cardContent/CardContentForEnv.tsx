import React from 'react'

type Props = {}

export default function CardContentForEnv({}: Props) {
  return (
    <>
    <div className='flex items-center gap-2'>
     <h1 className="text-2xl font-bold">190/1000 </h1>
     <p className='text-xm  '> tons of carbon dioxide </p>
    </div>
        <p className="text-xs text-muted-foreground">The CO2 saved by re-utilizing containers this month is equivalent to <br/> taking 500 cars off the road for a year" </p>
        </>
  )
}