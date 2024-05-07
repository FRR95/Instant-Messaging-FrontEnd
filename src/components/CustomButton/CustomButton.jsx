import "./CustomButton.css"
export const CustomButton = ({ onClick, design, title,icon,modal,modalTarget }) => {
    return (
        <button data-bs-dismiss={modal} data-bs-toggle={modal} data-bs-target={modalTarget} className={design} onClick={onClick}>
           <i className={icon}></i> {title}
        </button>
    )
}