import "./NavBar.css";

export const NavBar = () => {
    return (
        <>
            <div className="d-flex row sticky-top justify-content-center align-items-center navBarDesign">

                <div className="d-flex col justify-content-center align-items-center">

                    <div className="d-flex appTitle col-2 justify-content-center align-items-center">
                        
                    <img src="https://cdn-icons-png.flaticon.com/512/4564/4564089.png" height={"30em"} width={"30em"} alt="" />
                    </div>
                    <div className="d-flex appTitle col-4 justify-content-start align-items-center">
                        
                        LETS APP!
                    </div>

                    <div className="d-flex col-6 justify-content-center align-items-center">


                    </div>
                </div>
            </div>
        </>
    )
}