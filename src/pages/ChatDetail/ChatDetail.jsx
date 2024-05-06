import { useSelector } from "react-redux";
import "./ChatDetail.css"
import { chatDetailData } from "../../app/slices/chatDetailSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userData } from "../../app/slices/userSlice";
import { useState } from "react";
import { bringMessagesService } from "../../services/chatApiCalls";
import { createMessageService, deleteMessageService, updateMessageService } from "../../services/messageApiCalls";
import { addUserToChatService, getUsersFromChatService, leaveChatService, removeUserToChatService } from "../../services/userChatApiCalls";
import { getUsersService } from "../../services/userApiCalls";



export const ChatDetail = () => {
    const detailRdx = useSelector(chatDetailData);
    const navigate = useNavigate();
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
            const fetched = await getUsersService(rdxUser.credentials.token)

            if (!fetched.success) {
                console.log(fetched.message)
                setLoadingSpinner(false)
            }

            console.log(fetched.message)
            setUser(fetched.data)
            setLoadingSpinner(false)


        } catch (error) {
            console.log(error)
            setLoadingSpinner(false)
        }
    }

    const inputHandler = (e) => {
        setMessageCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };


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
            const fetched = await getUsersFromChatService(detailRdx?.chats?.id, rdxUser.credentials.token)

            if (!fetched.success) {
                console.log(fetched.message)
            }

            console.log(fetched.message)

            setUsersChat(fetched.data)



        } catch (error) {
            console.log(error)
        }
    }

    const bringMessages = async () => {

        try {
            
            const fetched = await bringMessagesService(detailRdx?.chats?.id, rdxUser.credentials.token)

            if (!fetched.success) {
                console.log(fetched.message);
                setLoadingSpinner(false);

            }

            setMessage(fetched.data);

            setLoadingSpinner(false);



        } catch (error) {
            console.log(error)
            setLoadingSpinner(false);
        }
    }

    useEffect(() => {
        if (message.length === 0) {
            bringMessages()

        }
    }, [message]);
    useEffect(() => {
        if (usersChat.length === 0) {
            getUsersChat()
            GetUsers()
        }
    }, [usersChat]);

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
            console.log(error)
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
            const fetched = await deleteMessageService(messageId, detailRdx?.chats?.id, rdxUser.credentials.token)
            if (!fetched.success) {
                console.log(fetched.message)
            }
            console.log(fetched.message)

            bringMessages()


        } catch (error) {
            console.log(error)
        }
    }
    const updateMessage = async (messageId) => {


        const fetched = await updateMessageService(messageId, messageCredential, detailRdx?.chats?.id, rdxUser.credentials.token)
        if (!fetched.success) {
            console.log(fetched.message)
        }

        console.log(fetched.message)
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
                console.log(fetched.message)
                setLoadingSpinner(false)
            }

            console.log(fetched.message)

            setLoadingSpinner(false)

            getUsersChat()

        } catch (error) {
            console.log(error)
        }
    }
    const addUserToChat = async (userId) => {
        try {
            const fetched = await addUserToChatService(userId, detailRdx?.chats?.id, rdxUser.credentials.token)

            if (!fetched.success) {
                console.log(fetched.message)
            }

            console.log(fetched.message)

            getUsersChat()

        } catch (error) {
            console.log(error)
        }
    }
    const leaveChat = async () => {
        try {
            const fetched = await leaveChatService(detailRdx?.chats?.id, rdxUser.credentials.token)

            if (!fetched.success) {
                console.log(fetched.message)
            }

            console.log(fetched.message)

            navigate("/chats");

        } catch (error) {
            console.log(error)
        }
    }
    const goToChatPage = async () => {
        navigate("/chats");
    }


    return (
        <>
            <div className="d-flex row justify-content-center align-items-center ChatDetailSectionDesign">
                <div className="d-flex row-1 sticky-top  justify-content-start align-items-center navBarChatDetailDesign">

                    <div className="d-flex col sticky-top justify-content-start align-items-center">
                        <div className="d-flex col-4  justify-content-center align-items-center">
                            <button onClick={goToChatPage}><i class="bi bi-arrow-left"></i></button>
                        </div>
                        <div className="d-flex col-4  justify-content-center align-items-center">
                            <p data-bs-toggle="modal" data-bs-target="#chatDetailModal">{detailRdx?.chats?.name}</p>
                        </div>
                        <div className="d-flex col-4  justify-content-center align-items-center">
                            <button onClick={leaveChat}><i class="bi bi-box-arrow-right"></i></button>
                        </div>
                    </div>
                </div>

                <div className="d-flex row-10 justify-content-center align-items-center messageSectionDesign">



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

                                    <button type="button" onClick={() => updateMessage(messageCredential.id)} className="btn buttonEditDesign " data-bs-dismiss="modal"><i class="bi bi-pencil-fill"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade " role="dialog" id="chatDetailModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog ">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title fs-5" id="exampleModalLabel">{detailRdx?.chats?.name}</h3>

                                    {loading && <div className="spinner-grow fs-5" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>}
                                    <button type="button" onClick={clearForm} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <h3 className="modal-title fs-5" id="exampleModalLabel">Integrantes</h3>
                                    <div className="d-flex row justify-content-center align-items-center">
                                        {usersChat.map(userChat => {
                                            return (
                                                <>

                                                    <div className="d-flex row justify-content-center align-items-center">
                                                        <div className="d-flex col justify-content-center align-items-center">
                                                            <div className={"d-flex col-4 justify-content-center align-items-center"}>
                                                                <img src={userChat.url_profile_image} width="40em" height="40em" alt="" />
                                                            </div>
                                                            <div className={"d-flex col-4 justify-content-center align-items-center"}>
                                                                {userChat.name}
                                                            </div>
                                                            <div className={detailRdx?.chats?.author_id === rdxUser?.credentials?.profileDetail?.id ? ("d-flex col-4 justify-content-center align-items-center") : ("d-none")}>
                                                                <button onClick={() => removeUserToChat(userChat.id)}><i class="bi bi-box-arrow-right"></i></button>
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
                                            <h3>Agregar integrantes</h3>
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
                                                                    <button onClick={() => addUserToChat(user.id)}><i class="bi bi-box-arrow-right"></i></button>
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





                    <div className="d-flex row m-0 justify-content-end align-items-center">



                        {message.length > 0
                            ? (<>{message.map(
                                messages => {
                                    return (
                                        <>
                                            <div className={rdxUser?.credentials?.profileDetail?.id === messages.user_id ? ("d-flex row m-0 justify-content-end align-items-center") : ("d-flex row m-0 justify-content-start align-items-center")}>
                                                <div className={rdxUser?.credentials?.profileDetail?.id === messages.user_id ? ("d-flex row my-2 justify-content-end align-items-center ownMessageCardDesign ") : ("d-flex row my-2 justify-content-start align-items-center notOwnMessageCardDesign")}>
                                                    <div className="d-flex row-2 justify-content-end align-items-center">
                                                        {rdxUser?.credentials?.profileDetail?.id === messages.user_id ? (rdxUser?.credentials?.profileDetail?.name) : (messages.user.name)}
                                                        <div className={rdxUser?.credentials?.profileDetail?.id === messages.user_id ? ("d-flex col  justify-content-end align-items-center") : ("d-none")}>
                                                            <div className="d-flex col-4 justify-content-end align-items-center">
                                                                <button onClick={() => deleteMessage(messages.id)}><i className="bi bi-trash"></i></button>
                                                            </div>
                                                            <div className="d-flex col-4 justify-content-end align-items-center">
                                                                <button data-bs-toggle="modal" data-bs-target="#editMessageModal" onClick={() => AddInfoToForm(messages)}><i className="bi bi-pencil"></i></button>
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
                <div className="d-flex row-1 sticky-bottom   justify-content-center align-items-center">
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
                            <button onClick={() => createMessage(detailRdx?.chats?.id)}><i className="bi bi-send-fill"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}