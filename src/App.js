import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/layout";
import { ToastContainer } from "react-toastify";

// style
import "./assets/style/style.css";
import "react-toastify/dist/ReactToastify.css";

// pages
import Index from "./pages/list-pokemon";
import DetailPokemon from "./pages/detail-pokemon/detailPokemon";
import MyPokemon from "./pages/my-pokemon";

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
      {/* <Router> */}
      <Switch>
        <Layout>
          <Route path="/my-pokemon" component={MyPokemon} />
          <Route path="/detail-pokemon/:name" exact component={DetailPokemon} />
          <Route path="/" exact component={Index} />
        </Layout>
      </Switch>
      {/* </Router> */}
    </>
  );
}

export default App;
