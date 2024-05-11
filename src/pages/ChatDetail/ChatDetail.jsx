import { useDispatch, useSelector } from "react-redux";
import "./ChatDetail.css"
import { chatDetailData } from "../../app/slices/chatDetailSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userData } from "../../app/slices/userSlice";
import { useState } from "react";
import { bringMessagesService } from "../../services/chatApiCalls";
import { createMessageService, deleteMessageService, updateMessageService } from "../../services/messageApiCalls";
import { addUserToChatService, getUsersFromChatService, leaveChatService, removeUserToChatService } from "../../services/userChatApiCalls";
import { getUsersInChatService, getUsersService } from "../../services/userApiCalls";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { updateUserDetail } from "../../app/slices/userDetailSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const ChatDetail = () => {
    const detailRdx = useSelector(chatDetailData);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoadingSpinner] = useState(false);
    const rdxUser = useSelector(userData)
    const [message, setMessage] = useState([]);
    const [usersChat, setUsersChat] = useState([]);
    const [users, setUser] = useState([]);
    const [messageCredential, setMessageCredentials] = useState(
        {
            id: "",
            content: "",
        }
    );


    const GetUsers = async () => {
        try {

            setLoadingSpinner(true)
            const fetched = await getUsersInChatService(rdxUser.credentials.token)

            if (!fetched.success) {

                setLoadingSpinner(false)
            }


            setUser(fetched.data)
            setLoadingSpinner(false)


        } catch (error) {

            setLoadingSpinner(false)
        }
    }

    const inputHandler = (e) => {
        setMessageCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };


    const bringMessages = async () => {

        try {



            const fetched = await bringMessagesService(detailRdx?.chats?.id, rdxUser.credentials.token)

            if (!fetched.success) {

                console.log(fetched.message)

            }

            setMessage(fetched.data);






        } catch (error) {

            console.log(error)
        }
    }


    useEffect(() => {
        if (!rdxUser.credentials.token) {
            navigate("/")
        }
    }, [rdxUser])

    useEffect(() => {
        if (!detailRdx?.chats?.id) {
            navigate("/chats");
        }
    }, [detailRdx]);

    const getUsersChat = async () => {
        try {
            setLoadingSpinner(true)
            const fetched = await getUsersFromChatService(detailRdx?.chats?.id, rdxUser.credentials.token)

            if (!fetched.success) {
                setLoadingSpinner(false)
            }

            setLoadingSpinner(false)

            setUsersChat(fetched.data)



        } catch (error) {
            setLoadingSpinner(false)
        }
    }



    useEffect(() => {
        if (usersChat.length === 0) {
            getUsersChat()
            GetUsers()
            bringMessages()

        }
    }, [usersChat]);

    useEffect(() => {

        setTimeout(() => {
            bringMessages()
        }, 10000);


    }, [message]);








    const createMessage = async (chatId) => {

        try {


            const fetched = await createMessageService(chatId, messageCredential, rdxUser.credentials.token)

            !fetched.success && console.log(fetched.message)

            fetched.message

            bringMessages()

            setMessageCredentials({
                id: "",
                content: ""
            })

        } catch (error) {

        }
    }
    const clearForm = async () => {
        setMessageCredentials({
            id: "",
            content: "",
        })


    }
    const deleteMessage = async (messageId) => {

        try {
            setLoadingSpinner(true)
            const fetched = await deleteMessageService(messageId, detailRdx?.chats?.id, rdxUser.credentials.token)
            if (!fetched.success) {
                setLoadingSpinner(false)
                return toast.error(fetched.message)
            }
            setLoadingSpinner(false)

            toast.success(fetched.message)

            bringMessages()


        } catch (error) {
            return toast.error(error)
        }
    }
    const updateMessage = async (messageId) => {

        setLoadingSpinner(true)
        const fetched = await updateMessageService(messageId, messageCredential, detailRdx?.chats?.id, rdxUser.credentials.token)
        if (!fetched.success) {
            setLoadingSpinner(false)
            return toast.error(fetched.message)
        }
        toast.success(fetched.message)

        bringMessages()

        clearForm()
    }

    const AddInfoToForm = async (message) => {
        setMessageCredentials({
            id: message.id,
            content: message.content,

        })
    }

    const removeUserToChat = async (userId) => {
        try {

            setLoadingSpinner(true)
            const fetched = await removeUserToChatService(userId, detailRdx?.chats?.id, rdxUser.credentials.token)

            if (!fetched.success) {

                setLoadingSpinner(false)
                return toast.error(fetched.message)
            }


            toast.success(fetched.message)
            setLoadingSpinner(false)

            getUsersChat()

        } catch (error) {
            setLoadingSpinner(false)
            return toast.error(error)
        }
    }
    const addUserToChat = async (userId) => {
        try {

            setLoadingSpinner(true)
            const fetched = await addUserToChatService(userId, detailRdx?.chats?.id, rdxUser.credentials.token)

            if (!fetched.success) {

                setLoadingSpinner(false)
                return toast.error(fetched.message)
            }



            setLoadingSpinner(false)
            toast.success(fetched.message)

            getUsersChat()

        } catch (error) {
            setLoadingSpinner(false)
            return toast.error(error)
        }
    }
    const leaveChat = async () => {
        try {
            const fetched = await leaveChatService(detailRdx?.chats?.id, rdxUser.credentials.token)




            navigate("/chats");

        } catch (error) {

        }
    }
    const goToChatPage = async () => {
        navigate("/chats");
    }
    const manageUserDetail = (user) => {
        //1. guardamos en RDX
        const dispatched = dispatch(updateUserDetail({ user }));

        // 2. navegamos a la vista de detalle
        navigate("/userdetail");
    };


    return (
        <>
            <div className="d-flex row justify-content-center align-items-center ChatDetailSectionDesign">
                <div className="d-flex row-1  fixed-top  justify-content-start align-items-center navBarChatDetailDesign">

                    <div className="d-flex col justify-content-start align-items-center">
                        <div className="d-flex col-4  justify-content-center align-items-center">


                            <CustomButton

                                icon={"bi bi-arrow-left"}
                                design={"appChatButtonDesign"}
                                onClick={goToChatPage}


                            />
                        </div>
                        <div className="d-flex col-4  justify-content-center align-items-center">
                            <p data-bs-toggle="modal" data-bs-target="#chatDetailModal">{detailRdx?.chats?.name}</p>
                        </div>
                        <div className="d-flex col-4  justify-content-center align-items-center">


                            <CustomButton

                                icon={"bi bi-box-arrow-right"}
                                design={"deleteButtonDesign"}
                                onClick={leaveChat}


                            />
                        </div>
                    </div>
                </div>

                <div className="d-flex row-10 justify-content-center align-items-center messageSectionDesign">

                    {loading && <div className="spinner-grow fs-5" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}

                    <div className="modal fade " role="dialog" id="editMessageModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog ">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title fs-5" id="exampleModalLabel">Edita tu mensaje</h3>
                                    <button type="button" onClick={clearForm} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">


                                    <textarea
                                        className="textAreaDesign" name="content" id="" cols="30" rows="10"
                                        placeholder={"Mensaje"}
                                        type={"text"}
                                        value={messageCredential.content || ""}
                                        onChange={(e) => inputHandler(e)}
                                    >
                                    </textarea>

                                </div>
                                <div className="modal-footer">


                                    <CustomButton

                                        icon={"bi bi-pencil-fill"}
                                        design={"updateButtonDesign"}
                                        onClick={() => updateMessage(messageCredential.id)}


                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade " role="dialog" id="chatDetailModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog ">
                            <div className="modal-content">
                                <div className="modal-header">

                                    <div className="d-flex row justify-content-center align-items-center">
                                        <div className="d-flex row-6 justify-content-center align-items-center">

                                            <h3 className="modal-title fs-5" id="exampleModalLabel">{detailRdx?.chats?.name}</h3>
                                        </div>
                                        <div className="d-flex row-6 justify-content-center align-items-center">

                                            <p>Creado el {new Date(detailRdx?.chats?.created_at).toDateString()}</p>

                                        </div>
                                    </div>

                                    {loading && <div className="spinner-grow fs-5" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>}
                                    <button type="button" onClick={clearForm} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <h3 className="modal-title mb-2 fs-5" id="exampleModalLabel">Integrantes</h3>
                                    <div className="d-flex row justify-content-center align-items-center">
                                        {usersChat.map(userChat => {
                                            return (
                                                <>

                                                    <div className="d-flex row justify-content-center align-items-center">
                                                        <div className="d-flex col justify-content-center align-items-center">
                                                            <div className={"d-flex col-4 justify-content-center align-items-center"}>
                                                                <img src={userChat.url_profile_image} width="40em" height="40em" alt="" />
                                                            </div>
                                                            <div data-bs-dismiss="modal" onClick={() => manageUserDetail(userChat)} className={"d-flex col-4 justify-content-center align-items-center"}>
                                                                {userChat.name}
                                                            </div>
                                                            <div className={detailRdx?.chats?.author_id === rdxUser?.credentials?.profileDetail?.id ? ("d-flex col-4 justify-content-center align-items-center") : ("d-none")}>



                                                                <CustomButton

                                                                    icon={"bi bi-box-arrow-right"}
                                                                    design={"deleteButtonDesign"}
                                                                    onClick={() => removeUserToChat(userChat.id)}


                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>)
                                        })}


                                    </div>
                                </div>
                                <div className="modal-body">

                                    {detailRdx?.chats?.author_id === rdxUser?.credentials?.profileDetail?.id
                                        && (<>

                                            <h3 className="modal-title mb-2 fs-5" id="exampleModalLabel">Agregar integrantes</h3>
                                            {users.map(user => {
                                                return (
                                                    <>

                                                        <div className="d-flex row justify-content-center align-items-center">
                                                            <div className="d-flex col justify-content-center align-items-center">
                                                                <div className={detailRdx?.chats?.author_id === rdxUser?.credentials?.profileDetail?.id ? ("d-flex col-4 justify-content-center align-items-center") : ("d-flex col-6 justify-content-center align-items-center")}>
                                                                    <img src={user.url_profile_image} width="40em" height="40em" alt="" />
                                                                </div>
                                                                <div className={detailRdx?.chats?.author_id === rdxUser?.credentials?.profileDetail?.id ? ("d-flex col-4 justify-content-center align-items-center") : ("d-flex col-6 justify-content-center align-items-center")}>
                                                                    {user.name}
                                                                </div>
                                                                <div className={detailRdx?.chats?.author_id === rdxUser?.credentials?.profileDetail?.id ? ("d-flex col-4 justify-content-center align-items-center") : ("d-none")}>


                                                                    <CustomButton

                                                                        icon={"bi bi-box-arrow-right"}
                                                                        design={"appChatButtonDesign"}
                                                                        onClick={() => addUserToChat(user.id)}


                                                                    />

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>)
                                            })}

                                        </>)
                                    }




                                </div>

                            </div>
                        </div>
                    </div>





                    <div className="d-flex row m-0  justify-content-end align-items-center messagesSection">



                        {message.length > 0
                            ? (<>{message.map(
                                messages => {
                                    return (
                                        <>
                                            <div className={rdxUser?.credentials?.profileDetail?.id === messages.user_id ? ("d-flex row  justify-content-end align-items-center") : ("d-flex row  justify-content-start align-items-center")}>
                                                <div className={rdxUser?.credentials?.profileDetail?.id === messages.user_id ? ("d-flex row my-2 justify-content-end align-items-center ownMessageCardDesign ") : ("d-flex row my-2 justify-content-start align-items-center notOwnMessageCardDesign")}>
                                                    <div className="d-flex row-2 justify-content-end align-items-center topSectionMessage">
                                                        <div className="d-flex col-4 justify-content-start align-items-center">
                                                            {rdxUser?.credentials?.profileDetail?.id === messages.user_id ? (rdxUser?.credentials?.profileDetail?.name) : (messages.user.name)}
                                                        </div>
                                                        <div className={rdxUser?.credentials?.profileDetail?.id === messages.user_id ? ("d-flex col   justify-content-end align-items-center") : ("d-none")}>
                                                            <div className="d-flex col-4 justify-content-end align-items-center">


                                                                <CustomButton

                                                                    icon={"bi bi-trash"}
                                                                    design={"deleteButtonDesign"}
                                                                    onClick={() => deleteMessage(messages.id)}


                                                                />
                                                            </div>
                                                            <div className="d-flex col-4 justify-content-end align-items-center">

                                                                <CustomButton

                                                                    icon={"bi bi-pencil"}
                                                                    design={"updateButtonDesign"}
                                                                    onClick={() => AddInfoToForm(messages)}
                                                                    modalTarget={"#editMessageModal"}
                                                                    modal={"modal"}


                                                                />
                                                            </div>


                                                        </div>
                                                    </div>
                                                    <div className="d-flex row-8 justify-content-end align-items-center">
                                                        {messages.content}
                                                    </div>
                                                    <div className="d-flex row-2 justify-content-end align-items-center">
                                                        {new Date(messages.created_at).toDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}</>)
                            : (<><p>Este chat aun no tiene mensajes</p></>)}

                    </div>
                </div>
                <div className="d-flex row-1 mb-5  fixed-bottom  justify-content-center align-items-center ">
                    <div className="d-flex col  justify-content-center align-items-center">
                        <div className="d-flex col-11 justify-content-start align-items-center">
                            <textarea
                                className="textAreaDesign" name="content" id="" cols="30" rows="10"
                                placeholder={"Mensaje"}
                                type={"text"}
                                value={messageCredential.content || ""}
                                onChange={(e) => inputHandler(e)}

                            >

                            </textarea>
                        </div>
                        <div className="d-flex col-1 justify-content-end align-items-center">
                            <button className="buttonSendDesign" onClick={() => createMessage(detailRdx?.chats?.id)}><i className="bi bi-send-fill"></i></button>
                        </div>
                    </div>
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