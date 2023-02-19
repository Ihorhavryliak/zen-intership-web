import { Header } from "./components/Header/Header";
import { Routers } from "./Routers";
import "./styles/main.css";

function App() {
  return (
    <main>
      <Header />
      <div className="container">
        <div className="row">
          <Routers />
        </div>
      </div>
    </main>
  );
}

export default App;
