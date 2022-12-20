import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LabelInput } from "../components/LabelInput";
import { useSubmitForm } from "../hooks/useSubmitForm";

export const LoginFeature = () => {
    const [inputData, setInputData] = useState({
        email: "",
        password: "",
    });
    const SubmitForm = useSubmitForm({
        sendData: inputData,
        reqTo: "/login",
        navTo: [`/${inputData.email}/verifyEmail`, '/home'],
    });

    return (
        <>
            <div className="flex between pd-05">
                <h2>Login</h2>
                <Link to={"/"}>Signup</Link>
            </div>
            <form className="flex-col gap-05 center">
                <LabelInput
                    label="email"
                    type="email"
                    id="enter-email"
                    value={inputData.email}
                    onChange={changeHandler}
                    required
                />
                <LabelInput
                    label="password"
                    type="password"
                    id="enter-password"
                    value={inputData.password}
                    onChange={changeHandler}
                    required
                />

                <button style={{ margin: "1rem 0" }} onClick={SubmitForm}>
                    Login
                </button>
            </form>
        </>
    );

    function changeHandler(e) {
        setInputData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
};
