import React, { useState, useEffect } from 'react';


const timeLimit = 60


function App() {
  // Initialize state for the countdown time (in seconds)
  
  let [time, setTime] = useState(timeLimit)
  let [isRunning, setIsRunning] = useState(false)
  // Function to decrement the time by 1 second
  const decrementTime = () => {
    setTime(prevTime => prevTime - 1);
  };

  // Effect to update the timer every second
  useEffect(() => {
    // Exit early if the timer reaches 0
    if (time <= 0) return;

    // Create an interval to decrement the time every second
    let intervalId
    if (isRunning)
      intervalId = setInterval(decrementTime, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [time, isRunning]); // Re-run the effect whenever the time changes
  

  function randomNum() {
    return Math.floor(99*Math.random()) + 2
  }

  let [sym, setSym] = useState(Math.floor(3*Math.random()))
  let [A, setA] = useState(sym == 2?Math.floor(Math.random() * 11) + 2:randomNum())
  let [B, setB] = useState(randomNum())
  let [defaultVal, setDefaultVal] = useState("")
  let [count, setCount] = useState(0)
  let [placeHolder, setPlaceHolder] = useState("Answer...")

  const handleKeyDown = (event) => {
    if (time === 0){
      placeHolder = "Game Over :("
      setPlaceHolder(placeHolder)
    }
    isRunning = true
    setIsRunning(isRunning)
    let val = event.target.value
    console.log(val)
    defaultVal = val
    setDefaultVal(defaultVal)
    if (sym == 0){
      if (A + B === parseInt(val)){
        if (time > 0){
          count++
          setCount(count)
        }
        sym = Math.floor(3*Math.random());
        setSym(sym);
        A = (sym === 2?Math.floor(Math.random() * 11) + 2:randomNum())
        B = randomNum()
        if (Math.floor(Math.random()*2) === 1){
          let temp = A
          A = B
          B = temp
        }
        setA(A)
        setB(B)
        defaultVal = ""
        setDefaultVal(defaultVal)
      }
    }
    else if (sym === 1){
      if (A - B === parseInt(val)){
        if (time > 0){
          count++
          setCount(count)
        }
        sym = Math.floor(3*Math.random());
        setSym(sym);
        A = (sym === 2?Math.floor(Math.random() * 11) + 2:randomNum())
        B = randomNum()
        if (Math.floor(Math.random()*2) === 1){
          let temp = A
          A = B
          B = temp
        }
        setA(A)
        setB(B)
        defaultVal = ""
        setDefaultVal(defaultVal)
      }
    }
    else {
      if (A * B === parseInt(val)){
        if (time > 0){
          count++
          setCount(count)
        }
        sym = Math.floor(3*Math.random());
        setSym(sym);
        A = (sym === 2?Math.floor(Math.random() * 11) + 2:randomNum())
        B = randomNum()
        if (Math.floor(Math.random()*2) === 1){
          let temp = A
          A = B
          B = temp
        }
        setA(A)
        setB(B)
        defaultVal = ""
        setDefaultVal(defaultVal)
      }
    }
  };

  // return (
  //   <>
  //     <h1>Seconds Left: {time}</h1>
  //     {/* {<button onClick = {() => {console.log("hi");isRunning = !isRunning; setIsRunning(isRunning)}}>start</button>} */}
  //     <h1 style={{ display: 'inline-block' }}>{A} {sym === 0?"+":"-"} {B} = </h1>
  //     <form style={{ display: 'inline-block'}}>
  //       <input 
  //         type="text" 
  //         value={defaultVal}
  //         onChange={handleKeyDown} 
  //         placeholder="Answer..." 
  //       />
  //     </form>
  //     <h1>Count: {count}</h1>
  //   </>
  // )
  const restartApp = () => {
    window.location.reload(); // Reload the page
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
  }



  return (
    <div className="container">
      <button className="restart-btn" onClick={restartApp}>Restart</button>
      <h1 className="timer">Time Left: {time}</h1>
      <h5 style={{ fontStyle: 'italic', color: '#888' }}>{isRunning === false?"countdown begins when you start typing":""}</h5>
      <div className="middle-section">
        <h1 className="equation">
          {A} {sym === 0 ? '+' : (sym === 1?'-':'×')} {B} =
        </h1>
        <div className="form-container">
          <form className="answer-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={defaultVal}
              onChange={handleKeyDown}
              placeholder={placeHolder}
            />
          </form>
        </div>
      </div>
      <h1 className="count">Score: {count}</h1>
    </div>
  );
}

export default App
