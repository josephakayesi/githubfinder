import React, { useReducer } from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS } from '../types'

let githubClientId
let githubClientSecret

if(process.env.NODE_ENV !== 'production'){
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
}
else {
    githubClientId = process.env.GITHUB_CLIENT_ID
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET
}

const auth = `client_id=${githubClientId}&client_secret=${githubClientSecret}`

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)

    // Search GitHub users
    const searchUsers = text => {
        setLoading()
        axios.get(`https://api.github.com/search/users?q=${text}&${auth}`)
            .then(res => dispatch({ type: SEARCH_USERS, payload: res.data.items }))
            .catch(err => console.log(err))
    }

    // Get a single GitHub user
    const getUser = username => {
        setLoading()
        axios.get(`https://api.github.com/users/${username}?${auth}`)
            .then(res => dispatch({ type: GET_USER, payload: res.data }))
            .catch(err => console.log(err))
    }

    // Get user's repos
    const getUserRepos = username => {
        setLoading()
        axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&${auth}`)
            .then(res => dispatch({ type: GET_REPOS, payload: res.data }))
            .catch(err => console.log(err))
    }

    // Clear users from state
    const clearUsers = () =>
        dispatch({ type: CLEAR_USERS })

    // Set loading
    const setLoading = () => dispatch({ type: SET_LOADING })

    return (
        <GithubContext.Provider value={{ searchUsers, clearUsers, getUser, getUserRepos, ...state }}>
            {props.children}
        </GithubContext.Provider>
    )
}

export default GithubState