import { ReactNode, useState } from "react";
import "./App.css";

const getPosition = (val: number) => 150 - val / 2;

function Component1() {
  console.log("component 1");
  return (
    <div>
      <h2>Component 1</h2>
    </div>
  );
}

function Component2() {
  console.log("component 2");
  return (
    <div>
      <h2>Component 2</h2>
    </div>
  );
}

function Button() {
  console.log("button");
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>click</button>
      <h3>{count}</h3>
    </>
  );
}

function MovingBlock({ children }: { children: ReactNode }) {
  console.log("moving block");
  const [position, setPosition] = useState(150);

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const calculated = getPosition((e.target as HTMLElement).scrollTop);
    setPosition(calculated);
  };

  return (
    <div className="scrollable-block" onScroll={(e) => onScroll(e)}>
      {position}
      {children}
    </div>
  );
}

function App() {
  console.log("app");

  return (
    <>
      <h1>Advanced React</h1>
      <MovingBlock>
        <Button />
        <Component1 />
        <Component2 />
      </MovingBlock>
    </>
  );
}

export default App;
