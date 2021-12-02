import * as React from "react";
import database from "./firebase";

class createPoll extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      startDate: "",
      endHour: "",
      timezone: "",
      location: "",
      notes: "",
      num_blocks: 1,
      max_votes: 1,
      votes_per_block: 1,
      votes_per_person: 1,
    };
  }

  updateInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addPoll = (e) => {
    e.preventDefault();

    const startTime = new Date(Date.parse(this.state.startDate)).getTime();
    const endTime = new Date(
      Date.parse(this.state.startDate.slice(0, -6) + "T" + this.state.endTime)
    ).getTime();

    const timePerBlock = (endTime - startTime) / this.state.num_blocks;

    var data = [];

    console.log(timePerBlock);
    for (var i = 0; i < this.state.num_blocks; i++) {
      data.push({
        start: startTime + timePerBlock * i,
        end: startTime + timePerBlock * (i + 1),
        votes: 0,
        voters: {
          temp: 0,
        },
      });
    }

    database.ref("polls/").push({
      name: this.state.name,
      start: startTime,
      end: endTime,
      timezone: this.state.timezone,
      location: this.state.location,
      notes: this.state.notes,
      num_blocks: this.state.num_blocks,
      max_votes: this.state.max_votes,
      votes_per_block: this.state.votes_per_block,
      votes_per_person: this.state.votes_per_person,
      blocks: data,
      votes: 0,
    });

    this.setState({
      name: "",
      startDate: "",
      endHour: "",
      timezone: "",
      location: "",
      notes: "",
      num_blocks: 1,
      max_votes: 1,
      votes_per_block: 1,
      votes_per_person: 1,
    });
  };

  render() {
    var tzoffset = new Date().getTimezoneOffset() * 60000;
    var coeff = 1000 * 60 * 5;
    var date = new Date(Date.now() - tzoffset);
    var rounded_date = new Date(Math.round(date.getTime() / coeff) * coeff)
      .toISOString()
      .slice(0, -8);
    return (
      <form onSubmit={this.addPoll}>
        Name
        <br />
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={this.updateInput}
          value={this.state.name}
          required
        />
        <br />
        <br />
        Start Date and Time
        <br />
        <input
          type="datetime-local"
          name="startDate"
          min={rounded_date}
          value={rounded_date}
          step="300"
          onInput={this.updateInput}
          value={this.state.startDate}
          required
        />
        <br />
        <br />
        End Time
        <br />
        <input
          type="time"
          name="endTime"
          onInput={this.updateInput}
          value={this.state.endTime}
          required
        />
        <br />
        <br />
        Timezone
        <br />
        <input
          type="text"
          name="timezone"
          placeholder="timezone"
          onChange={this.updateInput}
          value={this.state.timezone}
          defaultValue="Default"
        />
        <br />
        <br />
        Location
        <br />
        <input
          type="text"
          name="location"
          placeholder="location"
          onChange={this.updateInput}
          value={this.state.location}
        />
        <br />
        <br />
        Notes
        <br />
        <input
          type="text"
          name="notes"
          placeholder="notes"
          onChange={this.updateInput}
          value={this.state.notes}
        />
        <br />
        <br />
        Number of blocks
        <br />
        <input
          type="number"
          min="1"
          name="num_blocks"
          placeholder="num_blocks"
          onInput={this.updateInput}
          value={this.state.num_blocks}
        />
        <br />
        <br />
        Max Votes
        <br />
        <input
          type="number"
          min="1"
          name="max_votes"
          placeholder="max_votes"
          onInput={this.updateInput}
          value={this.state.max_votes}
          required
        />
        <br />
        <br />
        Votes per Block
        <br />
        <input
          type="number"
          min="1"
          name="votes_per_block"
          placeholder="votes_per_block"
          onInput={this.updateInput}
          value={this.state.votes_per_block}
        />
        <br />
        <br />
        Votes per Person
        <br />
        <input
          type="number"
          min="1"
          name="votes_per_person"
          placeholder="votes_per_person"
          onInput={this.updateInput}
          value={this.state.votes_per_person}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default createPoll;
