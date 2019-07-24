import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'

const Search = () => {
    const githubContext = useContext(GithubContext)
    const alertContext = useContext(AlertContext)
    const { searchUsers, users, clearUsers } = githubContext
    const { setAlert } = alertContext
    const [text, setText] = useState('')

    const onSubmit = e => {
        e.preventDefault()
        console.log('onSubmit clicked')
        if (text === '') {
            return setAlert('Please enter something', 'light')
        }

        searchUsers(text)
        setText('')
    }

    const onChange = e =>
        setText(e.target.value)

    return (
        <div>
            <form className='form' onSubmit={onSubmit}>
                <input type='text' name='text' placeholder='Search Users...' value={text} onChange={onChange} />
                <input type='submit' value='Search' className='btn btn-dark btn-block' />
            </form>
            {users.length > 0 && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>}
        </div>
    )
}

export default Search