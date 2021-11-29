import * as React from 'react'
const CreatePollPage = () => {
  return (
    <main>
      <>
        <h1>Create Poll</h1>
        <form>
          <label>
            Title of Poll
						<br/>
          	<input type="text" name="titleOfPoll" />
          </label>
					<br/>
					<br/>
					<label>
            Location
						<br/>
          	<input type="text" name="location" />
          </label>
					<br/>
					<br/>
          <label>
						Description
						<br/>
          	<input type="text" name="description" />
          </label>
					<br/>
					<br/>
          <input type="submit" value="submit" />
        </form>
      </>
    </main>
  )
}
export default CreatePollPage