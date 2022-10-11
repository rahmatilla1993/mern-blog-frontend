import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { fetchAuthLogin, selectIsAuth } from "./redux/slices/auth-slice";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthLogin());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
