import React, { useContext, useState } from 'react';
import { iconData } from '../assets/assets';
import '../index.css';
import { motion } from "framer-motion"; // Corrected the motion import
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ImageResult = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(iconData.sample_img_1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [input, setInput] = useState('');
  const { generateImage, user, credit } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Check if the user has sufficient credits
    if (credit <= 0) {
      // toast.warning("Purchase Credit to generate images!!");
      return navigate("/purchase-credit");
    }

    // Check if the input is empty
    if (!input.trim()) {
      toast.warning("Please provide a description.");
      return;
    }

    setLoading(true);

    try {
      const generatedImage = await generateImage(input); // Assuming generateImage returns the image URL or Base64 string
      if (generatedImage) {
        setIsLoaded(true);
        setImage(generatedImage); // Update the image state
        setInput(''); // Clear input field after generating
      }
    } catch (error) {
      toast.error("Error generating image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >
      <div>
        <div className="relative max-w-sm">
          <img src={image} alt="Generated Image" className="rounded" />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
              loading ? 'w-full transition-all duration-[10]' : 'w-0'
            }`}
          ></span>
        </div>
      </div>

      {loading && <p className="text-center py-2">Loading...</p>}

      {!isLoaded && (
        <div className="flex items-center w-full max-w-xl bg-gradient-to-r from-blue-200 via-green-200 to-indigo-300 text-white text-sm p-0.5 mt-10 rounded-full">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Describe what you want to generate"
            className="text-lg text-black px-6 py-3 rounded-full flex-1 bg-transparent outline-none ml-8 placeholder:text-gray-700 transition-all"
          />
          <button
            type="submit"
            className="bg-black text-white p-3 rounded-full ml-4 hover:bg-gray-900 transition-all duration-200"
          >
            Generate Image
          </button>
        </div>
      )}

      {isLoaded && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={() => setIsLoaded(!isLoaded)}
          >
            Generate Another
          </p>
          <a
            href={image}
            download
            className="bg-black text-white px-8 py-3 rounded-full cursor-pointer hover:scale-105 transition-all duration-300"
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default ImageResult;
