import "./Header.css"

export const Header = () => {
    return (
        <>
            <div className="d-flex col-1 justify-content-center align-items-start headerDesign">
                <div className="d-flex row m-1 justify-content-center align-items-center itemsContentHeader">
                    <div className="d-flex row m-1 justify-content-center align-items-start">
                        <i className="bi bi-chat"></i>
                        <i className="bi bi-at"></i>
                    </div>
                    <div className="d-flex row m-1 justify-content-center align-items-end">
                        <i class="bi bi-gear-fill"></i>

                    </div>
                </div>
            </div>
        </>
    )
}