import { useState } from "react";
import useTitle from "./useTitle.js";

function Counter() {
  const [count, setCount] = useState(0);
  useTitle(`당신은 ${count} 번 클릭했습니다!`);
  return (
    <>
      <p>Counter : {count} </p>
      <br />
      <br />
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>++</button>
    </>
  );
}

export default Counter;
