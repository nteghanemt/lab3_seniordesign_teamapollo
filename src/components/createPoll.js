import * as React from 'react'
import database from './firebase'

class createPoll extends React.Component{

  constructor(){
    super();
    this.state = {
      Name: "",
      Day: "",
      StartTime: "",
      EndTime: "",
      Location: "",
      Blocks: "",
      Notes: ""
    }
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addPoll = e => {
    e.preventDefault();

    database.ref("Polls/"+this.state.Name).set({
      Name : this.state.Name,
      Day : this.state.Day,
      StartTime : this.state.StartTime,
      EndTime : this.state.EndTime,
      Location : this.state.Location,
      Blocks : this.state.Blocks,
      Notes : this.state.Notes,
    })

    this.setState({
      Name: "",
      Day: "",
      StartTime: "",
      EndTime: "",
      Location: "",
      Blocks: "",
      Notes: ""
    });
  };


  render() {
    return (
        <form onSubmit={this.addPoll}>
          <input
            type="text"
            name="Name"
            placeholder="Name"
            onChange={this.updateInput}
            value={this.state.Name}
          />
          <input
            type="text"
            name="Day"
            placeholder="Day"
            onChange={this.updateInput}
            value={this.state.Day}
          />
          <input
            type="text"
            name="StartTime"
            placeholder="StartTime"
            onChange={this.updateInput}
            value={this.state.StartTime}
          />
          <input
            type="text"
            name="EndTime"
            placeholder="EndTime"
            onChange={this.updateInput}
            value={this.state.EndTime}
          />
          <input
            type="text"
            name="Location"
            placeholder="Location"
            onChange={this.updateInput}
            value={this.state.Location}
          />
          <input
            type="text"
            name="Blocks"
            placeholder="Blocks"
            onChange={this.updateInput}
            value={this.state.Blocks}
          />
          <input
            type="text"
            name="Notes"
            placeholder="Notes"
            onChange={this.updateInput}
            value={this.state.Notes}
          />
          <button type="submit">Submit</button>
        </form>
        );
      }
}

export default createPoll