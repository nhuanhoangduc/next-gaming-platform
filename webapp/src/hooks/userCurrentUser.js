import { useSelector } from 'react-redux'

import { user_currentUserSelector } from '@webapp/store/user/selectors'

const userCurrentUser = () => {
    const currentUser = useSelector(user_currentUserSelector)
    return currentUser
}

export default userCurrentUser
