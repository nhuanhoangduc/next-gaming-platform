import dateFormatDistanceToNow from 'date-fns/formatDistanceToNow'

const RoomItem = ({ room }) => {
    const creatorUser = room?.userDetail?.[room?.ownerUserId]

    if (!room) return null

    return (
        <a className="panel-block" style={{ justifyContent: 'space-between' }}>
            {/* Creator */}
            <div className="flex items-center">
                {/* Avatar */}
                <img
                    style={{ borderRadius: '50%' }}
                    src={creatorUser?.avatar}
                    alt={creatorUser?.name}
                    width={40}
                    height={40}
                />

                {/* Name */}
                <p className="ml-3 text-md">{creatorUser?.name}</p>
            </div>

            {/* Date */}
            <p className="text-sm italic has-text-dark">
                {dateFormatDistanceToNow(room?.createdAt ? new Date(room.createdAt) : new Date(), {
                    includeSeconds: true,
                })}
            </p>
        </a>
    )
}

export default RoomItem
