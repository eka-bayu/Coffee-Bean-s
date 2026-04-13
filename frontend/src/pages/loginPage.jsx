import React, { useState } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../context/authContext";
import "../styles/loginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        { email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { token: newToken, user } = response.data;
      localStorage.setItem("token", newToken);
      auth.login(user);
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="h-100">
        <Col md={6} className="login-form-col">
          <div className="logo-wrapper">
            <img src="/images/logo.png" alt="Coffee Bean's" className="logo" />
          </div>

          <div className="login-form-wrapper">
            <h2 style={{ color: "#3e2723" }}>Welcome to Coffee Bean's!</h2>
            <p className="loginTxt">
              Please login to start your coffee experience
            </p>

            {/* [8] Error alert dengan animasi slide-down */}
            {error && (
              <Alert variant="danger" className="login-alert-enter">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              {/* Email Field */}
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  autoComplete="email"
                  aria-label="Email address"
                  required
                />
              </Form.Group>

              {/* Password Field dengan eye toggle */}
              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <div className="password-field-wrapper">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    aria-label="Password"
                    required
                  />
                  {/* [4] Eye icon toggle */}
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={-1}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </Form.Group>

              {/* Remember me + Forgot password */}
              <Form.Group className="mb-4 d-flex justify-content-between align-items-center">
                <Form.Check
                  type="checkbox"
                  id="rememberMe"
                  label="Remember me"
                />
                <a href="/login/forgotPassword" className="text-decoration">
                  Forgot password?
                </a>
              </Form.Group>

              {/* [7] Primary button — solid coklat dengan loading state */}
              <button
                type="submit"
                className="btn-login-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>

              {/* Divider antara Login dan Guest */}
              <div className="login-divider">or</div>

              {/* [7] Secondary button — outline coklat */}
              <button
                type="button"
                className="btn-login-secondary"
                onClick={() => navigate("/")}
              >
                Continue as Guest
              </button>

              {/* Sign up row */}
              <div className="signup-container-main">
                <p style={{ marginBottom: "0" }}>Don't have an account?</p>
                <a href="/login/signup" className="text-decoration">
                  Sign Up
                </a>
              </div>
            </Form>
          </div>
        </Col>

        <Col md={6} className="image-col">
          <div className="image-wrapper">
            <img
              src="/images/coffee-bg2.jpg"
              alt="Coffee shop interior"
              className="img-fluid"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
