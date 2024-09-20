import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Deatil from "./pages/Deatil";

function App() {
  const { isLoggedIn} = useAppContext();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><p>Home</p></Layout>} />
        <Route path="/search" element={<Layout><Search /></Layout>} />
        <Route path="/detail/:hotelId" element={<Layout><Deatil /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/sign-in" element={<Layout><SignIn /></Layout>} />
      {isLoggedIn && <>
        <Route path="/add-hotel" element={<Layout><AddHotel /></Layout>} />
      </>}
      {isLoggedIn && <>
        <Route path="/my-hotels" element={<Layout><MyHotels /></Layout>} />
      </>}
      {isLoggedIn && <>
        <Route path="/edit-hotel/:hotelId" element={<Layout><EditHotel /></Layout>} />
      </>}
      <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
