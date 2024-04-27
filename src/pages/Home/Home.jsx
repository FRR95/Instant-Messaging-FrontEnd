import "./Home.css"

export const Home = () => {
    return (
        <>
            <div className="d-flex col-11 justify-content-center align-items-center homeSectionDesign">
                <div className="d-flex col justify-content-center align-items-center">
                    <div className="d-flex col-2 justify-content-center align-items-center headerHomeDesign">
                        Esto es el header de home
                    </div>
                    <div className="d-flex col-10 justify-content-center align-items-center homeDesign">

                        <div className="d-flex row justify-content-center m-0 align-items-center ">

                            <div className="d-flex z-1 row  justify-content-center m-0 align-items-center sticky-top w-100 homeNavbarDesign">
                                Esto es el navbar del home
                            </div>
                            <div className="d-flex row z-0 justify-content-center  align-items-center  w-100 contentHomeDesign">
                                <div className="messageDesign w-45">
                                    <img className="card-img-top" src="..." alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" className="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>

                                <div className="messageDesign w-45">
                                    <img className="card-img-top" src="..." alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" className="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>

                                <div className="messageDesign w-45">
                                    <img className="card-img-top" src="..." alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" className="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>

                                <div className="messageDesign w-45">
                                    <img className="card-img-top" src="..." alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" className="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>

                                <div className="messageDesign w-45">
                                    <img className="card-img-top" src="..." alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" className="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                                <div className="messageDesign w-45">
                                    <img className="card-img-top" src="..." alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" className="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>


                            </div>

                            <div className="d-flex row z-1 justify-content-center  align-items-center sticky-bottom w-100 inputMessageSection ">
                                <textarea className="textAreaDesign" name="" id="" cols="30" rows="10"></textarea>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}