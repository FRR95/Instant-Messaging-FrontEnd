import { login } from "../../app/slices/userSlice.js";
import { CustomButton } from "../../components/CustomButton/CustomButton.jsx"
import { CustomInput } from "../../components/CustomInput/CustomInput.jsx"
import { validation } from "../../utils/validations.js";
import "./Login.css"
import { useDispatch } from "react-redux";
import { decodeToken } from "react-jwt";
import { loginService } from "../../services/authApiCalls.js";
import { useState } from "react";

export const Login = () => {
    
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        email: "",
        password: "",
      });
    
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
    
           console.log("Todos los campos tienen que estar rellenos")
    
            }
    
          }
    
          const fetched = await loginService(user);
    
          if (!fetched.success) {
          
            console.log(fetched.message);
          }
    
          if (fetched.token) {
            const decodificado = decodeToken(fetched.token);
    
            const passport = {
              token: fetched.token,
              user: decodificado,
            };
    
            dispatch(login({ credentials: passport }));
           
          }

          console.log(fetched.message)
         
    
        }
        catch (error) {
          console.log(error)
        }
    
      };
    return (
        <>
            <div className="d-flex justify-content-center flex-column align-items-center loginDesign">
                
                    <h3>INICIA SESIÓN</h3>

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
                        design={""}
                        title={"Login"}
                        onClick={loginMe} />
                
            </div>
        </>
    )
}