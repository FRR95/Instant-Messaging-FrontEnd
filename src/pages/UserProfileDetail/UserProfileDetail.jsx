import { useNavigate } from "react-router-dom"
import "./UserProfileDetail.css"
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect } from "react";
import { userDetailData } from "../../app/slices/userDetailSlice";

export const UserProfileDetail = () => {

    const navigate = useNavigate()
    const rdxUser = useSelector(userData);
    const rdxUserDetail = useSelector(userDetailData);

    useEffect(() => {

        !rdxUser?.credentials?.token && (navigate("/"))
           

    }, [rdxUser]);


    return (
        <>
            <div className="d-flex row justify-content-center align-items-center  profileDetailDesign">
                <div className="d-flex row justify-content-center align-items-center">
                    <img src={rdxUserDetail.user.url_profile_image} alt="dgdf" />
                    <button><i class="bi bi-pencil-fill"></i></button>
                </div>
                <div className="d-flex row justify-content-center align-items-center">



                    <label>Nombre</label>
                    <p>{rdxUserDetail.user.name}</p>




                </div>
                <div className="d-flex row justify-content-center align-items-center">
                    <label>Nickname</label>
                    <p>{rdxUserDetail.user.nickname}</p>
                </div>
                <div className="d-flex row justify-content-center align-items-center">
                    <label>Email</label>
                    <p>{rdxUserDetail.user.email}</p>
                </div>
                <div className="d-flex row justify-content-center align-items-center">
                    <label>Biografía</label>
                    <p>{rdxUserDetail.user.biography}</p>
                </div>
                <div className="d-flex row justify-content-center align-items-center">
                    <label>Estado</label>
                    {rdxUserDetail.user.isActive === 0 ? (<p>DESCONECTADO</p>) : (<p>EN LINEA</p>)}
                </div>
                <div className="d-flex row justify-content-center align-items-center">
                    <label>Fecha de creación</label>
                    <p>{rdxUserDetail.user.created_at}</p>
                </div>
            </div>

        </>
    )
}