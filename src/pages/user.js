// Step 1: Import React
import * as React from 'react'
import database from "../components/firebase";
// Step 2: Define your component

//calling database.ref will list all polls
//lab3-doodle-poll-default-rtdb


var data = [{}];

const tempvar = database.ref("polls/");
tempvar.on('value', (snapshot) => {
  snapshot.forEach( (pull) => {
    console.log(pull.val());
  })
  
  //console.log(temp3);
})

const UserPage = () => {
  return (
    <main>
      <title>About me</title>
      <h1>View available polls</h1>
      <p>Hi there! I'm the proud creator of this site, which I built with Gatsby.</p>
    </main>
  )
}
// Step 3: Export your component
export default UserPage

