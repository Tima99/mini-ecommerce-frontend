import { useState } from "react";
import { useNavigate } from "react-router-dom";
import req from "../api/request";

export const useSubmitForm = ({sendData, reqTo, navTo, navOptions}) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const SubmitForm = async function(e) {
        e.preventDefault();
        try {
            const form = document.querySelector("form")
            if(!form.checkValidity()) return alert("Invalid data!");
            if(loading) return 

            setLoading(true)

            const res = await req.post(reqTo, sendData)
            
            alert("Sucess")

            if(Array.isArray(navTo)){

                if(typeof res.data === "string" && res.data.toLowerCase().includes("verify your email")){
                    return navigate(navTo[0], {replace: true})
                }

                return navigate(navTo[1], {replace: true})
            }

            
            navigate(navTo, {replace: true, ...navOptions})

        } catch (error) {
            console.log(error);
            alert(error?.response?.data || error.message)
        }
        finally{
            setLoading(false)
        }
    }

    return SubmitForm
}
