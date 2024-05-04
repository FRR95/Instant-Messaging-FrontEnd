import "./Chat.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/slices/userSlice";
import { createChatService, deleteChatService, getUserChatsService, updateChatService } from "../../services/chatApiCalls";
import { updateChatDetail } from "../../app/slices/chatDetailSlice";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { validation } from "../../utils/validations";


export const Chat = () => {
    const rdxUser = useSelector(userData);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [chat, setChat] = useState([]);

    const [chatCredential, setchatCredential] = useState({
        id: "",
        name: "",
    });

    const inputHandler = (e) => {
        setchatCredential((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const [credencialesError, setCredencialesError] = useState({
        nameError: "",
    });

    const checkError = (e) => {
        const error = validation(e.target.name, e.target.value);

        setCredencialesError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }));
    };


    const getUserChats = async () => {
        try {

            const fetched = await getUserChatsService(rdxUser.credentials.token);

            if (!fetched.success) {
                console.log(fetched.message)
            }

            setChat(fetched.data);




        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {

        !rdxUser?.credentials?.token && (navigate("/"))

    }, [rdxUser]);

    useEffect(() => {
        if (chat.length === 0) {
            getUserChats()
        }
    }, [chat])

    const manageChatDetail = (chats) => {
        //1. guardamos en RDX
        const dispatched = dispatch(updateChatDetail({ chats }));

        // 2. navegamos a la vista de detalle
        navigate("/chatdetail");
    };

    const createChat = async () => {
        try {

            const fetched = await createChatService(chatCredential, rdxUser?.credentials?.token)

            if (!fetched.success) {
                console.log(fetched.message)
            }
            console.log(fetched.message)
            getUserChats()
        } catch (error) {
            console.log(error)

        }
    }

    const deleteChat = async (chatId) => {
        try {
            const fetched = await deleteChatService(chatId, rdxUser?.credentials?.token)
            if (!fetched.success) {
                console.log(fetched.message)
            }
            console.log(fetched.message)
            getUserChats()

        } catch (error) {
            console.log(error)
        }
    }

    const clearForm = async () => {
        setchatCredential({
            id: "",
            name: "",
        })


    }

    const updateChat = async (chatId) => {


        const fetched = await updateChatService(chatId, chatCredential, rdxUser.credentials.token)
        if (!fetched.success) {
            console.log(fetched.message)
        }

        console.log(fetched.message)
        getUserChats()

        clearForm()
    }

    const AddInfoToForm = async (chat) => {
        setchatCredential({
            id: chat.id,
            name: chat.name,

        })
    }

  



    return (
        <>
            <div className="d-flex row justify-content-center align-items-center  chatDesign">


                <div className="modal fade " id="newChatModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog ">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title fs-5" id="exampleModalLabel">Crear nuevo chat</h3>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">


                                <CustomInput
                                    type="text"
                                    name="name"
                                    placeholder={"Nombre del nuevo grupo"}
                                    value={chatCredential.name || ""}
                                    changeEmit={inputHandler}
                                    onBlurFunction={(e) => checkError(e)}
                                />
                                <div className="error">{credencialesError.nameError}</div>
                            </div>
                            <div className="modal-footer">

                                <button type="button" onClick={createChat} className="btn buttonEditDesign " data-bs-dismiss="modal"><i className="bi bi-plus-square"></i>{`Crear nuevo chat`}</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade " id="updateChatModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog ">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title fs-5" id="exampleModalLabel">Editar chat</h3>
                                <button type="button" onClick={clearForm} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">


                                <CustomInput
                                    type="text"
                                    name="name"
                                    placeholder={"Nombre del nuevo grupo"}
                                    value={chatCredential.name || ""}
                                    changeEmit={inputHandler}
                                    onBlurFunction={(e) => checkError(e)}
                                />
                                <div className="error">{credencialesError.nameError}</div>
                            </div>
                            <div className="modal-footer">

                                <button type="button" onClick={() => updateChat(chatCredential.id)} className="btn buttonEditDesign " data-bs-dismiss="modal"><i className="bi bi-plus-square"></i>{`Editar chat`}</button>
                            </div>
                        </div>
                    </div>
                </div>

                {chat.length > 0
                    ? (<>{chat.map(chats => {
                        return (
                            <>
                                {/* onClick={() => manageChatDetail(chats)} */}
                                <div className="d-flex row  justify-content-center align-items-center chatCardSectionDesign ">
                                    <div className="d-flex row justify-content-center align-items-center chatCardDesign" >
                                        <div className="d-flex col justify-content-center align-items-center" onClick={() => manageChatDetail(chats)}>
                                            <div className={chats.author_id === rdxUser?.credentials?.profileDetail?.id ? ("d-flex col-3 justify-content-center align-items-center") : ("d-flex col-6 justify-content-center align-items-center")}>{chats.name}</div>
                                            <div className={chats.author_id === rdxUser?.credentials?.profileDetail?.id ? ("d-flex col-3 justify-content-center align-items-center") : ("d-flex col-6 justify-content-center align-items-center")}>{chats.author_id}</div>
                                            <div className={chats.author_id === rdxUser?.credentials?.profileDetail?.id ? ("d-flex col-3 justify-content-center align-items-center") : ("d-none")}><button onClick={() => deleteChat(chats.id)}><i className="bi bi-trash"></i></button></div>
                                            <div className={chats.author_id === rdxUser?.credentials?.profileDetail?.id ? ("d-flex col-3 justify-content-center align-items-center") : ("d-none")}><button data-bs-toggle="modal" data-bs-target="#updateChatModal" onClick={() => AddInfoToForm(chats)}><i className="bi bi-pencil"></i></button></div>

                                        </div>
                                    </div>
                                </div>

                            </>);

                    })}</>)
                    : (<><p>Aun no tienes chats</p></>)
                }



                <div className="d-flex row z-1 justify-content-end  position-absolute  align-items-center ">
                    <button data-bs-toggle="modal" data-bs-target="#newChatModal" className="d-flex  row z-1 justify-content-start  position-absolute  align-items-center addButtonDesign"><i className="bi bi-plus-square"></i></button>
                </div>



            </div>
        </>
    )
}