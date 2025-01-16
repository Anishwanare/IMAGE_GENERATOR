import React from 'react'
import { Link } from 'react-router-dom'
import { iconData } from '../assets/assets'

const Footer = () => {
    return (
        <div className='flex items-center justify-between pb-6 mt-40'>
            <div className='flex items-center space-x-3 md:space-x-8'>
                <img src={iconData.logo} alt="Logo" className='w-24 sm:w-16 lg:w-24' />
                <p className='flex-1 border-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @imagify | All right reserved. </p>
            </div>
            <div className='flex items-center justify-center space-x-2 md:space-x-4'>
                <img src={iconData.facebook_icon} alt="" width={35} />
                <img src={iconData.twitter_icon} alt="" width={35} />
                <img src={iconData.instagram_icon} alt="" width={35} />
            </div>
        </div>
    )
}

export default Footer
