import React, { useContext } from 'react';
import { iconData } from "../assets/assets";
import { Link, useNavigate } from 'react-router-dom';
import { delay, motion } from "motion/react"
import { AppContext } from '../context/AppContext';

const Hero = () => {

  const { parseUser, setToggle } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (parseUser) {
      return navigate("/image-result")
    }
    setToggle(true)
  }

  return (
    <motion.div initial={{ opacity: 0.2, y: 100 }} transition={{ duration: 1 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-center flex-col text-center my-20">
      <div className=" inline-flex text-center text-stone-500 gap-2 bg-white px-6 py-1 items-center border rounded-full border-neutral-300">
        <motion.h1 initial={{ opacity: 0.2, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className='text-sm sm:text-sm text-center px-3'>Best Text to Image Generator</motion.h1>
        <div>
          <img src={iconData.star_icon} />
        </div>
      </div>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 2 }} className="text-4xl md:text-6xl max-w-[300px] sm:text-7xl  sm:max-w-[800px] mx-auto text-center mt-10">
        Turn text to <span className='text-blue-600' >image</span>, in seconds.
      </motion.h1>
      <motion.p className="text-center max-w-xl mx-auto mt-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} >
        Unleash your creativity with AI. Turn your imagination into visual art
        in seconds — just type, and watch the magic happen.
      </motion.p>
      <motion.button
        onClick={onClickHandler}
        whileTap={{ scale: 0.95 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}
        className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full hover:scale-[1.05] transition-all duration-300">
        Generate Image
        <img className='h-6' src={iconData.star_group} alt="" />
      </motion.button>


      <motion.div
        className="flex items-center justify-center gap-3 mt-16 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        {Array(6).fill('').map((item, index) => (
          <div key={index}>
            <motion.img
              src={index % 2 === 0 ? iconData.sample_img_1 : iconData.sample_img_2}
              alt=""
              width={70}
              className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
            />
          </div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className='text-neutral-600 mt-2'>Generate image form imagify</motion.p>
    </motion.div>
  );
};

export default Hero;
