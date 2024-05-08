import "./Chat.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/slices/userSlice";
import { createChatService, deleteChatService, getUserChatsService, updateChatService } from "../../services/chatApiCalls";
import { updateChatDetail } from "../../app/slices/chatDetailSlice";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { validation } from "../../utils/validations";
import { CustomButton } from "../../components/CustomButton/CustomButton";



export const Chat = () => {
    const rdxUser = useSelector(userData);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    

    const [loading, setLoadingSpinner] = useState(false);

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
            setLoadingSpinner(true)

            const fetched = await getUserChatsService(rdxUser.credentials.token);

            if (!fetched.success) {
               
                setLoadingSpinner(false)
            }

            setChat(fetched.data);
          

            setLoadingSpinner(false)
            
        } catch (error) {
            
        }
       
    };

    useEffect(() => {

        !rdxUser?.credentials?.token && (navigate("/"))

    }, [rdxUser]);

    useEffect(() => {
        if (chat.length ===0) {
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

            setLoadingSpinner(true)

            const fetched = await createChatService(chatCredential, rdxUser?.credentials?.token)

            if (!fetched.success) {
               
                setLoadingSpinner(false)
            }
            
            setLoadingSpinner(false)
            getUserChats()
        } catch (error) {
          

        }
    }

    const deleteChat = async (chatId) => {
        try {
            setLoadingSpinner(true)
            const fetched = await deleteChatService(chatId, rdxUser?.credentials?.token)
            if (!fetched.success) {
                
                setLoadingSpinner(false)
            }
           
            setLoadingSpinner(false)
            getUserChats()

        } catch (error) {
           
        }
    }

    const clearForm = async () => {
        setchatCredential({
            id: "",
            name: "",
        })


    }

    const updateChat = async (chatId) => {

        setLoadingSpinner(true)


        const fetched = await updateChatService(chatId, chatCredential, rdxUser.credentials.token)
        if (!fetched.success) {
            
            setLoadingSpinner(false)
        }

      
        setLoadingSpinner(false)
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

                <h1 className="my-3 fs-5">Tus chats</h1>


                {loading && <div className="spinner-grow fs-5" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}



                <div className="modal fade " id="newChatModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog ">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title fs-5" id="exampleModalLabel">Crear nuevo chat</h3>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <div className="d-flex row justify-content-center align-items-center">


                                    <CustomInput
                                        type="text"
                                        name="name"
                                        design={"input-design"}
                                        placeholder={"Nombre del nuevo grupo"}
                                        value={chatCredential.name || ""}
                                        changeEmit={inputHandler}
                                        onBlurFunction={(e) => checkError(e)}
                                    />
                                    <div className="error">{credencialesError.nameError}</div>
                                </div>
                            </div>
                            <div className="modal-footer">



                                <CustomButton

                                    icon={"bi bi-plus-square"}
                                    design={"addButtonDesignModal"}
                                    onClick={createChat}
                                    modal={"modal"}

                                />
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
                                <div className="d-flex row justify-content-center align-items-center">

                                    <CustomInput
                                        type="text"
                                        name="name"
                                        design={"input-design"}
                                        placeholder={"Nuevo nombre del grupo"}
                                        value={chatCredential.name || ""}
                                        changeEmit={inputHandler}
                                        onBlurFunction={(e) => checkError(e)}
                                    />
                                    <div className="error">{credencialesError.nameError}</div>
                                </div>
                            </div>
                            <div className="modal-footer">


                                <CustomButton
                                    icon={"bi bi-pencil"}
                                    design={"updateButtonDesign"}
                                    onClick={() => updateChat(chatCredential.id)}
                                    modal={"modal"}
                                />
                            </div>
                        </div>
                    </div>
                </div>



                {chat.length > 0  
                    ? (<>{chat.map(chats => {
                        return (
                            <>

                                <div key={chats.id} className="d-flex row  justify-content-center align-items-center chatCardSectionDesign ">
                                    <div className="d-flex row justify-content-center align-items-center chatCardDesign" >
                                        <div className="d-flex col justify-content-center align-items-center" >


                                            <div onClick={() => manageChatDetail(chats)} className={chats.author_id === rdxUser?.credentials?.profileDetail?.id ? ("d-flex col-8 fw-bold justify-content-start align-items-center") : ("d-flex fw-bold col-12 justify-content-start align-items-center")}>{chats.name}</div>
                                            <div className={chats.author_id === rdxUser?.credentials?.profileDetail?.id ? ("d-flex col-2 justify-content-center align-items-center") : ("d-none")}>

                                                <CustomButton
                                                    icon={"bi bi-trash"}
                                                    design={"deleteButtonDesign"}
                                                    onClick={() => deleteChat(chats.id)}
                                                />
                                            </div>
                                            <div className={chats.author_id === rdxUser?.credentials?.profileDetail?.id ? ("d-flex col-2 justify-content-center align-items-center") : ("d-none")}>


                                                <CustomButton
                                                    modal={"modal"}
                                                    modalTarget={"#updateChatModal"}
                                                    icon={"bi bi-pencil"}
                                                    design={"updateButtonDesign"}
                                                    onClick={() => AddInfoToForm(chats)}
                                                />
                                            </div>


                                        </div>


                                    </div>
                                </div>

                            </>);

                    })}</>)
                    : (<><p>Aun no tienes chats</p></>)
                }



                <div className="d-flex row   z-1 justify-content-end  m-1 align-items-end  ">


                    <CustomButton
                        modal={"modal"}
                        modalTarget={"#newChatModal"}
                        icon={"bi bi-plus-square"}
                        design={"  addButtonDesign"}

                    />

                </div>



            </div>
        </>
    )
}