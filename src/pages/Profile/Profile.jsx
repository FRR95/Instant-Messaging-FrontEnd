import { useSelector } from "react-redux";
import "./Profile.css"
import { useEffect, useState } from "react";
import { GetProfile, updateProfileService } from "../../services/userApiCalls";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/slices/userSlice";
import { CustomInput } from "../../components/CustomInput/CustomInput";



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

    const updateProfile = async () => {
        try {
            const fetched = await updateProfileService(user, rdxUser.credentials.token)

            if (!fetched.success) {
                console.log(fetched.message)
            }

            console.log(fetched.message)

        } catch (error) {
            console.log(error)
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
            <div className="d-flex row  justify-content-center align-items-center   profileDesign">
                <div className="modal fade " id="editProfileModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog ">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="justify-content-center modal-title fs-5" id="exampleModalLabel">Edita tu perfil</h3>
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

                                <button type="button" onClick={updateProfile} className="btn editButtonDesign " data-bs-dismiss="modal"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex row justify-content-center align-items-center">
                    <img className="logoImg" src={user.url_profile_image} alt="dgdf" />
                    <button className="editButtonDesign" data-bs-toggle="modal" data-bs-target="#editProfileModal" onClick={() => AddInfoToForm(user)} ><i className="bi bi-pencil-fill"></i></button>
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