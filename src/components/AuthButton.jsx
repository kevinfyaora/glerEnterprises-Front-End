import Image from 'next/image'
import React from 'react'

const AuthButton = ({ imgSRC, buttonText, altText, onClick = () => { } }) => {
  return (
    <div
      onClick={onClick}
      className='border-2 border-neutral-100 w-[342px] p-4 flex items-center space-x-3 rounded-md cursor-pointer
        '>

      <Image src={imgSRC} alt={altText} width={19} height={18.9} />
      <p className='text-14 font-semibold leading-19 tracking-[0.042px]'>{buttonText}</p>
    </div>
  )
}

export default AuthButton