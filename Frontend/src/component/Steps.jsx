import React from 'react'
import { stepsData } from "../assets/assets"
import { motion } from "motion/react"

const Steps = () => {
    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{duration:1}} viewport={{once:true}}
            className='flex flex-col items-center justify-center my-32'>
            <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>How it Works</h1>
            <p className=' text-gray-600 mb-8'>Transform Words Into Stunning Images </p>
            <div className=' flex flex-col gap-5 space-y-4 w-full max-w-3xl text-sm'>
                {stepsData && stepsData.map((item) => (
                    <div key={item} className='flex items-center gap-4 p-5 px-8 hover:bg-white rounded-lg bg-white/60 shadow-md border cursor-pointer hover:scale-[1.02] transition-all duration-300' >
                        <img src={item.icon} alt={item.title} width={40} />
                        <div>
                            <h2 className='text-xl font-medium'>{item.title}</h2>
                            <p className='text-gray-500'>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div >
    )
}

export default Steps
