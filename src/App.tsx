import { CssBaseline, ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PokemonDetail from "./components/PokemonDetail";
import Home from "./pages/Home";
import theme from "./theme";
import {initializeApp} from "firebase/app"
import {config} from "./config/config"
import AuthRoute from "./components/AuthRoute";
import { Login } from "@mui/icons-material";
import LoginPage from "./pages/Login";

 initializeApp(config.firebaseConfig);
const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute> <Home /> </AuthRoute>,
  },
  {
    path: "pokemon/:pokemonName",
    element: <PokemonDetail/>
  },
  {
    path : "/login",
    element : <LoginPage/>
  }
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;