import { useSelector } from "react-redux";
import "./ChatDetail.css"
import { chatDetailData } from "../../app/slices/chatDetailSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userData } from "../../app/slices/userSlice";
import { useState } from "react";
import { bringMessagesService } from "../../services/chatApiCalls";

export const ChatDetail = () => {
    const detailRdx = useSelector(chatDetailData);
    const navigate = useNavigate();
    const rdxUser = useSelector(userData)
    const [message, setMessage] = useState([]);


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


    return (
        <>
            <div className="d-flex row justify-content-center align-items-center ChatDetailSectionDesign">
                <div className="d-flex row-1 sticky-top justify-content-start align-items-center navBarChatDetailDesign">
                    <p>{detailRdx?.chats?.name}</p>
                </div>
                <div className="d-flex row-10 justify-content-center align-items-center messageSectionDesign">

                    <div className="d-flex row m-0 justify-content-end align-items-center">

                        {message.length > 0
                            ? (<>{message.map(
                                messages => {
                                    return (
                                        <>

                                            <div className="d-flex row my-2 justify-content-end align-items-center messageCardDesign ">
                                                <div className="d-flex row-2 justify-content-end align-items-center">
                                                    Autor
                                                </div>
                                                <div className="d-flex row-10 justify-content-end align-items-center">
                                                    {messages.content}
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
                            <textarea className="textAreaDesign" name="" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div className="d-flex col-1 justify-content-end align-items-center">
                            <button><i className="bi bi-send-fill"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}