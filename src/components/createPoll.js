import * as React from 'react'
import database from './firebase'

class createPoll extends React.Component{

  constructor(){
    super();
    this.state = {
      name: "",
      day: 1,
      startHour: 0,
      startMin: 0,
      endHour: 0,
      endMin: 0,
      location: "",
      notes: "",
      maxvotes: 1,
      timezone: "",
      votes_per_block: 1,
      votes_per_person: 1,
      year: 2021,
      num_blocks: 1,
      month: 1,
    }
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addPoll = e => {
    e.preventDefault();

    var data = [];

    var startTimeConv = this.state.startHour * 60 + this.state.startMin

    var timePerBlock = startTimeConv / this.state.num_blocks;

    for (var i = 0; i < this.state.num_blocks; i++){

      data.push({
        start: {
          hr: (startTimeConv + timePerBlock * i) / 60,
          min: (startTimeConv + timePerBlock * i) % 60,
        },
        end: {
          hr: (startTimeConv + timePerBlock * (i+1)) / 60,
          min: (startTimeConv + timePerBlock * (i+1)) % 60
        },
        votes: 0,
        voters: [{
          email: "temp",
          num_votes: 0
        }]
      })
    }

    console.log("test");

    database.ref("polls/").push({
      name: this.state.name,
      start: {
          hr: this.state.startHour,
          min: this.state.startMin
      },
      end: {
          hr: this.state.endHour,
          min: this.state.endMin
      },
      day: this.state.day,
      month: this.state.month,
      year: this.state.year,
      num_blocks: this.state.num_blocks,
      location: this.state.location,
      notes: this.state.notes,
      max_votes: this.state.maxvotes,
      votes_per_block: this.state.votes_per_block,
      votes_per_person: this.state.votes_per_person,
      timezone: this.state.timezone,
      blocks: data
    })

    this.setState({
      name: "",
      day: 1,
      startHour: 0,
      startMin: 0,
      endHour: 0,
      endMin: 0,
      location: "",
      notes: "",
      maxvotes: 1,
      timezone: "",
      votes_per_block: 1,
      votes_per_person: 1,
      year: 2021,
      num_blocks: 1,
      month: 1,
    });
  };

  render() {
    return (


        /*
      name: "",
      day: 0,
      startHour: 0,
      startMin: 0,
      endHour: 0,
      endMin: 0,
      location: "",
      notes: "",
      maxvotes: 0,
      timezone: "",
      votes_per_block: 0,
      votes_per_person: 0,
      year: 0,
      num_blocks: 0,
        */


        <form onSubmit={this.addPoll}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={this.updateInput}
            value={this.state.name}
          />
          <input
            type="number"
            min="1"
            max="31"
            name="day"
            placeholder="Day"
            onChange={this.updateInput}
            value={this.state.day}
          />
        <input
          type="number"
          min="1"
          max="12"
          name="month"
          placeholder="month"
          onChange={this.updateInput}
          value={this.state.month}
        />
        <input
          type="number"
          min="2021"
          name="year"
          placeholder="year"
          onChange={this.updateInput}
          value={this.state.year}
        />
          <input
            type="number"
            name="startHour"
            min="0"
            max="24"
            placeholder="StartHour"
            onChange={this.updateInput}
            value={this.state.startHour}
          />
          <input
            type="number"
            min="0"
            max="60"
            name="startMin"
            placeholder="StartMin"
            onChange={this.updateInput}
            value={this.state.startMin}
          />
          <input
            type="number"
            min="0"
            max="24"
            name="endHour"
            placeholder="endHour"
            onChange={this.updateInput}
            value={this.state.endHour}
          />
          <input
            type="number"
            min="0"
            max="60"
            name="endMin"
            placeholder="endMin"
            onChange={this.updateInput}
            value={this.state.endMin}
          />          
          <input
          type="text"
          name="location"
          placeholder="location"
          onChange={this.updateInput}
          value={this.state.location}
        />
        <input
          type="text"
          name="notes"
          placeholder="notes"
          onChange={this.updateInput}
          value={this.state.notes}
        />
        <input
          type="number"
          min="1"
          name="maxvotes"
          placeholder="maxvotes"
          onChange={this.updateInput}
          value={this.state.maxvotes}
        />
        <input
          type="text"
          name="timezone"
          placeholder="timezone"
          onChange={this.updateInput}
          value={this.state.timezone}
        />
        <input
          type="number"
          min="1"
          name="votes_per_block"
          placeholder="votes_per_block"
          onChange={this.updateInput}
          value={this.state.votes_per_block}
        />
        <input
          type="number"
          min="1"
          name="votes_per_person"
          placeholder="votes_per_person"
          onChange={this.updateInput}
          value={this.state.votes_per_person}
        />
        <input
          type="number"
          min="1"
          name="num_blocks"
          placeholder="num_blocks"
          onChange={this.updateInput}
          value={this.state.num_blocks}
        />
        <button type="submit">Submit</button>
        </form>
        );
      }
}

export default createPoll