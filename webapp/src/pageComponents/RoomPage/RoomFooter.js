const RoomFooter = ({ room }) => {
    const ownerUser = room?.userDetail?.[room?.ownerUserId]
    const parnerUser = room?.userDetail?.[room?.parnerUserId]

    return (
        <div
            style={{
                position: 'absolute',
                bottom: 0,
                width: '100vw',
                borderTop: '1px solid black',
                backgroundColor: 'white',
            }}
        >
            <div className="container">
                <div className="flex items-center" style={{ height: 50 }}>
                    {/* Owner */}
                    <div className="flex-1 flex items-center">
                        {/* Avatar */}
                        <img
                            src={ownerUser?.avatar}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                            }}
                        />

                        {/* Infor */}
                        <div>
                            <p className="ml-1 is-size-6">{ownerUser?.name}</p>
                        </div>
                    </div>

                    {/* New match button */}
                    <button className="button is-success is-small">New match</button>

                    {/* Parner */}
                    <div className="flex-1 flex items-center justify-end">
                        {parnerUser && (
                            <>
                                {/* Infor */}
                                <div>
                                    <p className="is-size-6">{parnerUser?.name}</p>
                                </div>

                                {/* Avatar */}
                                <img
                                    src={parnerUser?.avatar}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: '50%',
                                    }}
                                    className="ml-1"
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomFooter
