import { useNavigate } from "react-router-dom"
import "./UserProfileDetail.css"
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { userDetailData } from "../../app/slices/userDetailSlice";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { updateUserProfileService } from "../../services/userApiCalls";
import { CustomButton } from "../../components/CustomButton/CustomButton";

export const UserProfileDetail = () => {

    const [user, setUser] = useState({
        url_profile_image: "",
        name: "",
        nickname: "",
        email: "",
        biography: "",
        isActive: "",
        created_at: ""
    });

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const navigate = useNavigate()
    const rdxUser = useSelector(userData);
    const rdxUserDetail = useSelector(userDetailData);
    const [loading, setLoadingSpinner] = useState(false);

    useEffect(() => {

        !rdxUser?.credentials?.token && (navigate("/"))


    }, [rdxUser]);

    useEffect(() => {

        !rdxUserDetail?.user?.id && (navigate("/"))


    }, [rdxUserDetail]);

    const AddInfoToForm = async (user) => {
        setUser({
            url_profile_image: user.url_profile_image,
            name: user.name,
            nickname: user.nickname,
            email: user.email,
            biography: user.biography,
            isActive: user.isActive,
            created_at: user.created_at
        })
    }

    const updateProfile = async (userId) => {
        try {

            setLoadingSpinner(true)
            const fetched = await updateUserProfileService(userId, user, rdxUser.credentials.token)

            if (!fetched.success) {
                return setLoadingSpinner(false)
            }



            setLoadingSpinner(false)

        } catch (error) {
            setLoadingSpinner(false)
        }
    }


    return (
        <>
            <div className="d-flex row justify-content-center align-items-center  profileDetailDesign">
                <div className="modal fade " id="editProfileModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog ">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title fs-5" id="exampleModalLabel">Editar perfil de usuario</h3>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex row justify-content-center align-items-center">
                                    <label>Nombre</label>
                                    <CustomInput
                                        type="text"
                                        name="name"
                                        placeholder={"Nombre"}
                                        design={"input-design"}
                                        value={user.name || ""}
                                        changeEmit={inputHandler}
                                    // onBlurFunction={(e) => checkError(e)}
                                    />
                                    <label>Biografía</label>
                                    <CustomInput
                                        type="text"
                                        name="biography"
                                        placeholder={"Tu biografía"}
                                        design={"input-design"}
                                        value={user.biography || ""}
                                        changeEmit={inputHandler}
                                    // onBlurFunction={(e) => checkError(e)}
                                    />


                                </div>
                            </div>
                            <div className="modal-footer">


                                <CustomButton

                                    icon={"bi bi-pencil-fill"}
                                    design={"updateButtonDesign"}
                                    onClick={() => updateProfile(rdxUserDetail.user.id)}

                                    modal={"modal"}


                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex row justify-content-center align-items-center">
                    <img className="logoImg" src={rdxUserDetail.user.url_profile_image} alt="dgdf" />

                    <CustomButton

                        icon={"bi bi-pencil-fill"}
                        design={rdxUser?.credentials?.profileDetail?.role_id === 2 ? ("updateButtonDesign") : ("d-none")}
                        onClick={() => AddInfoToForm(rdxUserDetail.user)}
                        modalTarget={"#editProfileModal"}
                        modal={"modal"}


                    />

                    {loading && <div className="spinner-grow fs-5" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
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
                    {rdxUserDetail.user.is_active === 0 ? (<p>DESCONECTADO 🔴</p>) : (<p>EN LINEA 🟢</p>)}
                </div>
                <div className="d-flex row justify-content-center align-items-center">
                    <label>Fecha de creación</label>
                    <p>{new Date(rdxUserDetail.user.created_at).toDateString()}</p>
                </div>
            </div>

        </>
    )
}