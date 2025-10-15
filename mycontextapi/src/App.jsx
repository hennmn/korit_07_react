import AuthContext from "./AuthContext";
import MyTable from "./MyTable";
import MyComponent2 from "./MyComponent2";
import MyForm from "./MyForm";
import "./App.css";

function App() {
  const username = "김일";

  return (
    <AuthContext.Provider value={username}>
      <MyComponent2 />
      <MyTable />
      <MyForm />
    </AuthContext.Provider>
  );
}

export default App;
