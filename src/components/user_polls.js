import database from "./firebase";
import React, { Component } from "react";

export default class UserPolls extends Component {
  constructor() {
    super();
    this.db = database.ref("polls/");
    this.state = {
      polls: [],
      email: {},
      block_num: {},
      error_message: "",
    };
  }

  componentDidMount() {
    this.db.on("value", (snap) => {
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

  updateEmail = (e) => {
    this.setState((prevState) => ({
      email: {
        ...prevState.email,
        [e.target.name]: e.target.value,
      },
    }));
  };

  updateBlockNum = (e) => {
    this.setState((prevState) => ({
      block_num: {
        ...prevState.block_num,
        [e.target.name]: e.target.value,
      },
    }));
  };

  castVote = (e) => {
    e.preventDefault();
    this.setState({
      error_message: "",
    });
    this.db.once("value", (snapshot) => {
      const block_num = this.state.block_num[e.target[2].name] - 1;
      var poll = snapshot.val()[e.target[2].name];
      var block = poll["blocks"][block_num];

      if (block.votes < poll.votes_per_block) {
        const email = block["voters"][this.state.email[e.target[2].name]];

        if (email) {
          if (email < poll.votes_per_person) {
            console.log("You can vote");

            poll.votes++;
            poll["blocks"][block_num].votes++;
            poll["blocks"][block_num]["voters"][
              this.state.email[e.target[2].name]
            ]++;
            this.db.update({
              [e.target[2].name]: poll,
            });
            this.setState({
              email: {
                [e.target[2].name]: "",
              },
              block_num: {
                [e.target[2].name]: 0,
              },
            });
          } else {
            this.setState({
              error_message:
                "You have voted the maximum number of times for that poll",
            });
          }
        } else {
          poll.votes++;
          poll["blocks"][block_num].votes++;
          poll["blocks"][block_num]["voters"][
            this.state.email[e.target[2].name]
          ] = 1;
          this.db.update({
            [e.target[2].name]: poll,
          });
          this.setState({
            email: {
              [e.target[2].name]: "",
            },
            block_num: {
              [e.target[2].name]: 0,
            },
          });
        }
      } else {
        this.setState({
          error_message:
            "The maximum number of votes has been achieved on that poll",
        });
      }
    });
  };

  render() {
    return (
      <div>
        {this.state.error_message && (
          <h3 className="error"> {this.state.error_message} </h3>
        )}
        <ul>
          {this.state.polls.map((outer) => {
            const pollObject = outer.poll;
            const date = new Date(pollObject.start);
            if (pollObject.votes < pollObject.max_votes) {
              return (
                <li key={pollObject.name}>
                  {pollObject.name} {date.toLocaleDateString()}{" "}
                  {pollObject.votes}/{pollObject.max_votes}
                  <ol>
                    {pollObject.blocks.map((block) => {
                      const start = new Date(block.start);
                      return (
                        <li key={start.toLocaleTimeString()}>
                          {start.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          {block.votes}/{pollObject.votes_per_block}
                        </li>
                      );
                    })}
                    <form onSubmit={this.castVote} on>
                      <input
                        type="text"
                        placeholder="Email"
                        name={outer.name}
                        onInput={this.updateEmail}
                        value={this.state.email[outer.name]}
                        required
                      />
                      <input
                        type="number"
                        min="1"
                        max={pollObject.blocks.length}
                        name={outer.name}
                        placeholder="Block Number"
                        onInput={this.updateBlockNum}
                        value={this.state.block_num[outer.name]}
                        required
                      />
                      <button type="submit" name={outer.name}>
                        Submit
                      </button>
                    </form>
                  </ol>
                </li>
              );
            }
          })}
        </ul>
      </div>
    );
  }
}
