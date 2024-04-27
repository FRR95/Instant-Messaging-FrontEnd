import { CustomButton } from "../../components/CustomButton/CustomButton"
import { CustomInput } from "../../components/CustomInput/CustomInput"
import "./Register.css"

export const Register = () => {
    return (
        <>
            <div className="d-flex col-11 justify-content-center align-items-center registerSectionDesign">
                <div className="d-flex col p-5 justify-content-center align-items-center flex-column registerBoxDesign">

                    <h1>REGÍSTRATE</h1>

                    <label>Nombre</label>
                    <CustomInput
                        type="text"
                        name="name"
                        placeholder={"Nombre"}
                        design={`input-design`}
                        value={""}
                    // changeEmit={inputHandler}
                    // onBlurFunction={(e) => checkError(e)}
                    />

                    <label>Email</label>
                    <CustomInput
                        type="email"
                        name="email"
                        placeholder={"Email"}
                        design={`input-design `}
                        value={""}
                    // changeEmit={inputHandler}
                    // onBlurFunction={(e) => checkError(e)}
                    />

                    <label>Password</label>
                    <CustomInput
                        type="password"
                        name="password"
                        placeholder={"Pssword"}
                        design={`input-design`}
                        value={""}
                    // changeEmit={inputHandler}
                    // onBlurFunction={(e) => checkError(e)}
                    />

                    <CustomButton
                        design={""}
                        title={"Register"}
                        // onClick={signInMe}
                    />



                    {/* <p>¿Ya tienes cuenta? <CustomLink path={"/login"} title={"Inicia sesión"} /></p> */}

                </div>
            </div>
        </>
    )

}