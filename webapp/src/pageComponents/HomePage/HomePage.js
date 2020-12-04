import Link from 'next/link'

export default function Home() {
    return (
        <div>
            index page
            <Link href="/rooms" shallow={true}>
                Go rooms page
            </Link>
        </div>
    )
}
