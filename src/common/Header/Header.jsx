import { useSelector } from "react-redux";
import "./Header.css"
import { userData } from "../../app/slices/userSlice";


export const Header = () => {
    const rdxUser = useSelector(userData);

 

    return (
        <>
            <div className="d-flex row  fixed-bottom justify-content-center align-items-center headerDesign">


                {rdxUser?.credentials?.token

                    ? (<>

                        <div className="d-flex col m-1 justify-content-center align-items-center ">
                            <div className="d-flex row  justify-content-center align-items-center ">
                                <i className="bi bi-chat"></i>
                                Chats
                            </div>

                        </div>



                        <div className="d-flex col m-1 justify-content-center align-items-center ">
                            
                            <img src={rdxUser?.credentials?.profileDetail?.url_profile_image} width="40em" height="40em" alt="" />

                        </div>

                        <div className="d-flex col m-1 justify-content-center align-items-center ">
                            <i className="bi bi-box-arrow-right"></i>

                        </div>

                    </>)

                    :

                    (
                        <>
                            <div className="d-flex col m-1 justify-content-center align-items-center ">

                                <i className="bi bi-house"></i>

                            </div>
                            <div className="d-flex col m-1 justify-content-center align-items-center ">
                                <p>Register</p>
                            </div>
                            <div className="d-flex col m-1 justify-content-center align-items-center ">
                                <p>LogIn</p>
                            </div>
                        </>

                    )

                }

            </div>
        </>
    )
}