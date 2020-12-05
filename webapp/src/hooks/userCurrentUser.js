import { useSelector } from 'react-redux'

import { user_currentUserSelector } from '@webapp/store/user/selectors'

export default () => {
    const currentUser = useSelector(user_currentUserSelector)
    return currentUser
}
