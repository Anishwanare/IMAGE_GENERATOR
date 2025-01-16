import React from 'react'
import { iconData } from "../assets/assets"
import { motion } from "motion/react"

const Description = () => {
    return (
        <motion.div initial={{ opacity: 0.2, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{duration:1}} viewport={{once:true}} className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
            <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
            <p className='text-gray-500 mb-8'>Turn your imagination into visuals</p>
            <div className=' flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
                <motion.img whileHover={{scale:1.02}} transition={{duration:0.5}} src={iconData.sample_img_1} alt="" className='w-80 xl:w-96 rounded-lg' />
                <div>
                    <motion.h1  className='text-3xl font-medium max-w-lg mb-4 '>Introducing the AI-Powered Text to Image Generator</motion.h1>
                    <p className='text-gray-600 mb-4'>Text to AI is an innovative tool that allows users to transform written text into stunning, AI-generated images. By simply entering a description, the AI analyzes the input and creates a visual representation of the words, bringing creativity and imagination to life. Whether it's a scene, character, or abstract concept, the AI leverages advanced algorithms and neural networks to generate high-quality, unique images in seconds. Perfect for artists, marketers, and creators, this feature is designed to empower users to quickly visualize ideas and unlock their creativity.</p>
                    <p className='text-gray-600 mb-4'>Imagify is a text to image generator that uses advanced AI technology to create stunning visuals from your imagination. You can create images for your blog, social media, or any other platform in seconds. Just type in your text, and our AI will generate an image for you. It’s that simple!</p>
                </div>
            </div>
        </motion.div >
    )
}

export default Description
