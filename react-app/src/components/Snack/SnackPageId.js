import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllSnacksThunk } from "../../store/snack";
import './SnackPageId.css'
import { useParams } from "react-router-dom";
import { createASnackThunk } from "../../store/snack";

export default function SnackPageId() {
    const { snackId } = useParams();
    const dispatch = useDispatch();

    const snacks = useSelector(state => state.snacks.allSnacks);
    const currentUser = useSelector(state => state.session.user);
    const [loaded, setLoaded] = useState(false);
    const [snackArray, setSnackArray] = useState([])

    useEffect(async () => {
        await dispatch(getAllSnacksThunk())
        // setLoaded(true)
        // so we have a blank array. we are filtering through our snacks state using the snack id from the url (via useparams).

        setSnackArray(Object.values(snacks).filter(snack => snack.id === +snackId))
    }, [dispatch])

    const imageOnErrorHandler = (event) => {
        event.currentTarget.src = 'https://www.arirangusa.net/wp-content/uploads/2020/09/LUCKY-BOX-RANDOM-21PACKS-M.jpg';
    };

    const addToCart = async (e) => {
        e.preventDefault()
        console.log(currentUser.id)

        const snacky = {
            name: snackArray[0]?.name,
            description: snackArray[0]?.description,
            img: snackArray[0]?.img,
            price: snackArray[0]?.price
        }

        let added = await dispatch(createASnackThunk(snacky, currentUser.id))

        if (added) {
            window.alert(`${snackArray[0]?.name} added to cart!`)
        }
    }

    // const currentSnack = Object.values(snacks).filter(e => e.id === snackId)
    console.log(snackArray[0]?.name)
    // ? is opinional chaining -- if won't render the elements unless the data is fully processed.
    return (
        <>
            <div className="whitespace"></div>
            <div className="snack-page-container">
                <div className="snackpageId-wrapper">
                    <img id="snackpage-img" onError={imageOnErrorHandler} src={snackArray[0]?.img} />
                    <div className="snack-details-wrapper">
                        <div class="snack-title">{snackArray[0]?.name}</div>
                        <div className="price-title"> ${snackArray[0]?.price}</div>
                        <div className="description-title">{snackArray[0]?.description}</div>
                        <div className="add-cart-wrapper">
                        <div id="add-cart-button" onClick={addToCart}>ADD TO CART</div>
                    </div>
                    </div>

                </div>
            </div>
        </>
    )
}
