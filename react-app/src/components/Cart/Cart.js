import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getCartThunk, addCartThunk, editCartThunk, deleteCartThunk } from "../../store/cart"
import { createStoreThunk, getStoreThunk, updateStoreThunk, deleteStoreThunk } from "../../store/store"
import { useSelector } from "react-redux"


export default function Cart() {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user);
    const [quantity, setQuantity] = useState(0)
    const [storeName, setStoreName] = useState('')
    const [storeDescription, setStoreDescription] = useState('')
    const [storeHeader, setStoreHeader] = useState('')
    const [storeUpdatedName, setStoreUpdatedName] = useState('')
    const [storeUpdatedDescription, setStoreUpdatedDescription] = useState('')
    const [storeUpdatedHeader, setStoreUpdatedHeader] = useState('')

    const [loaded, setLoaded] = useState(false)


    // useEffect(() => {
    // dispatch(editCartThunk(1, 1).then(async () => {
    //     const items = await dispatch(getCartThunk())
    //     const details = items.CartItems
    // }))
    // dispatch(getCartThunk())
    // }, [dispatch])

    useEffect(async () => {
        await dispatch(getStoreThunk())
        setLoaded(true)
    }, [dispatch, storeUpdatedName])

    const handleSubmit = (e) => {
        e.preventDefault()

        const store = {
            name: storeName,
            description: storeDescription,
            header: storeHeader
        }

        let createdStore = dispatch(createStoreThunk(store))

        if (createdStore) {
            setStoreName('')
            setStoreDescription('')
            setStoreHeader('')
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        const store = {
            name: storeUpdatedName,
            description: storeUpdatedDescription,
            header: storeUpdatedHeader
        }

        let updatedStore = dispatch(updateStoreThunk(store, 1))

        if (updatedStore) {
            setStoreUpdatedName('')
            setStoreUpdatedDescription('')
            setStoreUpdatedHeader('')
        }
    }

    const handleDelete = (e) => {
        e.preventDefault()
        let deletedStore = dispatch(deleteStoreThunk(1))
        if (deletedStore) window.alert("store deleted")
    }

    return loaded && (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <textarea
                        id="store"
                        type='text'
                        name='store'
                        placeholder='store name'
                        onChange={((e) => setStoreName(e.target.value))}
                        value={storeName}
                    ></textarea>
                    <textarea
                        id="description"
                        type='text'
                        name='description'
                        placeholder='description'
                        onChange={((e) => setStoreDescription(e.target.value))}
                        value={storeDescription}
                    ></textarea>
                    <textarea
                        id="header"
                        type='text'
                        name='header'
                        placeholder='header'
                        onChange={((e) => setStoreHeader(e.target.value))}
                        value={storeHeader}
                    ></textarea>
                    <button type='submit'> CREATE A STORE</button>
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
                        onChange={((e) => setStoreUpdatedName(e.target.value))}
                        value={storeUpdatedName}
                    ></textarea>
                    <textarea
                        id="description"
                        type='text'
                        name='description'
                        placeholder='description'
                        onChange={((e) => setStoreUpdatedDescription(e.target.value))}
                        value={storeUpdatedDescription}
                    ></textarea>
                    <textarea
                        id="header"
                        type='text'
                        name='header'
                        placeholder='header'
                        onChange={((e) => setStoreUpdatedHeader(e.target.value))}
                        value={storeUpdatedHeader}
                    ></textarea>
                    <button type='submit'>UPDATE A STORE</button>
                </form>
            </div>
            <br></br><br></br>
            <div>
                <button onClick={handleDelete}>DELETE STORE</button>
            </div>
        </>
    )
}
