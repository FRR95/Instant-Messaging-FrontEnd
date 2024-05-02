import { useSelector } from "react-redux";
import "./Profile.css"
import { useEffect, useState } from "react";
import { GetProfile } from "../../services/userApiCalls";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/slices/userSlice";



export const Profile = () => {
    const rdxUser = useSelector(userData);
    const navigate = useNavigate()

    const [user, setUser] = useState({
        url_profile_image: "",
        name: "",
        nickname: "",
        email: "",
        biography: "",
        isActive: "",
        created_at: ""
    });

    useEffect(() => {

        rdxUser?.credentials?.token ? (getUserProfile())
            : (navigate("/"))

    }, [rdxUser]);

    const getUserProfile = async () => {
        try {

            const fetched = await GetProfile(rdxUser.credentials.token);

            if (!fetched.success) {
                console.log(fetched.message)
            }

            setUser({
                url_profile_image: fetched.data.url_profile_image,
                name: fetched.data.name,
                nickname: fetched.data.nickname,
                email: fetched.data.email,
                biography: fetched.data.biography,
                isActive: fetched.data.is_active,
                created_at: fetched.data.created_at,

            });

        } catch (error) {
            console.log(error)
        }
    };
    return (
        <>
            <div className="d-flex row justify-content-center align-items-center  profileDesign">
                <div className="d-flex row justify-content-center align-items-center">
                    <img src={user.url_profile_image} alt="dgdf" />
                </div>
                <div className="d-flex row justify-content-center align-items-center">



                    <label>Nombre</label>
                    <p>{user.name}</p>




                </div>
                <div className="d-flex row justify-content-center align-items-center">
                    <label>Nickname</label>
                    <p>{user.nickname}</p>
                </div>
                <div className="d-flex row justify-content-center align-items-center">
                    <label>Email</label>
                    <p>{user.email}</p>
                </div>
                <div className="d-flex row justify-content-center align-items-center">
                    <label>Biografía</label>
                    <p>{user.biography}</p>
                </div>
                <div className="d-flex row justify-content-center align-items-center">
                    <label>Estado</label>
                    {user.isActive === 0 ? (<p>DESCONECTADO</p>) : (<p>EN LINEA</p>)} 
                </div>
                <div className="d-flex row justify-content-center align-items-center">
                    <label>Fecha de creación</label>
                    <p>{user.created_at}</p>
                </div>
            </div>
        </>
    )
}