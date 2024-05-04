import { useSelector } from "react-redux";
import "./ChatDetail.css"
import { chatDetailData } from "../../app/slices/chatDetailSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userData } from "../../app/slices/userSlice";
import { useState } from "react";
import { bringMessagesService } from "../../services/chatApiCalls";
import { createMessageService, deleteMessageService, updateMessageService } from "../../services/messageApiCalls";
import { CustomInput } from "../../components/CustomInput/CustomInput";

export const ChatDetail = () => {
    const detailRdx = useSelector(chatDetailData);
    const navigate = useNavigate();
    const rdxUser = useSelector(userData)
    const [message, setMessage] = useState([]);
    const [messageCredential, setMessageCredentials] = useState(
        {
            id: "",
            content: "",
        }
    );

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
        if (message.length === 0) {
            bringMessages()
        }
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


        const fetched = await updateMessageService(messageId, messageCredential,detailRdx?.chats?.id, rdxUser.credentials.token)
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


    return (
        <>
            <div className="d-flex row justify-content-center align-items-center ChatDetailSectionDesign">
                <div className="d-flex row-1 sticky-top justify-content-start align-items-center navBarChatDetailDesign">
                    <p>{detailRdx?.chats?.name}</p>
                </div>

                <div className="d-flex row-10 justify-content-center align-items-center messageSectionDesign">

                    <div className="modal fade " id="editMessageModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

                                    <button type="button" onClick={()=>updateMessage(messageCredential.id)}  className="btn buttonEditDesign " data-bs-dismiss="modal"><i class="bi bi-pencil-fill"></i></button>
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
                                                        {rdxUser?.credentials?.profileDetail?.id === messages.user_id ? (rdxUser?.credentials?.profileDetail?.name) : ("Autor")}
                                                        <div className={rdxUser?.credentials?.profileDetail?.id === messages.user_id ? ("d-flex col  justify-content-center align-items-center") : ("d-none")}>
                                                            <div className="d-flex col-6 justify-content-center align-items-center">
                                                                <button onClick={() => deleteMessage(messages.id)}><i className="bi bi-trash"></i></button>
                                                            </div>
                                                            <div className="d-flex col-6 justify-content-center align-items-center">
                                                                <button data-bs-toggle="modal" data-bs-target="#editMessageModal" onClick={() => AddInfoToForm(messages)}><i className="bi bi-pencil"></i></button>
                                                            </div>


                                                        </div>
                                                    </div>
                                                    <div className="d-flex row-10 justify-content-end align-items-center">
                                                        {messages.content}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}</>)
                            : (<><p>Este chat aun no tiene mensajes</p></>)}

                    </div>
                </div>
                <div className="d-flex row-1  justify-content-center align-items-center">
                    <div className="d-flex col sticky-bottom justify-content-center align-items-center">
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