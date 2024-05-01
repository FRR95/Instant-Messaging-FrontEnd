import "./Header.css"

export const Header = () => {
    return (
        <>
            <div className="d-flex row sticky-bottom justify-content-center align-items-center headerDesign">
                <div className="d-flex col m-1 justify-content-center align-items-center ">

                    <i className="bi bi-chat"></i>
                </div>
                <div className="d-flex col m-1 justify-content-center align-items-center ">
                    <i className="bi bi-at"></i>
                </div>
                <div className="d-flex col m-1 justify-content-center align-items-center ">
                    <i class="bi bi-gear-fill"></i>
                </div>



            </div>
        </>
    )
}