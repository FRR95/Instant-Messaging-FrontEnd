import { login } from "../../app/slices/userSlice.js";
import { CustomButton } from "../../components/CustomButton/CustomButton.jsx"
import { CustomInput } from "../../components/CustomInput/CustomInput.jsx"
import { validation } from "../../utils/validations.js";
import "./Login.css"
import { useDispatch } from "react-redux";
import { loginService } from "../../services/authApiCalls.js";
import { useState } from "react";
import { GetProfile } from "../../services/userApiCalls.js";
import { CustomLink } from "../../components/CustomLink/CustomLink.jsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Login = () => {

  const dispatch = useDispatch();
  const Navigate = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoadingSpinner] = useState(false);



  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [credencialesError, setCredencialesError] = useState({
    emailError: "",
    passwordError: "",
  });

  const checkError = (e) => {
    const error = validation(e.target.name, e.target.value);

    setCredencialesError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };



  const loginMe = async () => {

    try {



      for (let elemento in user) {

        if (user[elemento] === "") {
          setLoadingSpinner(false)
          return toast.error(`Todos los campos tienen que estar rellenos`)


        }

      }

      setLoadingSpinner(true)

      const fetched = await loginService(user);
      const fetchedUser = await GetProfile(fetched.token);

      if (!fetched.success) {
        setLoadingSpinner(false)
        return toast.error(`${fetched.message}`)
      }

      if (fetched.token) {


        const passport = {
          token: fetched.token,
          profileDetail: fetchedUser.data

        };

        dispatch(login({ credentials: passport }));

        setLoadingSpinner(false)

      }



      toast.success(`${fetched.message}`)



      setLoadingSpinner(false)

      setTimeout(() => {
        Navigate("/chats")
      }, 2000);


    }
    catch (error) {
      setLoadingSpinner(false)

    }

  };
  return (
    <>
      <div className="d-flex flex-column justify-content-center  align-items-center loginDesign">

        <h3 className="fs-5">INICIA SESIÓN</h3>

        <label>Email</label>
        <CustomInput
          type="email"
          name="email"
          placeholder={"Email"}
          design={`input-design ${credencialesError.emailError !== "" ? "input-designError" : ""
            }`}
          value={user.email || ""}
          changeEmit={inputHandler}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{credencialesError.emailError}</div>
        <label>Password</label>
        <CustomInput
          type="password"
          name="password"
          placeholder={"Password"}
          design={`input-design ${credencialesError.passwordError !== "" ? "input-designError" : ""
            }`}
          value={user.password || ""}
          changeEmit={inputHandler}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{credencialesError.passwordError}</div>
        <CustomButton
          design={"formButtonDesign"}
          title={"Login"}
          onClick={loginMe}
        />
        {loading && <div className="spinner-grow fs-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>}

    


        <p>¿Aun no tienes cuenta? </p> <CustomLink className={`clink-design`} path={"/register"} title={"Regístrate"} />


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