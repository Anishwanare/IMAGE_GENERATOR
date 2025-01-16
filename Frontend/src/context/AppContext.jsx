import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("user") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [credit, setCredit] = useState(0);
    const navigate = useNavigate();

    console.log(user)

    // Login/Signup form toggle state
    const [toggle, setToggle] = useState(false);

    const parseUser = user && typeof user === "string" ? JSON.parse(user) : user;

    const loadCreditData = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_APP_API_BASEURL}/api/v1/user/credits`,
                { headers: { token }, withCredentials: true }
            );
            if (data.success) {
                setCredit(data.credits);
                toast.success(data.message);
            } else {
                console.log("Failed to fetch credits:", data.message);
            }
        } catch (error) {
            console.error("Error fetching credit data:", error.message);
            toast.error("Failed to load credit data.");
        }
    };
    loadCreditData()

    const generateImage = async (prompt) => {
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_APP_API_BASEURL}/api/v2/ai/generate-image`,
                { prompt },
                { headers: { token }, withCredentials: true }
            );
            if (data.success) {
                loadCreditData();
                return data.resultImage;
            } else {
                toast.error(data.message);
                loadCreditData();
                if (data.creditBalance <= 0) {
                    navigate("/purchase-credit");
                }
                return null;
            }
        } catch (error) {
            console.error("Error generating image:", error.message);
            toast.error("Failed to generate image.");
            return null;
        }
    };


    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken("");
        setUser(null);
        toast.success("Logged out successfully.");
    };


    const value = {
        user,
        setUser,
        toggle,
        setToggle,
        token,
        setToken,
        credit,
        setCredit,
        loadCreditData,
        logout,
        generateImage,
        parseUser
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
