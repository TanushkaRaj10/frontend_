import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import AdminLogin from "./AdminLogin";
import SurveyForm from "./SurveyForm";
import AdminDashboard from "./AdminDashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/survey" element={<SurveyForm />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
          </Routes>
        
      </div>
    </Router>
  );
}

export default App;
