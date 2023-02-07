const CREATE_A_STORE = 'stores/createastore'
const GET_STORE = 'stores/getstore'
const UPDATE_STORE = 'stores/updatestore'
const DELETE_STORE = 'stores/deletestore'

const createStore = store => {
    return {
        type: CREATE_A_STORE,
        store
    }
}

const getStore = store => {
    return {
        type: GET_STORE,
        store
    }
}

const updateStore = store => {
    return {
        type: UPDATE_STORE,
        store
    }
}

const deleteStore = id => {
    return {
        type: DELETE_STORE,
        id
    }
}

export const createStoreThunk = store => async dispatch => {
    const res = await fetch(`/api/stores/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(store)
    })

    if (res.ok) {
        const store = await res.json()
        dispatch(createStore(store))
        return store
    } else {
        const er = await res.json()
        console.log(er.errors)
        return er.errors
    }
}

export const getStoreThunk = () => async dispatch => {
    const res = await fetch('/api/stores/')

    if (res.ok) {
        const storeData = await res.json()
        dispatch(getStore(storeData))
        return storeData
    }

    return;
}

export const updateStoreThunk = (store, id) => async dispatch => {
    const res = await fetch(`/api/stores/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(store)
    })

    if (res.ok) {
        console.log('res hits okay')
        const store = await res.json()
        dispatch(updateStore(store))
        return store
    } else {
        console.log('res doesnt hit')
        const er = await res.json()
        console.log(er.errors)
        return er.errors
    }
    return;
}

export const deleteStoreThunk = (id) => async dispatch => {
    const res = await fetch(`/api/stores/${id}`, {
        method: "DELETE"
    })

    if (res.ok) {
        const deleted = await res.json();
        dispatch(deleteStore(deleted));
        return
    }
    return;
}

export default function stores(state = {}, action) {
    let newState;
    switch (action.type) {
        case CREATE_A_STORE:
            newState = { ...state }
            newState.userStore = action.store
            return newState
        case GET_STORE:
            newState = { ...state }
            newState.userStore = action.store
            return newState
        case UPDATE_STORE:
            newState = { ...state }
            return newState
        case DELETE_STORE:
            newState = { ...state }
            delete newState.userStore
            return newState
        default:
            return state;
    }
}
