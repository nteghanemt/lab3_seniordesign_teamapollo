// Step 1: Import React
import { graphql } from 'gatsby'
import * as React from 'react'
// Step 2: Define your component
const UserPage = ({data}) => {
  return (
    <main>
      <title>About me</title>
      <h1>View available polls</h1>
      <p>Hi there! I'm the proud creator of this site, which I built with Gatsby.</p>
      <table>
      <tr><td>Name</td><td>Day</td></tr>
      {data.allPolls.edges.map(({ node, index}) => (
        <tr>
          <td>
            {node.name}
          </td>
          <td>
            {node.day}
          </td>
        </tr>
      ))}
      </table>
    </main>
  )
}
// Step 3: Export your component
export default UserPage

export const query = graphql`
  {
    allPolls {
      edges {
        node {
          day
          endtime
          location
          name
          notes
          starttime
          blocks
        }
      }
    }
  }
`
