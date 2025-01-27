import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Container, 
  InputAdornment, 
  IconButton,
  Card,
  CardContent,
  Alert,
  Paper
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff, 
  LockOutlined, 
  PersonOutlined,
  EmailOutlined
} from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!credentials.username || !credentials.password) {
      setError("Please enter both username and password");
      return;
    }

    if (credentials.username.length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    }

    if (credentials.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      console.log("Attempting login", credentials);
      navigate("/");
    } catch (authError) {
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container 
      maxWidth={false}
      sx={{ 
        display: 'flex', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 0
      }}
    >
      <Container maxWidth="sm" sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        py: 8
      }}>
        <Paper
          elevation={8}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Box sx={{ 
            p: 4,
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center'
          }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3
              }}
            >
              <LockOutlined sx={{ fontSize: 40, color: 'white' }} />
            </Box>

            <Typography 
              variant="h4" 
              sx={{ 
                mb: 4, 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Welcome Back
            </Typography>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  width: '100%', 
                  mb: 3,
                  borderRadius: 2
                }}
              >
                {error}
              </Alert>
            )}

            <form onSubmit={handleLogin} style={{ width: '100%' }}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlined sx={{ color: '#667eea' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 2,
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#667eea',
                      },
                    },
                  }
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ color: '#667eea' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        sx={{ color: '#667eea' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 2,
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#667eea',
                      },
                    },
                  }
                }}
              />

              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                sx={{ 
                  mt: 4,
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                  boxShadow: '0 3px 5px 2px rgba(102, 126, 234, .3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #5a6fd6 30%, #6a439c 90%)',
                  }
                }}
              >
                Sign In
              </Button>
            </form>

            <Typography variant="body1" sx={{ mt: 3, color: 'text.secondary' }}>
              Don't have an account?{' '}
              <Typography
                component="a"
                href="/signup"
                sx={{
                  color: '#667eea',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    color: '#764ba2',
                    textDecoration: 'underline',
                  }
                }}
              >
                Sign up
              </Typography>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Container>
  );
};

export default Login;