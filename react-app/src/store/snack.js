const GET_ALL_SNACKS = 'snacks/getallsnacks'
const CREATE_A_SNACK = 'snacks/createasnack'
const EDIT_A_SNACK = 'snacks/editasnack'
const DELETE_A_SNACK = 'snacks/deleteasnack'

const getAllSnacks = snacks => {
    return {
        type: GET_ALL_SNACKS,
        snacks
    }
}

const createASnack = snack => {
    return {
        type: CREATE_A_SNACK,
        snack
    }
}

const editASnack = snack => {
    return {
        type: EDIT_A_SNACK,
        snack
    }
}

const deleteASnack = id => {
    return {
        type: DELETE_A_SNACK,
        id
    }
}

export const getAllSnacksThunk = () => async dispatch => {
    const res = await fetch('/api/snacks');

    if (res.ok) {
        const snacks = await res.json();
        dispatch(getAllSnacks(snacks))
        return snacks;
    }
}

export const createASnackThunk = (snack, id) => async dispatch => {
    try {
        const res = await fetch(`/api/stores/${id}/snacks`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(snack)
        });

        if (res.ok) {
            const newSnack = await res.json();
            dispatch(createASnack(newSnack));
            return newSnack
        }

    } catch (error) {
        throw error
    }
}

export const editASnackThunk = (snack, id) => async dispatch => {
    try {
        const res = await fetch(`/api/snacks/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(snack)
        });
        if (res.ok) {
            const editedSnack = await res.json();
            dispatch(editASnack(editedSnack));
            return editedSnack
        }
    } catch (error) {
        throw error
    }
}

export const deleteASnackThunk = id => async dispatch => {
    const res = await fetch(`/api/snacks/${id}`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(deleteASnack(id))
    }
}

const snacks = (state = { allSnacks: {} }, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_SNACKS:
            console.log(action.snacks)
            newState = { ...state }
            action.snacks.snacks.forEach(snack => {
                newState.allSnacks[snack.id] = snack;
            })
            return newState

        case EDIT_A_SNACK:
            newState = { ...state }
            return newState

        case CREATE_A_SNACK:
            newState = { ...state }
            return newState

        case DELETE_A_SNACK:
            newState = { ...state }
            delete newState.allSnacks[action.id]
            return newState

        default:
            return state;
    }
}

export default snacks
