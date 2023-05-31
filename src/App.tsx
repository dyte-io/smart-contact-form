import ContactUs from "./pages/ContactUs";
import {Route, Routes} from "react-router-dom";
import JoinCall from "./pages/JoinCall";
import AdminView from "./pages/AdminView";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ContactUs/>}/>
        <Route path="/join-call" element={<JoinCall/>}/>
        <Route path="/join-call/:meetId" element={<JoinCall/>}/>
        <Route path="/agent" element={<AdminView/>}/>
      </Routes>
    </div>
  );
}

export default App;
