import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ResponseType, handleLogin } from "./api";

import "./App.scss";

export default function SignIn({
  setSignedInState,
}: {
  setSignedInState: Dispatch<SetStateAction<boolean>>;
}) {
  const [login, setLogin] = useState(true);
  console.log(setSignedInState);
  const handleLoginBtn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email"));
    const password = String(data.get("password"));

    try {
      const response: ResponseType = await handleLogin({
        identifier: email,
        password: password,
      });

      if (response.success) {
        setSignedInState(true);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#242424",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" className="container" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography component="h1" variant="h5">
            {login ? "Sign in" : "Sign up"}
          </Typography>
          <Box
            component="form"
            onSubmit={(event) => {
              login ? handleLoginBtn(event) : null;
            }}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address or Username"
              name="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              {login ? "Sign in" : "Sign up"}
            </Button>
            <Grid container>
              <Grid item xs>
                <div className="form_sublinks form_link">Forgot password?</div>
              </Grid>
              <Grid item>
                <div className="form_sublinks">
                  {login
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <a onClick={() => setLogin(!login)} className="form_link">
                    {login ? "Sign up" : "Login"}
                  </a>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
