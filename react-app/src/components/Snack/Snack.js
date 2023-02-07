import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getAllSnacksThunk, createASnackThunk, deleteASnackThunk, editASnackThunk } from "../../store/snack"
import { useSelector } from "react-redux"

export default function Snack() {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user);
    // const userStore = useSelector(state => state.stores.userStore.stores[0].id);
    const [snackName, setSnackName] = useState('')
    const [snackDescription, setSnackDescription] = useState('')
    const [snackImg, setSnackImg] = useState('')
    const [snackPrice, setSnackPrice] = useState(0)
    const [snackUpdatedName, setSnackUpdatedName] = useState('')
    const [snackUpdatedDescription, setSnackUpdatedDescription] = useState('')
    const [snackUpdatedImg, setSnackUpdatedImg] = useState('')
    const [snackUpdatedPrice, setSnackUpdatedPrice] = useState(0)
    const [loaded, setLoaded] = useState(false)

    useEffect(async () => {
        await dispatch(getAllSnacksThunk())
        setLoaded(true)
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()

        const snack = {
            name: snackName,
            description: snackDescription,
            img: snackImg,
            price: snackPrice
        }

        let createdSnack = dispatch(createASnackThunk(snack, currentUser.id))

        if (createdSnack) {
            setSnackName('')
            setSnackDescription('')
            setSnackImg('')
            setSnackPrice('')
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        const snack = {
            name: snackUpdatedName,
            description: snackUpdatedDescription,
            img: snackUpdatedImg,
            price: snackUpdatedPrice
        }

        let updatedSnack = dispatch(editASnackThunk(snack, 1))

        if (updatedSnack) {
            setSnackUpdatedName('')
            setSnackUpdatedDescription('')
            setSnackUpdatedPrice('')
            setSnackUpdatedImg('')
        }
    }

    const handleDelete = (e) => {
        e.preventDefault()
        let deletedStore = dispatch(deleteASnackThunk(4))
        if (deletedStore) window.alert("snack deleted")
    }

    return loaded && (
        <>
            <div>

                <form onSubmit={handleSubmit}>
                    <textarea
                        id="snack"
                        type='text'
                        name='snack'
                        placeholder='snack name'
                        onChange={((e) => setSnackName(e.target.value))}
                        value={snackName}
                    ></textarea>
                    <textarea
                        id="description"
                        type='text'
                        name='description'
                        placeholder='description'
                        onChange={((e) => setSnackDescription(e.target.value))}
                        value={snackDescription}
                    ></textarea>
                    <textarea
                        id="img"
                        type='text'
                        name='img'
                        placeholder='img'
                        onChange={((e) => setSnackImg(e.target.value))}
                        value={snackImg}
                    ></textarea>
                    <textarea
                        id="price"
                        type='number'
                        name='price'
                        placeholder='price'
                        onChange={((e) => setSnackPrice(e.target.value))}
                        value={snackPrice}
                    ></textarea>
                    <button type='submit'>CREATE A SNACK</button>
                </form>
            </div>
            <br></br><br></br>

            <div>
                <form onSubmit={handleUpdate}>
                    <textarea
                        id="store"
                        type='text'
                        name='store'
                        placeholder='store name'
                        onChange={((e) => setSnackUpdatedName(e.target.value))}
                        value={snackUpdatedName}
                    ></textarea>
                    <textarea
                        id="description"
                        type='text'
                        name='description'
                        placeholder='description'
                        onChange={((e) => setSnackUpdatedDescription(e.target.value))}
                        value={snackUpdatedDescription}
                    ></textarea>
                    <textarea
                        id="img"
                        type='text'
                        name='img'
                        placeholder='img'
                        onChange={((e) => setSnackUpdatedImg(e.target.value))}
                        value={snackUpdatedImg}
                    ></textarea>
                    <textarea
                        id="price"
                        type='number'
                        name='price'
                        placeholder='price'
                        onChange={((e) => setSnackUpdatedPrice(e.target.value))}
                        value={snackUpdatedPrice}
                    ></textarea>
                    <button type='submit'>UPDATE A SNACK</button>
                </form>
            </div>
            <br></br><br></br>
            <div>
                <button onClick={handleDelete}>DELETE SNACK</button>
            </div>
        </>
    )
}
