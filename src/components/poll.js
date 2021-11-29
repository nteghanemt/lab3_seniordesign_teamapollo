import * as React from 'react'
import { Link } from 'gatsby'
const PollPage = () => {
  return (
    <main>
      <title>Home Page</title>
      <h1>Welcome!</h1>
      <Link to="/app/create-poll">Create new poll</Link>
      <br/>
      <Link to="/app/edit-poll">Edit poll</Link>
    </main>
  )
}
export default PollPage