import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllSnacksThunk } from "../../store/snack";
import './SnackPage.css'

export default function SnackPage() {
    const dispatch = useDispatch();
    const snacks = useSelector(state => state.snacks.allSnacks);
    const [loaded, setLoaded] = useState(false);
    const [storeSnacks, setStoreSnacks] = useState([])

    useEffect(async () => {
        await dispatch(getAllSnacksThunk())
        setLoaded(true)
        setStoreSnacks(Object.values(snacks).filter(snack => snack.store.user_id === 1))
    }, [dispatch])

    const imageOnErrorHandler = (event) => {
        event.currentTarget.src = 'https://www.arirangusa.net/wp-content/uploads/2020/09/LUCKY-BOX-RANDOM-21PACKS-M.jpg';
    };

    return loaded && (
        <>
            {/* {console.log('a', Object.values(snacks)[0].store.user_id)} */}

            {Object.values(storeSnacks).map(e => (
                <>
                    <Link to={`/snacks/${e.id}`}>
                        <div className="snack-box-wrapper">
                            <img id="snack-image" src={e.img} onError={imageOnErrorHandler} />

                            <div className="snackBox-text" key={e.name}>
                                {e.name}
                            </div>
                            <div className="snackBox-text" key={e.price}>
                                ${e.price}
                            </div>

                        </div>
                    </Link>
                </>
            ))}
        </>
    )
}
