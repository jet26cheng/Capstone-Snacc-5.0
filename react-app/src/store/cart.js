const GET_CART = "carts/GET_CART"

const ADD_CART_ITEM = "carts/ADD_CART_ITEM"

const EDIT_CART_ITEM = "carts/EDIT_CART_ITEM"

const DELETE_CART_ITEM = "carts/DELETE_CART_ITEM"

const getCart = item => ({
    type: GET_CART,
    item
})

const addCartItem = item => ({
    tyoe: ADD_CART_ITEM,
    item
})

const editCartItem = (id, quantity) => ({
    type: EDIT_CART_ITEM,
    id,
    quantity
})

const deleteCartItem = id => ({
    tyoe: DELETE_CART_ITEM,
    id
})

export const getCartThunk = () => async dispatch => {
    const res = await fetch("/api/carts")
    console.log('get cart thunk')
    if (res.ok) {
        const cart = await res.json()
        dispatch(getCart(cart))
        return cart
    } else {
        const er = await res.json()
        console.log(er.errors)
        return er.errors
    }
}

export const addCartItemThunk = (id, quantity) => async dispatch => {
    const res = await fetch(`/api/snacks/${id}/cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "quantity": quantity })
    })

    if (res.ok) {
        const cart = await res.json()
        dispatch(addCartItem(cart))
        return cart
    } else {
        const er = await res.json()
        console.log(er.errors)
        return er.errors
    }
}

export const editCartItemThunk = (id, quantity) => async dispatch => {
    const res = await fetch(`/api/carts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "quantity": quantity })
    })

    if (res.ok) {
        const cart = await res.json()
        dispatch(editCartItem(id, quantity))
        return cart
    } else {
        const er = await res.json()
        console.log(er.errors)
        return er.errors
    }
}

export const deleteCartItemThunk = id => async dispatch => {
    const res = await fetch(`/api/carts/${id}`, {
        method: "DELETE"
    })

    if (res.ok) {
        const cart = await res.json()
        dispatch(deleteCartItem(id))
        return cart
    } else {
        const er = await res.json()
        console.log(er.errors)
        return er.errors
    }
}



export default function cartReducer(state = {}, action) {
    switch (action.type) {
        // for each item in the cart we are spreading it into a new state object
        case GET_CART: {
            const newState = {}
            action.item.CartItems.forEach(item => {
                newState[item.id] = item
            })
            return newState
        }

        case ADD_CART_ITEM: {
            const newState = { ...state }
            newState[action.item.id] = action.item
            return newState
        }

        case EDIT_CART_ITEM: {
            const newState = { ...state }
            newState[action.id].quantity = action.quantity
            return newState
        }

        case DELETE_CART_ITEM: {
            const newState = { ...state }
            delete newState[action.id]
            return newState
        }

        default:
            return state
    }
}
