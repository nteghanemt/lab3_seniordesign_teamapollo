import database from "./firebase";
import React, { Component } from "react";

export default class EditPollPage extends Component {
  constructor() {
    super();
    this.state = {
      polls: [],
      selected_poll: "",
      poll: {
        name: "None selected",
        start: 0,
        end: 0,
        timezone: "Default",
        location: "Lib",
        notes: "No Notes",
        num_blocks: 1,
        max_votes: 1,
        votes_per_block: 1,
        votes_per_person: 1,
        blocks: [
          {
            end: 1638546300000,
            start: 1638545400000,
            voters: [
              {
                temp: 0,
              },
            ],
          },
        ],
        votes: 0,
      },
      error_message: "",
      name: "",
      start: "",
      end: "",
      timezone: "",
      location: "",
      notes: "",
      num_blocks: 1,
      max_votes: 1,
      votes_per_block: 1,
      votes_per_person: 1,
    };
  }

  componentDidMount() {
    database.ref("polls/").on("value", (snap) => {
      snap.forEach((poll) => {
        var tzoffset = new Date().getTimezoneOffset() * 60000;
        var current_time = new Date(Date.now() - tzoffset).getTime();
        if (poll.val().end >= current_time) {
          const index = this.state.polls.findIndex(
            (temp) => temp["name"] === poll.key
          );
          if (index >= 0) {
            this.state.polls[index] = { name: poll.key, poll: poll.val() };
            this.setState({
              polls: [...this.state.polls],
            });
          } else {
            this.setState({
              polls: [
                ...this.state.polls,
                { name: poll.key, poll: poll.val() },
              ],
            });
          }
        }
      });
    });
  }

  updateInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updateSelectedPoll = (e) => {
    console.log(e);
    this.setState((prevState) => ({
      selected_poll: e.target.value,
      poll: this.state.polls.find((temp) => temp["name"] === e.target.value)
        .poll,
    }));
  };

  updatePoll = (e) => {
    e.preventDefault();

    this.setState({
      error_message: "",
    });
    console.log(this.state.name);
    const name = this.state.name ? this.state.name : this.state.poll.name;
    console.log(name);
    const start = this.state.start
      ? new Date(Date.parse(this.state.start)).getTime()
      : this.state.poll.start;
    const end = this.state.end
      ? Date.parse(
          new Date(start).toISOString().slice(0, -14) + "T" + this.state.end
        )
      : this.state.poll.end;
    const timezone = this.state.timezone
      ? this.state.timezone
      : this.state.poll.timezone;
    const location = this.state.location
      ? this.state.location
      : this.state.poll.location;
    const notes = this.state.notes ? this.state.notes : this.state.poll.notes;
    const num_blocks = this.state.poll.num_blocks;
    const max_votes = this.state.poll.max_votes;
    const votes_per_block = this.state.poll.votes_per_block;
    const votes_per_person = this.state.poll.votes_per_person;

    const timePerBlock = (end - start) / num_blocks;

    var data = [];

    console.log(timePerBlock);
    for (var i = 0; i < num_blocks; i++) {
      data.push({
        start: start + timePerBlock * i,
        end: start + timePerBlock * (i + 1),
        votes: 0,
        voters: {
          temp: 0,
        },
      });
    }

    let poll = this.state.poll;

    poll.name = name;
    poll.start = start;
    poll.end = end;
    poll.timezone = timezone;
    poll.location = location;
    poll.notes = notes;
    poll.num_blocks = num_blocks;
    poll.max_votes = max_votes;
    poll.votes_per_block = votes_per_block;
    poll.votes_per_person = votes_per_person;
    poll.blocks = data;
    poll.votes = 0;
    console.log(this.state.selected_poll);
    database.ref("polls/").set({
      [this.state.selected_poll]: poll,
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
      <div>
        {this.state.error_message && (
          <h3 className="error"> {this.state.error_message} </h3>
        )}

        <form onSubmit={this.updatePoll}>
          <select
            name="selected_poll"
            onChange={this.updateSelectedPoll}
            required
          >
            <option key="blank" value={""}></option>
            {this.state.polls.map((outer) => {
              return (
                <option key={outer.name} value={outer.name}>
                  {outer.poll.name}
                </option>
              );
            })}
          </select>
          <br />
          <br />
          Name: {this.state.poll.name}
          <br />
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={this.updateInput}
            value={this.state.name}
          />
          <br />
          <br />
          Start Date and Time:{" "}
          {new Date(this.state.poll.start).toLocaleString()}
          <br />
          <input
            type="datetime-local"
            name="startDate"
            min={rounded_date}
            value={rounded_date}
            step="300"
            onInput={this.updateInput}
            value={this.state.startDate}
          />
          <br />
          <br />
          End Time:{" "}
          {new Date(this.state.poll.end).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          <br />
          <input
            type="time"
            name="endTime"
            onInput={this.updateInput}
            value={this.state.endTime}
          />
          <br />
          <br />
          Timezone: {this.state.poll.timezone}
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
          Location: {this.state.poll.location}
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
          Notes: {this.state.poll.notes}
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
          Number of blocks: {this.state.poll.num_blocks}
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
          Max Votes: {this.state.poll.max_votes}
          <br />
          <input
            type="number"
            min="1"
            name="max_votes"
            placeholder="max_votes"
            onInput={this.updateInput}
            value={this.state.max_votes}
          />
          <br />
          <br />
          Votes per Block: {this.state.poll.votes_per_block}
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
          Votes per Person: {this.state.poll.votes_per_person}
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
      </div>
    );
  }
}
