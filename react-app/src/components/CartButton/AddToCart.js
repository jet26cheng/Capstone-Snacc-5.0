import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getCartThunk, addCartThunk, editCartThunk, deleteCartThunk } from "../../store/cart"

export default function AddToCartButton () {
    const dispatch = useDispatch()


    useEffect(async () => {
        await dispatch(getCartThunk())
        setLoaded(true)
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()

        const cart = {
            name: storeName,
            quantity: itemQuantity,
            header: storeHeader
        }

        let createdCart = dispatch(createCartThunk(cart))

        if (createdCart) {
            setStoreName('')
            setStoreDescription('')
            setStoreHeader('')
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault()


    }

}
