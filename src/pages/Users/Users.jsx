import { useDispatch, useSelector } from "react-redux";
import "./Users.css"
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteUserService, getUsersService } from "../../services/userApiCalls";
import { updateUserDetail } from "../../app/slices/userDetailSlice";

export const Users = () => {
    const rdxUser = useSelector(userData);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [users, setUser] = useState([]);

    useEffect(() => {

        !rdxUser?.credentials?.token && (navigate("/"))

    }, [rdxUser]);



    const GetUsers = async () => {
        try {
            const fetched = await getUsersService(rdxUser.credentials.token)

            if (!fetched.success) {
                console.log(fetched.message)
            }

            console.log(fetched.message)

            setUser(fetched.data)


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        users.length === 0 && (GetUsers())

    }, [users])

    const deleteUser = async(userId) =>{

        try {
            const fetched = await deleteUserService (userId,rdxUser.credentials.token)

            if (!fetched.success) {
                console.log(fetched.message)
            }

            console.log(fetched.message)

            GetUsers()

            
        } catch (error) {
            console.log(error)
        }
    }


    const manageUserDetail = (user) => {
        //1. guardamos en RDX
        const dispatched = dispatch(updateUserDetail({ user }));

        // 2. navegamos a la vista de detalle
        navigate("/userdetail");
    };


    return (
        // className="d-flex col-4 justify-content-center align-items-center"

        <>
            <div className="d-flex row justify-content-center align-items-center  usersSectionDesign">


                {users.length > 0
                    ? (<>{users.map(user => {
                        return (<>
                            <div className="d-flex row  justify-content-center align-items-center usersCardSectionDesign ">
                                <div className="d-flex row justify-content-center align-items-center userCardDesign" onClick={() => manageUserDetail(user)} >
                                    <div className="d-flex col justify-content-center align-items-center">
                                        <div className={rdxUser?.credentials?.profileDetail?.role_id === 2 ? ("d-flex col-4 justify-content-center align-items-center") : ("d-flex col-6 justify-content-center align-items-center")}>
                                            <img src={user.url_profile_image} width="40em" height="40em" alt="" />
                                        </div>
                                        <div className={rdxUser?.credentials?.profileDetail?.role_id === 2 ? ("d-flex col-4 justify-content-center align-items-center") : ("d-flex col-6 justify-content-center align-items-center")}>
                                            <div className="d-flex row justify-content-center align-items-center">
                                                <div className="d-flex row-6 justify-content-center align-items-center">
                                                {user.name}
                                                </div>
                                                <div className="d-flex row-6 justify-content-center align-items-center">
                                                {user.nickname}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={rdxUser?.credentials?.profileDetail?.role_id === 2 ? ("d-flex col-4 justify-content-center align-items-center") : ("d-none")}>
                                            <button onClick={()=>deleteUser(user.id)}><i class="bi bi-trash"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>)
                    })}</>)
                    : ("Cargando usuarios")}
            </div>
        </>
    )
}