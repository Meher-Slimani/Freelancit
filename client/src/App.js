import "./App.css";
import SignupForm from "./components/forms/SignupForm";
import Layout from "./components/Layout";

const App = () => {
  return (
    <div className="App">
      <Layout />
      <SignupForm />
    </div>
  );
};

export default App;
