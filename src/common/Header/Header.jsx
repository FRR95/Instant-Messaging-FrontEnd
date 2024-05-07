import { useDispatch, useSelector } from "react-redux";
import "./Header.css"
import { logout, userData } from "../../app/slices/userSlice";
import { CustomLink } from "../../components/CustomLink/CustomLink";
import { useNavigate } from "react-router-dom";
import { logOutService, userDisconnectService } from "../../services/authApiCalls";


export const Header = () => {
    const rdxUser = useSelector(userData);
    const dispatch = useDispatch();
    const Navigate = useNavigate()

    const logOut = async() =>{
        try {
            const fetched1 = await  userDisconnectService(rdxUser?.credentials?.token)
            const fetched = await  logOutService(rdxUser?.credentials?.token)


            if(!fetched1.success){
             console.log(fetched.message)
            }
 
            console.log(fetched1.message)

           if(!fetched.success){
            console.log(fetched.message)
           }

           console.log(fetched.message)


           dispatch(logout({ credentials: "" }))

          
            Navigate("/")
         


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="d-flex row  fixed-bottom justify-content-center align-items-center headerDesign">


                {rdxUser?.credentials?.token

                    ? (<>
                        <div className="d-flex col m-1 justify-content-center align-items-center ">
                            <div className="d-flex col-3 m-1 justify-content-center align-items-center ">
                                <div className="d-flex row  justify-content-center align-items-center ">
                                    <div className="d-flex row  justify-content-center align-items-center ">

                                        <CustomLink
                                            path={"/chats"}
                                            icon={"bi bi-chat"}
                                            title={"Chats"}
                                        />

                                    </div>
                                </div>

                            </div>

                            <div className="d-flex col-3 m-1 justify-content-center align-items-center ">
                                <div className="d-flex row  justify-content-center align-items-center ">
                                    <div className="d-flex row  justify-content-center align-items-center ">

                                        <CustomLink
                                            path={"/users"}
                                            icon={"bi bi-people-fill"}
                                            title={"Usuarios"}
                                        />

                                    </div>
                                </div>

                            </div>



                            <div className="d-flex col-3 m-1 justify-content-center align-items-center ">

                                <div className="d-flex row  justify-content-center align-items-center ">
                                    <div className="d-flex row  justify-content-center align-items-center ">

                                        <CustomLink
                                            path={"/profile"}

                                            title={<img src={rdxUser?.credentials?.profileDetail?.url_profile_image} width="40em" height="40em" alt="" />}
                                            auxiliartitle={rdxUser?.credentials?.profileDetail?.name}
                                        />



                                    </div>
                                </div>
                            </div>

                            <div onClick={() => logOut()}  className="d-flex col-3 m-1 justify-content-center align-items-center ">

                                <CustomLink
                                    icon={"bi bi-box-arrow-right"}
                                    title={"LogOut"}
                                    path={"/"}

                                />

                            </div>
                        </div>

                    </>)

                    :

                    (
                        <>
                            <div className="d-flex col m-1 justify-content-center align-items-center ">



                                <CustomLink
                                    icon={"bi bi-house"}
                                    title={"Inicio"}
                                    path={"/"}


                                />

                            </div>
                            <div className="d-flex col m-1 justify-content-center align-items-center ">
                                <CustomLink
                                    icon={"bi bi-door-open"}
                                    title={"Registrate"}
                                    path={"/register"}


                                />
                            </div>
                            <div className="d-flex col m-1 justify-content-center align-items-center ">
                                <CustomLink
                                    icon={"bi bi-person-circle"}
                                    title={"Inicia sesión"}
                                    path={"/login"}


                                />
                            </div>

                        </>

                    )

                }

            </div>
        </>
    )
}