import "./App.css";
import Card from "./components/card";
import Form from "./components/form";
import VoteBar from "./components/vote-bar";

function App() {
  return (
    <div className="w-full h-full m-0 grid grid-cols-2 grid-rows-2" dir="rtl">
      <div className="row-span-2 border border-gray-300">
        <Form />
      </div>
      <div className="col-start-2 row-start-1 p-8 border border-gray-300">
        <Card />
      </div>
      <div className="col-start-2 row-start-2 p-8 border border-gray-300">
        <VoteBar />
      </div>
    </div>
  );
}

export default App;
