import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Index from "./pages";
import Layout from "./components/layout";
import DetailPokemon from "./pages/detailPokemon";
import { ToastContainer } from "react-toastify";

import "./assets/style/style.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Router>
        <Switch>
          <Layout>
            <Route path="/" exact component={Index} />
            <Route path="/:name" exact component={DetailPokemon} />
          </Layout>
        </Switch>
      </Router>
    </>
  );
}

export default App;
