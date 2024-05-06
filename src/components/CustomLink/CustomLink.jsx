import "./CustomLink.css"
import { useNavigate } from "react-router-dom"

export const CustomLink = ({path,auxiliartitle, title,icon}) => {

    const navigate = useNavigate()

    return (
        <div className="clink-design" onClick={()=>navigate(path)}>
            <div className="d-flex row justify-content-center align-items-center"></div>
            <i className={icon}></i>
            <p>{title}</p>
            <p>{auxiliartitle}</p>
            </div>
    )
}