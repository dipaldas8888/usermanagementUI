import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { toast } from "react-toastify";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await UserService.login(email, password);
      console.log(userData);
      
     
      if (userData.token) {
        toast.success("Login successful");
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
        navigate("/profile");
      } else {
        setError(userData.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          className="text-center mb-3"
          style={{ display: "flex", justifyContent: "flex-start", gap: "6px", marginBottom: "10px" }}
        >
          Don't have an account?{" "}
          <button
            onClick={goToRegister}
            type="button"
            style={{
              background: "none",
              border: "none",
              color: "#1a73e8",
              textDecoration: "underline",
              cursor: "pointer",
              padding: "0 4px",
              fontSize: "inherit",
              width: "fit-content",
              display: "inline",
              whiteSpace: "nowrap",
            }}
          >
            Register Here
          </button>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
