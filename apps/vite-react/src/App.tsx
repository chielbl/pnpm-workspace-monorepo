import { useState } from "react";
import { Button } from "@repo/ui";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div>
        <Button
          text={`count is ${count}`}
          onClick={() => setCount((count) => count + 1)}
        />
      </div>
    </>
  );
}

export default App;
