export default () => {
    return (
        <a class="panel-block" style={{ justifyContent: 'space-between' }}>
            {/* Creator */}
            <div className="flex items-center">
                {/* Avatar */}
                <img
                    style={{ borderRadius: '50%' }}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYy0aPzeWbS_jqj8QHdRvri2F4ZuFsDVTp7Q&usqp=CAU"
                    alt="Picture of the author"
                    width={40}
                    height={40}
                />

                {/* Name */}
                <p className="ml-3 text-md">Hoang Duc Nhuan</p>
            </div>

            {/* Date */}
            <p className="text-sm italic has-text-dark">10 mins ago</p>
        </a>
    )
}
