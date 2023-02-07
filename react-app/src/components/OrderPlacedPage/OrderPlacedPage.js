import "../OrderPlacedPage/OrderPlacedPage.css"
import { useEffect, useState } from "react"
import { createStoreThunk } from "../../store/store"
import { useDispatch } from "react-redux"

export default function OrderPlacedPage() {
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const store = {
            name: 'cart',
            description: 'descript',
            header: 'header'
        }

        dispatch(createStoreThunk(store))
        setLoaded(true)

    }, [dispatch])

    return loaded && (
        <>
            <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>



            <div className="order-message-wrapper">

                <div className="order-message">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXCTw8nm23yrNM9dgdZtT8RPj7E4SLdRG6W8PUXXU63rJesVv9VMpJE4dTzDXN3WCVLn8&usqp=CAU"></img>

                    <div className="message1">
                        Thank you!
                    </div>
                    <div className="message2">
                        Your Order Has Been Confirmed
                    </div>
                    <div className="message3">
                        You will receive a confirmation E-mail shortly
                    </div>
                </div>
            </div>
        </>
    )
}
