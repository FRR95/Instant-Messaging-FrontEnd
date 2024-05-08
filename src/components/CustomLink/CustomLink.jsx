import "./CustomLink.css"
import { useLocation, useNavigate } from "react-router-dom"

export const CustomLink = ({path,auxiliartitle, title,icon,className}) => {

    const navigate = useNavigate()
    const location = useLocation()
   

    return (
        <div 
        
        className={className}
        onClick={()=>navigate(path)}>
            <div className="d-flex row justify-content-center align-items-center"></div>
            <i className={icon}></i>
            <p>{title}</p>
            <p>{auxiliartitle}</p>
            </div>
    )
}