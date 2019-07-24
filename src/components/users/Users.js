import React, { useContext } from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner/Spinner'
import GithubContext from '../../context/github/githubContext'

const Users =  () => {
    const githubContext = useContext(GithubContext)
    const {loading, users} = githubContext

    return loading ? <Spinner /> : (
        <div style={userStyle}>
            {users.map(user => (
                <UserItem key={user.id} user={user} />
            ))}
        </div>
    )
}

const userStyle = {
    gridTemplateColumns: 'repeat(3, 1fr)',
    display: 'grid',
    gridGap: '1rem'
}

export default Users
