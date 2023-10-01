import React from 'react'
import { CgProfile } from 'react-icons/cg'
import Image from 'next/image'
type Props = {
    chat?: any
}

export default function ChatInboxCard({chat}: Props) {
  return (
    <>
    <div className="border-t border-gray-300"></div>
    <div className='flex gap-2 items-center justify-center'>
        <CgProfile size={30}/>
        <div className='flex flex-col gap-1 justify-center'>
        <h1>rivenbryan@gmail.com</h1>
        <p>National Cargo Fedaration - Strong</p>
        </div>
        <Image src="/listingImages/7.jpg" width={150} height={60} alt="test" />
    </div>
    </>
  )
}