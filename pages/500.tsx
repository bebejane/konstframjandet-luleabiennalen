import Link from 'next/link'

function FiveZeroZero() {
  return (
    <div id="error-505" className="page-error">
      <h1>500 - Server-side error occurred</h1>
      <Link prefetch={false} href="/">
        Go back home
      </Link>
    </div>
  )
}

FiveZeroZero.errorCode = 500

export default FiveZeroZero