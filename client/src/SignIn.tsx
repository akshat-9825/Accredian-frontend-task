import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ResponseType, handleLogin, handleRegistration } from "./api";
import { Alert, Snackbar } from "@mui/material";
import { verifyPassword } from "./validators";

import "./App.scss";

export default function SignIn({
  setSignedInState,
}: {
  setSignedInState: Dispatch<SetStateAction<boolean>>;
}) {
  const [login, setLogin] = useState(true);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLoginBtn = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
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
          setSuccessMsg(response.message);
          setErrorMsg("");
          setShowSnackBar(true);
          setTimeout(() => {
            setSignedInState(true);
          }, 1000);
        } else {
          setErrorMsg(response.message);
          setSuccessMsg("");
          setShowSnackBar(true);
        }
      } catch {
        //
      }
    },
    [setSignedInState]
  );

  const handleSnackBarClose = useCallback(() => {
    setShowSnackBar(false);
  }, []);

  const handleSignUpBtn = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const email = String(data.get("email"));
      const password = String(data.get("password"));
      const username = String(data.get("username"));
      const confirmPassword = String(data.get("confirm_password"));

      if (verifyPassword(password, confirmPassword)) {
        try {
          const response: ResponseType = await handleRegistration({
            username: username,
            password: password,
            email: email,
          });

          if (response.success) {
            setSuccessMsg(response.message + ". Please Login");
            setErrorMsg("");
            setShowSnackBar(true);
            setTimeout(() => {
              setLogin(true);
            }, 1000);
          } else {
            setErrorMsg(response.message);
            setSuccessMsg("");
            setShowSnackBar(true);
          }
        } catch {
          //
        }
      } else {
        setErrorMsg("Passwords do not match");
        setSuccessMsg("");
        setShowSnackBar(true);
      }
    },
    []
  );

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
              login ? handleLoginBtn(event) : handleSignUpBtn(event);
            }}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={login ? "Email Address or Username" : "Email Address"}
              name="email"
              autoFocus
            />
            {!login ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
              />
            ) : null}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            {!login ? (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Confirm Password"
                name="confirm_password"
                type="password"
                id="confirm_password"
                autoFocus
              />
            ) : null}
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
        <Snackbar
          open={showSnackBar}
          autoHideDuration={6000}
          onClose={handleSnackBarClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          <div>
            {successMsg && (
              <Alert severity="success" onClose={handleSnackBarClose}>
                {successMsg}
              </Alert>
            )}
            {errorMsg && (
              <Alert severity="error" onClose={handleSnackBarClose}>
                {errorMsg}
              </Alert>
            )}
          </div>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
