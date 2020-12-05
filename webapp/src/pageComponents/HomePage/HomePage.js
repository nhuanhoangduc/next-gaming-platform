import FacebookLogin from 'react-facebook-login'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from 'react-redux'

import userDb from '@webapp/database/userDb'
import { user_SET_CURRENT_USER } from '@webapp/store/user/actions'

export default function Home() {
    const dispatch = useDispatch()

    const handleLoginSuccess = async (user) => {
        const result = await userDb.find({
            selector: {
                type: 'facebook',
                email: user.email,
            },
            limit: 1,
        })

        let currentUser = result?.docs[0]

        if (!currentUser) {
            // Create new
            const currentDate = new Date().toISOString()
            const newUser = {
                _id: uuidv4(),
                type: 'facebook',
                facebookId: user.id,
                name: user.name,
                email: user.email,
                avatar: user.picture?.data?.url,
                lastOnline: currentDate,
                createdAt: currentDate,
            }

            // Save db
            await userDb.put(newUser)
            currentUser = newUser
        } else {
            // Update current user
            currentUser.name = user.name
            currentUser.avatar = user.picture?.data?.url
            currentUser.lastOnline = new Date().toISOString()

            // Save db
            await userDb.put(currentUser)
        }

        // Update redux
        dispatch(user_SET_CURRENT_USER(currentUser))
    }

    return (
        <div style={{ width: '100vw', height: '100vh' }} className="flex flex-col justify-center items-center">
            <h1 className="is-size-1">Caro multiplayer platform</h1>

            {/* Facebook login button */}
            <div className="mt-5">
                <FacebookLogin
                    appId="481571842813925"
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={handleLoginSuccess}
                />
            </div>
        </div>
    )
}
