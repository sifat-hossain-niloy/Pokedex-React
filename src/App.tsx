import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PokemonDetail from "./components/PokemonDetail";
import Home from "./pages/Home";
import theme from "./theme";



function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="pokemon/:pokemonName" element={<PokemonDetail />}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;