import * as React from 'react'
import { Link } from 'gatsby'
const IndexPage = () => {
  return (
    <main>
      <title>Home Page</title>
      <h1>Welcome!</h1>
      <Link to="/admin">Admin</Link>
      <br/>
      <Link to="/user">User</Link>
    </main>
  )
}
export default IndexPage
