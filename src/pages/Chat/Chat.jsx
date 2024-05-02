import "./Chat.css"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/slices/userSlice";
import { getUserChatsService } from "../../services/chatApiCalls";


export const Chat = () => {
    const rdxUser = useSelector(userData);
    const navigate = useNavigate()

    const [chat, setChat] = useState([]);


    const getUserChats = async () => {
        try {

            const fetched = await getUserChatsService(rdxUser.credentials.token);

            if (!fetched.success) {
                console.log(fetched.message)
            }

            setChat(fetched.data);
            console.log(fetched.data);



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


    return (
        <>
            <div className="d-flex row justify-content-center align-items-center  chatDesign">

                {chat.length > 0
                    ? (<>{chat.map(chats => {
                        return (
                            <>
                                <div className="d-flex row justify-content-center align-items-center">
                                    <div className="d-flex col justify-content-center align-items-center">
                                        <div className="d-flex col-8 justify-content-center align-items-center">{chats.name}</div>
                                        <div className="d-flex col-2 justify-content-center align-items-center">{chats.author_id}</div>
                                        <div className="d-flex col-2 justify-content-center align-items-center">{chats.created_at}</div>
                                    </div>
                                </div>

                            </>);

                    })}</>)
                    : (<><p>Aun no tienes chats</p></>)
                }
            </div>
        </>
    )
}