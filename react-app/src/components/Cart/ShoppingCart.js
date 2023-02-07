import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getAllSnacksThunk, deleteASnackThunk } from "../../store/snack";
import { deleteStoreThunk, createStoreThunk } from "../../store/store";
import trash from '../../assets/trash.svg'
import './ShoppingCart.css'
import { Link } from "react-router-dom";

export default function ShoppingCart() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false)
    const [yourSnacks, setYourSnacks] = useState([])


    const snacks = useSelector(state => state.snacks.allSnacks)
    const currentUser = useSelector(state => state.session.user)

    let total = 0;

    useEffect(async () => {
        await dispatch(getAllSnacksThunk())
        setLoaded(true)
        setYourSnacks(Object.values(snacks).filter(snack => snack.store.user_id === currentUser.id))
    }, [dispatch, snacks, createStoreThunk])


    const imageOnErrorHandler = (event) => {
        event.currentTarget.src = 'https://www.arirangusa.net/wp-content/uploads/2020/09/LUCKY-BOX-RANDOM-21PACKS-M.jpg';
    };


    // const handleCheckout = (e) => {
    //     e.preventDefault()
    //     let deletedStore = dispatch(deleteStoreThunk(currentUser.id))

    //     if (deletedStore) {
    //         window.alert("Thank you!")
    //     }
    // }

    // const handleReCreate = (e) => {
    //     e.preventDefault()
    //     const store = {
    //         name: 'cart',
    //         description: 'descript',
    //         header: 'header'
    //     }

    //     dispatch(createStoreThunk(store))
    // }


    return (
        <>
            <div className="cart-header-container">
                <div className="cart-title">Cart</div>
            </div>
            <div className="cart-container">
                {Object.values(yourSnacks).map(snack => (
                    <>
                        <div className="checkout-item-container">
                            <div className="snack-checout-box-wrapper">

                                <div id="checkout-name-desc">
                                    <img id="snack-checkout-img" src={snack.img} onError={imageOnErrorHandler} />

                                    <div className="name-desc-wrapper">
                                        <div className="snack-checkout-name" key={snack.name}>
                                            {snack.name}
                                        </div>

                                        <div className="snack-checkout-desc" key={snack.description}>
                                            {snack.description}
                                        </div>
                                    </div>
                                </div>

                                <div className="checkout-price-del">
                                    <div className="justify-trash">
                                        <div className="trash-color"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                let deletedItem = dispatch(deleteASnackThunk(snack.id))
                                                if (deletedItem) {
                                                    window.alert("Snack Removed")
                                                    window.location.reload(false)
                                                }
                                            }}
                                        >
                                            <img className="checkout-delete" src={trash} />
                                        </div>
                                    </div>
                                    <div className="checkout-price" key={snack.price}>
                                        ${snack.price}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </>
                ))}

                {/* For each snack we take the price and add to the total*/}
                {Object.values(yourSnacks).forEach(snack => total += snack.price)}
                <div className="total-checkout">
                    <div className="total-price">Subtotal: ${total}</div>
                </div>

                <div className="checkout-button-wrapper">
                    <Link id="no-style-link" to="/orderplaced">
                        <div className="checkout-button" onClick={(e) => {
                            e.preventDefault()
                            let deletedStore = dispatch(deleteStoreThunk(currentUser.id))

                            if (deletedStore) {
                                window.alert("Thank you!")
                                window.location.replace("/orderplaced")
                            }
                        }}>
                            Checkout
                        </div>
                    </Link>
                </div>

            </div>
        </>
    )
}
