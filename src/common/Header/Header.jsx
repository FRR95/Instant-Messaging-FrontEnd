import { useSelector } from "react-redux";
import "./Header.css"
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { GetProfile } from "../../services/userApiCalls";

export const Header = () => {
    const rdxUser = useSelector(userData);

    const [user, setUser] = useState({
        name: ""
    });


    const getUserProfile = async () => {
        try {

            const fetched = await GetProfile(rdxUser.credentials.token);

            if (!fetched.success) {
                console.log(fetched.message)
            }

            setUser({
                name: fetched.data.name,

            });

        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {

        rdxUser?.credentials?.token && getUserProfile()

    }, [rdxUser]);


    return (
        <>
            <div className="d-flex row sticky-bottom justify-content-center align-items-center headerDesign">


                {rdxUser?.credentials?.token

                    ? (<>

                        <div className="d-flex col m-1 justify-content-center align-items-center ">
                            <div className="d-flex row  justify-content-center align-items-center ">
                                <i className="bi bi-chat"></i>
                                Chats
                            </div>

                        </div>



                        <div className="d-flex col m-1 justify-content-center align-items-center ">
                            {user.name}

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