import FacebookLogin from 'react-facebook-login'
import { v4 as uuidv4 } from 'uuid'

import userDb from '@webapp/database/userDb'

export default function Home() {
    const handleLoginSuccess = async (user) => {
        const result = await userDb.find({
            selector: {
                type: 'facebook',
                email: user.email,
            },
            limit: 1,
        })

        let existedUser = result?.docs[0]

        if (!existedUser) {
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
            existedUser = await userDb.put(newUser)
        } else {
            // Update current user
            existedUser.name = user.name
            existedUser.avatar = user.picture?.data?.url
            existedUser.lastOnline = new Date().toISOString()

            // Save db
            await userDb.put(existedUser)
        }
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
