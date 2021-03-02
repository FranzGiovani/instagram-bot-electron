import React from 'react';
function App() {
  function start(e) {
    e.preventDefault();
    console.log('O link foi clicado.');
  }
  return (
    <div>
      <button onClick={start}> Start</button>
    </div>
  )

}

export default App;





