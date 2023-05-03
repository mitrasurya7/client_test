import { useAtom } from "jotai";
import { countAtom } from "../stores/store";
const CountPage = () => {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div>
      <h1>Count Page</h1>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default CountPage;
