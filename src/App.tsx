import "./App.css";
import Card from "./components/card";
import Form from "./components/form";
import Like from "./components/like";

function App() {
  return (
    <div className="container" dir="rtl">
      <div className="right-top">
        <Card />
      </div>
      <div className="right-bottom">
        <Like />
      </div>
      <div className="left">
        <Form />
      </div>
    </div>
  );
}

export default App;
