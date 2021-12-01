// Step 1: Import React
import * as React from 'react'
import database from "../components/firebase";
// Step 2: Define your component

//calling database.ref will list all polls
//lab3-doodle-poll-default-rtdb


var data = [{}];


const tempvar = database.ref("Polls");
tempvar.on('value', (snapshot) => {
  const temp3 = snapshot.val();
  data = temp3;
  console.log(data.poll5.Day);
})


//console.log("hello");
//console.log(tempvar);

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

