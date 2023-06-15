import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Update from "./pages/Update";
import ProFile from "./pages/ProFile";
import ThreadItem from "./pages/ThreadItem";
// import Header from "./components/layout/Header";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>

          <Route element={<Update></Update>}>
            <Route path="/update" element={<></>}></Route>
          </Route>
          <Route element={<ProFile></ProFile>}>
            <Route path="/profile" element={<></>}></Route>
          </Route>
          <Route element={<ThreadItem></ThreadItem>}>
            <Route path="/thread" element={<></>}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
