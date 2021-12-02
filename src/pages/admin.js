// Step 1: Import React
import * as React from 'react'
import Login from "../components/login"
// Step 2: Define your component
const AdminPage = () => {
  return (
    <main>
      <title>Admin</title>
      <h1>Welcome Admin</h1>
      <Login path="/app/login" />
    </main>
  )
}
// Step 3: Export your component
export default AdminPage