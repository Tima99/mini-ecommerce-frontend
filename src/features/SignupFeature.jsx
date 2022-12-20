import { LabelInput } from "../components/LabelInput";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSubmitForm } from "../hooks/useSubmitForm";

export const SignupFeature = () => {
    const [inputData, setInputData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const SubmitForm = useSubmitForm({sendData: inputData, reqTo: '/register', navTo: `/${inputData.email}/verifyEmail`});

    return (
        <>
            <div className="flex between">
                <h2>Sign up</h2>
                <Link to={"/login"}>Login</Link>
            </div>

            <form className="flex-col gap-05 center">
                <LabelInput
                    label="email"
                    type="email"
                    id="enter-email"
                    onChange={changeHandler}
                    value={inputData.email}
                    required
                />
                <LabelInput
                    label="password"
                    type="password"
                    id="enter-password"
                    onChange={changeHandler}
                    value={inputData.password}
                    required
                />
                <LabelInput
                    label="confirm password"
                    type="password"
                    name="confirmPassword"
                    id="enter-confirm-password"
                    onChange={changeHandler}
                    value={inputData.confirmPassword}
                    required
                />

                <button style={{ margin: "1rem 0" }} onClick={SubmitForm}>Sign up</button>
            </form>
        </>
    );

    function changeHandler(e) {
        setInputData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

};
