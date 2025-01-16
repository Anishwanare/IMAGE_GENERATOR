import React from 'react'
import { iconData, testimonialsData } from "../assets/assets"
import { motion } from 'motion/react'

const Testimonial = () => {
    return (
        <motion.div initial={{ opacity: 0.2, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
            <h1 className='text-3xl sm:text-4xl font-semibold mb-2 text-center'>Customer testimonials</h1>
            <p className='text-gray-500 mb-8'>What Our Users Are Saying</p>
            <div className='flex gap-6 flex-col items-center justify-center sm:flex-row '>
                {testimonialsData && testimonialsData.map((test) => (
                    <div key={test} className='bg-white p-5 rounded-lg flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:scale-[1.02]'>
                        <img src={test.image} alt={test.name} className='w-14 rounded-full' />
                        <h1>{test.name}</h1>
                        <p className='text-sm'>{test.role}</p>
                        <div className="flex my-3">
                            {Array(test.stars).fill().map((_, index) => (
                                <img
                                    src={iconData.rating_star}
                                    alt={`star-${index}`}
                                    key={index}
                                />
                            ))}
                        </div>
                        <p className='text-center text-neutral-600'>{test.text}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export default Testimonial
