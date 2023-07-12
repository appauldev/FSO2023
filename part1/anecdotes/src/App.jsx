import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [anecdoteVotes, setAnecdoteVotes] = useState(
    generateZeroArray(anecdotes.length)
  );
  const [anecdoteIndexWithMostVotes, setAnecdoteIndexWithMostVotes] =
    useState(0);

  function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function generateZeroArray(arrayLength) {
    return Array(arrayLength).fill(0);
  }

  function handleVote() {
    // handle the new vote
    const newAnecdoteVotes = [...anecdoteVotes];
    newAnecdoteVotes[selected] += 1;
    // find the index of the anecdote with the most votes
    const maxVotesCount = Math.max(...newAnecdoteVotes);
    console.log(maxVotesCount)
    const newAnecdoteIndexWithMostVotes = newAnecdoteVotes.indexOf(maxVotesCount);
    // update the states
    setAnecdoteVotes(newAnecdoteVotes);
    setAnecdoteIndexWithMostVotes(newAnecdoteIndexWithMostVotes);
  }

  return (
    <>
      <div className="anecdote-container flex-column">
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>vote count: {anecdoteVotes[selected]}</p>
        <div className="flex-row">
          <button onClick={() => handleVote()}>Vote</button>
          <button
            onClick={() => {
              setSelected(generateRandomInt(0, anecdotes.length));
            }}
          >
            Random anecdote
          </button>
        </div>
      </div>
      <div className="anecdote-container flex-column">
        <h1>Anecdote with the most votes</h1>
        <p>{anecdotes[anecdoteIndexWithMostVotes]}</p>
        <p>vote count: {anecdoteVotes[anecdoteIndexWithMostVotes]}</p>
      </div>
    </>
  );
};

export default App;
