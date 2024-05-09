import { useState } from "react"
import { CustomButton } from "../../components/CustomButton/CustomButton"
import { CustomInput } from "../../components/CustomInput/CustomInput"
import "./Register.css"
import { registerService } from "../../services/authApiCalls"
import { validation } from "../../utils/validations"
import { CustomLink } from "../../components/CustomLink/CustomLink"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Register = () => {

    const Navigate = useNavigate()
    const [loading, setLoadingSpinner] = useState(false);




    const [userCredentials, setUser] = useState({
        name: "",
        nickname: "",
        password: "",
        email: ""
    })



    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const [userError, setUserError] = useState({
        nameError: "",
        nicknameError: "",
        emailError: "",
        passwordError: "",
    });

    const checkError = (e) => {
        const error = validation(e.target.name, e.target.value);

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }));
    };

    const signInMe = async () => {


        try {


            for (let elemento in userCredentials) {
                if (userCredentials[elemento] === "") {

                    return toast.error("No has rellenado todos los campos")
                }
            }
            setLoadingSpinner(true)
            const fetched = await registerService(userCredentials)

            if (!fetched.success) {

                setLoadingSpinner(false)
                return toast.error(`${fetched.message}`)
            }
            toast.success(`${fetched.message}`)

            setLoadingSpinner(false)

            setTimeout(() => {
                Navigate("/login")
            }, 2000);

        } catch (error) {
            setLoadingSpinner(false)
            return toast.error(`${error}`)
        }

    }
    return (
        <>
            <div className="d-flex  justify-content-center align-items-center flex-column registerSectionDesign">


                <h3 className="fs-5">REGÍSTRATE</h3>

                <label>Nombre</label>
                <CustomInput
                    type="text"
                    name="name"
                    placeholder={"Nombre"}
                    design={`input-design`}
                    value={userCredentials.name || ""}
                    changeEmit={inputHandler}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.nameError}</div>
                <label>Nickname</label>
                <CustomInput
                    type="text"
                    name="nickname"
                    placeholder={"Nickname"}
                    design={`input-design`}
                    value={userCredentials.nickname || ""}
                    changeEmit={inputHandler}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.nicknameError}</div>

                <label>Email</label>
                <CustomInput
                    type="email"
                    name="email"
                    placeholder={"Email"}
                    design={`input-design `}
                    value={userCredentials.email || ""}
                    changeEmit={inputHandler}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.emailError}</div>

                <label>Password</label>
                <CustomInput
                    type="password"
                    name="password"
                    placeholder={"Password"}
                    design={`input-design`}
                    value={userCredentials.password || ""}
                    changeEmit={inputHandler}
                    onBlurFunction={(e) => checkError(e)}
                />

                <div className="error">{userError.passwordError}</div>

                <CustomButton
                    design={"formButtonDesign"}
                    title={"Register"}
                    onClick={signInMe}
                />

                {loading && <div className="spinner-grow fs-5" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}

          



                <p>¿Ya tienes cuenta? <CustomLink path={"/login"} className={`clink-design`} title={"Inicia sesión"} /></p>


                <ToastContainer
                    position="top-right"
                    autoClose={1300}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable

                    theme="light"

                />


            </div>

        </>
    )

}