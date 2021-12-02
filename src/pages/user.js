// Step 1: Import React
import * as React from "react";
import UserPolls from "../components/user_polls";
// Step 2: Define your component

//calling database.ref will list all polls
//lab3-doodle-poll-default-rtdb

const UserPage = () => {
  return (
    <main>
      <title>About me</title>
      <h1>View available polls</h1>
      <p>
        Hi there! I'm the proud creator of this site, which I built with Gatsby.
      </p>
      <UserPolls />
    </main>
  );
};
// Step 3: Export your component
export default UserPage;
