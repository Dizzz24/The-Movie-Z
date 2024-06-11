import axios from "../../config/instance"
import { createSlice } from '@reduxjs/toolkit'

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        data: {},
        result: {},
        favorites: []
    },
    reducers: {
        setMovies: (state, action) => {
            state.data = action.payload
        },
        setGenres: (state, action) => {
            state.result = action.payload
        },
        setFavorites: (state, action) => {
            state.favorites = action.payload
        },
    }
})

export const fetchMovies = ({ search, page, genreId }) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "get",
                url: `/movies?search=${search}&page=${page}&genreId=${genreId}`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            dispatch(setMovies(data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const fetchGenres = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "get",
                url: `/movies/genres`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            dispatch(setGenres(data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const fetchFavorites = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "get",
                url: `/favorites`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            dispatch(setFavorites(data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const { setMovies, setGenres, setFavorites } = moviesSlice.actions

export default moviesSlice.reducer