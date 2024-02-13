import s from './_error.module.scss'
import Link from 'next/link'

function Error({ statusCode }) {
  return (
    <div id="error-404" className="page-error">
      <h1>{statusCode === 500 ? 'Internal server error' : '404 - Page Not Found'}</h1>
      <Link prefetch={false} href="/">
        Go back home
      </Link>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error