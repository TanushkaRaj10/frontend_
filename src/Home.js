import { Link } from "react-router-dom";
import "./Home.css"; // Import the updated CSS file

function Home() {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <h1>Hi there!!</h1>
        <h2>Fill the form for class registration</h2>
        <div className="button-container">
          <Link to="/survey">
            <button className="btn">Register here</button>
          </Link>
          <Link to="/admin">
            <button className="btn">Admin Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
