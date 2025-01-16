import React, { useContext } from 'react'
import { iconData } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { AppContext } from '../context/AppContext'

const GenerateButton = () => {

    const navigate = useNavigate()
    const { parseUser, setToggle } = useContext(AppContext)

    const onClickHandler = () => {
        if (parseUser) {
            return navigate("/image-result")
        }
        setToggle(true)
    }
    return (
        <motion.div initial={{ opacity: 0.2, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className='flex flex-col items-center justify-center my-24 p-6 md:px-28 w-full'>
            <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>See the magic. Try now</h1>
            <button onClick={onClickHandler} className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full hover:scale-[1.05] transition-all duration-300">
                Generate Image
                <img className='h-6' src={iconData.star_group} alt="" />
            </button>
        </motion.div>
    )
}

export default GenerateButton
