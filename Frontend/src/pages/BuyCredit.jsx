import React, { useContext } from 'react'
import { iconData, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const BuyCredit = () => {
  const { user, setToggle, loadCreditData, token } = useContext(AppContext)

  const navigate = useNavigate()

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_Fy8StwWY6kryBM ',
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payments",
      description: "Credits payments",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(`${import.meta.env.VITE_APP_API_BASEURL}/api/v1/user/verify/purchase-credits`, response, { headers: { token }, withCredentials: true })
          if (data.success) {
            loadCreditData();
            navigate('/');
            toast.success(data.message)
          }
        } catch (error) {
          toast.error(error.message)

        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const paymentRazorpay = async (planId, userId) => {
    try {
      if (!user) {
        setToggle(true)
      }
      console.log('buy credit', token)

      const { data } = await axios.post(`${import.meta.env.VITE_APP_API_BASEURL}/api/v1/user/purchase-credits`, { planId }, { headers: { token }, withCredentials: true })
      if (data?.success) {
        initPay(data.order)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center gap-3 my-20'
    >
      <div className='flex items-center flex-col gap-3'>
        <div className="inline-flex text-center text-stone-500 gap-2 bg-white px-6 items-center border rounded-full border-neutral-300">
          <h1 className='text-base sm:text-sm text-center px-3 py-1'>Our plans</h1>
        </div>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Choose the plan</h1>
      </div>

      <div className='p-10 flex gap-10 flex-wrap'>
        {plans && plans.map((plan) => (
          <div key={plan.id} className='bg-white rounded-xl p-10 flex flex-col gap-1 leading-loose shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-2xl'>
            <img src={iconData.logo_icon} alt="" width={20} />
            <h2 className='text-lg font-semibold'>{plan.id}</h2>
            <h3 className='text-xs text-gray-500'>{plan.desc}</h3>
            <h4 className='text-xl font-bold'>${plan.price} <span className='text-sm'>/Credits {plan.credits}</span></h4>
            <button
              className='bg-black text-white rounded-lg mt-10 py-2 px-6'
              onClick={user ? () => { paymentRazorpay(plan.id) } : () => setToggle(prev => !prev)}
            >
              {user ? 'Purchase' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default BuyCredit
