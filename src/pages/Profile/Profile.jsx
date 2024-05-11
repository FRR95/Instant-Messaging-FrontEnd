import { useSelector } from "react-redux";
import "./Profile.css"
import { useEffect, useState } from "react";
import { GetProfile, updateProfileService } from "../../services/userApiCalls";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/slices/userSlice";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const Profile = () => {
    const rdxUser = useSelector(userData);
    const navigate = useNavigate()
    const [loading, setLoadingSpinner] = useState(false);

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

    useEffect(() => {

        rdxUser?.credentials?.token ? (getUserProfile())
            : (navigate("/"))

    }, [rdxUser]);

    const getUserProfile = async () => {
        try {

            
              
          
            setLoadingSpinner(true)
            const fetched = await GetProfile(rdxUser.credentials.token);

            if (!fetched.success) {
                return setLoadingSpinner(false)
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

            return setLoadingSpinner(false)

        } catch (error) {
            return setLoadingSpinner(false)
        }
    };

    const updateProfile = async () => {
        try {

            if (user.name === "" || user.biography === "") {

                return toast.error("No has rellenado todos los campos")
            }

            setLoadingSpinner(true)
            const fetched = await updateProfileService(user, rdxUser.credentials.token)

            if (!fetched.success) {
                setLoadingSpinner(false)
                return toast.error(fetched.message)
            }

            setLoadingSpinner(false)
            toast.success(fetched.message)

        } catch (error) {
            setLoadingSpinner(false)
            toast.error(fetched.message)
        }
    }

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
    return (
        <>
            <div className="d-flex row  justify-content-center align-items-center profileDesign">
                <div className="modal fade " id="editProfileModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog ">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="justify-content-center modal-title fs-5" id="exampleModalLabel">Edita tu perfil</h3>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <div className="d-flex row justify-content-center align-items-center">
                                    <label className="fs-5">Nombre</label>
                                    <CustomInput
                                        type="text"
                                        name="name"
                                        placeholder={"Nombre"}
                                        design={"input-design"}
                                        value={user.name || ""}
                                        changeEmit={inputHandler}
                                    // onBlurFunction={(e) => checkError(e)}
                                    />
                                    <label className="fs-5">Biografía</label>
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
                                    onClick={updateProfile}

                                    modal={"modal"}


                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex row justify-content-center align-items-center">
                    <img className="logoImg" src={user.url_profile_image} alt="dgdf" />

                    <CustomButton

                        icon={"bi bi-pencil"}
                        design={"updateButtonDesign"}
                        onClick={() => AddInfoToForm(user)}
                        modalTarget={"#editProfileModal"}
                        modal={"modal"}


                    />

                    {loading && <div className="spinner-grow fs-5" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
                </div>
                <div className="d-flex row justify-content-center align-items-center">



                    <label className="fs-5">Nombre</label>
                    <p>{user.name}</p>




                </div>
                <div className="d-flex row justify-content-center align-items-center">
                    <label className="fs-5">Nickname</label>
                    <p>{user.nickname}</p>
                </div>
                <div className="d-flex row justify-content-center align-items-center">
                    <label className="fs-5">Email</label>
                    <p>{user.email}</p>
                </div>
                <div className="d-flex row justify-content-center align-items-center">
                    <label className="fs-5">Biografía</label>
                    <p>{user.biography}</p>
                </div>
                <div className="d-flex row justify-content-center align-items-center">
                    <label className="fs-5">Estado</label>
                    {user.isActive === 0 ? (<p>DESCONECTADO 🔴</p>) : (<p>EN LINEA 🟢</p>)}
                </div>
                <div className="d-flex row justify-content-center align-items-center">
                    <label className="fs-5">Fecha de creación</label>

                    {new Date(user.created_at).toDateString()}
                </div>

                <ToastContainer
                    position="top-right"
                    autoClose={1300}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable

                    theme="light"

                />
            </div>
        </>
    )
}