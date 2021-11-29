import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
import Poll from "../components/poll"
import EditPoll from "../components/editPoll"
import CreatePoll from "../components/createPoll"
import Login from "../components/login"

const App = () => (
  <Layout>
    <Router>
      <Login path="/app/login" />
      <PrivateRoute path="/app/poll" component={Poll} />
      <PrivateRoute path="/app/create-poll" component={CreatePoll} />
      <PrivateRoute path="/app/edit-poll" component={EditPoll} />
    </Router>
  </Layout>
)

export default App