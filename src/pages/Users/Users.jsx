import { useDispatch, useSelector } from "react-redux";
import "./Users.css"
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteUserService, getUsersService, searchUsersService } from "../../services/userApiCalls";
import { updateUserDetail } from "../../app/slices/userDetailSlice";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { searchUserData, updateUserCriteria } from "../../app/slices/searchUserSlice";

export const Users = () => {
    const rdxUser = useSelector(userData);
    const searchUserRdx = useSelector(searchUserData);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [loading, setLoadingSpinner] = useState(false);
    const [users, setUser] = useState([]);


    const [checkButtonUser, setCheckButtonUser] = useState(false)






    let arrayToDeleteUser = []



    const handleCheckUser = (id) => {
        setCheckButtonUser(!checkButtonUser)

        const isInArrayUser = arrayToDeleteUser.includes(id)
        if (isInArrayUser) {
            const index = arrayToDeleteUser.indexOf(id)
            arrayToDeleteUser.splice(index, 1)
        } else {
            arrayToDeleteUser.push(id)
        }
        setCheckButtonUser(false)
        // setUsersToDelete({ usersId: arrayToDelete })
    }

    const usersToRemove = { checkbox: arrayToDeleteUser }

    const deleteMoreTanOneUser = async (userId) => {

        try {



            setLoadingSpinner(true)
            const fetched = await deleteUserService(usersToRemove, rdxUser.credentials.token)

            if (!fetched.success) {

                console.log(fetched.message)

                return setLoadingSpinner(false)
            }

            setLoadingSpinner(false)


            GetUsers()


        } catch (error) {

            return setLoadingSpinner(false)
        }
    }





    useEffect(() => {

        !rdxUser?.credentials?.token && (navigate("/"))

    }, [rdxUser]);


    const [criteria, setCriteria] = useState("");

    const searchHandler = (e) => {
        setCriteria(e.target.value);

    };


    useEffect(() => {
        setLoadingSpinner(true)
        const searching = setTimeout(() => {

            dispatch(updateUserCriteria(criteria));
            setLoadingSpinner(false)
        }, 375);

        return () => {
            clearTimeout(searching);
            setLoadingSpinner(false)
        }
    }, [criteria]);




    const GetUsers = async () => {
        try {

            let fetched
            if (searchUserRdx.criteriaUser !== "") {


                fetched = await searchUsersService(rdxUser.credentials.token, searchUserRdx.criteriaUser);


            }

            else {

                fetched = await getUsersService(rdxUser.credentials.token)




            }

            setUser(fetched.data)




        } catch (error) {
            console.log(error)
        }

    }



    useEffect(() => {

        GetUsers()

    }, [searchUserRdx.criteriaUser])







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

                <h3 className="fs-5 mb-2">Usuarios</h3>

                <CustomInput
                    placeholder={"Buscar usuarios por nickname"}
                    type={"text"}
                    name={"nickname"}
                    design={"input-design"}
                    value={criteria || ""}
                    changeEmit={searchHandler}
                />

                {loading && <div className="spinner-grow fs-5" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}


                <div className={rdxUser?.credentials?.profileDetail?.role_id === 2 ? ("d-flex col justify-content-center align-items-center") : ("d-none")}>



                    <div className={"d-flex col-10 justify-content-center align-items-center"}>
                    </div>
                    <div className={"d-flex col-2 justify-content-center align-items-center"}>


                        <CustomButton

                            icon={"bi bi-trash"}
                            design={"deleteButtonDesign"}
                            onClick={() => deleteMoreTanOneUser(arrayToDeleteUser)}
                        />




                    </div>
                </div>
                {users.length > 0
                    ? (<>{users.map(user => {
                        return (<>
                            <div className="d-flex row  justify-content-center align-items-center usersCardSectionDesign ">
                                <div className="d-flex row  mb-2 justify-content-center align-items-center userCardDesign"  >
                                    <div className="d-flex col justify-content-center align-items-center">
                                        <div onClick={() => manageUserDetail(user)} className={rdxUser?.credentials?.profileDetail?.role_id === 2 ? ("d-flex col-4 justify-content-center align-items-center") : ("d-flex col-1 justify-content-start align-items-center")}>
                                            <img src={user.url_profile_image} width="40em" height="40em" alt="" />
                                        </div>
                                        <div className={rdxUser?.credentials?.profileDetail?.role_id === 2 ? ("d-flex col-4 justify-content-center  align-items-center") : ("d-flex col-11 justify-content-start  align-items-center")}>
                                            <div className="d-flex row justify-content-start align-items-center">
                                                <div onClick={() => manageUserDetail(user)} className="d-flex row-6 justify-content-center align-items-center">
                                                    {user.name}
                                                </div>
                                                <div className="d-flex row-6 justify-content-center align-items-center">
                                                    {user.nickname}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={rdxUser?.credentials?.profileDetail?.role_id === 2 ? ("d-flex col-4 justify-content-center align-items-center") : ("d-none")}>






                                            <CustomInput
                                                placeholder={"Buscar usuarios por nickname"}
                                                type={"checkbox"}
                                                name={"checkbox"}
                                                design={user.role_id === 2 ? ("d-none") : ("switch")}
                                                value={checkButtonUser.state}
                                                changeEmit={() => handleCheckUser(user.id)}
                                            />




                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>)
                    })}</>)
                    : (<div className="spinner-grow fs-5" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>)}
            </div>
        </>
    )
}