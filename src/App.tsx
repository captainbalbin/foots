import { Button } from "./components/ui/button";
import "./index.css";

export function App() {
  return (
    <div className="container mx-auto p-8 text-center relative z-10">
      <div className="flex justify-center items-center gap-8 mb-8">
      <Button>Hello</Button>
      </div>
    </div>
  );
}

export default App;
