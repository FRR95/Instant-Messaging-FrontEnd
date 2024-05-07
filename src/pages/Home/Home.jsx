import { CustomLink } from "../../components/CustomLink/CustomLink"
import "./Home.css"

export const Home = () => {
    return (
        <>
            <div className="d-flex row justify-content-center  align-items-center homeSectionDesign">
                <div className="d-flex row justify-content-center  align-items-center homeSectionDesign">

                    <div className="d-flex row-3 justify-content-center  align-items-center">
                        <img src="https://cdn-icons-png.flaticon.com/512/4564/4564089.png" height={"60em"} width={"60em"} alt="" />

                    </div>

                    <div className="d-flex row-3 justify-content-center  align-items-center">


                        <div className="d-flex row justify-content-center  align-items-center">

                            <h4 className="fs-5">¡Bienvenido a Lets App!</h4>


                            <p>Esta App trata de un servicio de mensajeria instantanea donde puedes crear grupos ,enviar mensajes,añadir contactos y mucho mas!!</p>


                        </div>
                    </div>
                    <div className="d-flex row-3 justify-content-center  align-items-center ">

                        <CustomLink
                            path={"/register"}

                            title={"Inicia esta aventura!"}
                        />
                    </div>

                </div>
            </div>
        </>
    )
}