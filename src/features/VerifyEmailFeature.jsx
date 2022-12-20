import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { LabelInput } from "../components/LabelInput";
import { useSubmitForm } from "../hooks/useSubmitForm";

export const VerifyEmailFeature = () => {
    const {email} = useParams()
    const [otp, setOtp] = useState("");
    const SubmitForm = useSubmitForm({
        sendData: { email , otp },
        reqTo: '/verify/otp',
        navTo: '/home'
    })

    return (
        <>
            <div>
                <h3>Verify Email</h3>
            </div>
            <form className="flex-col gap-05 center">
                <LabelInput
                    label="OTP"
                    type="number"
                    name="otp"
                    id={"enter-otp"}
                    value={otp}
                    onChange={(e) => {setOtp(e.target.value)}} 
                    required
                />

                <button onClick={SubmitForm}>Get Started</button>
            </form>
        </>
    );
};
