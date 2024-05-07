import { useDispatch, useSelector } from "react-redux";
import "./Header.css"
import { logout, userData } from "../../app/slices/userSlice";
import { CustomLink } from "../../components/CustomLink/CustomLink";


export const Header = () => {
    const rdxUser = useSelector(userData);
    const dispatch = useDispatch();



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

                            <div onClick={() => dispatch(logout({ credentials: "" }))} className="d-flex col-3 m-1 justify-content-center align-items-center ">

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