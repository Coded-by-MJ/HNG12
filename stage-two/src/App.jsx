import { BrowserRouter as Router, Routes, Route } from "react-router";
import Header from "./components/Header";
import Events from "./pages/Events";
import Tickets from "./pages/Tickets";
import AddTicket from "./pages/AddTicket";
import About from "./pages/About";
import StoreProvider from "./provider/storeContext";

function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Events />} />
            <Route path="/add-ticket" element={<AddTicket />} />
            <Route path="/my-tickets" element={<Tickets />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
