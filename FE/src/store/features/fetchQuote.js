import axios from "../../config/instance"
import { createSlice } from '@reduxjs/toolkit'

const quoteSlices = createSlice({
    name: 'movies',
    initialState: {
        data: {},
    },
    reducers: {
        setQuote: (state, action) => {
            state.data = action.payload
        }
    }
})

export const fetchQuote = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "get",
                url: `/randomQuote`
            })

            dispatch(setQuote(data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const { setQuote } = quoteSlices.actions

export default quoteSlices.reducer