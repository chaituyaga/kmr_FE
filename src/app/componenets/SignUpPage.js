import { IconButton, Link, TextField, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export default function SignUpPage(props) {
  const {
    mailInp,
    setMailInp,
    nameInp,
    setNameInp,
    signUpMessage,
    setMailInpPage,
    setUserSignUp,
  } = props;
  return (
    <>
      {!signUpMessage ? (
        <>
          <TextField
            variant="standard"
            fullWidth
            type="email"
            label="Enter Email Address"
            value={mailInp}
            onChange={(e) => {
              setMailInp(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    setMailInp("");
                  }}
                >
                  <ClearIcon />
                </IconButton>
              ),
            }}
            error={
              mailInp &&
              !mailInp.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
            }
            helperText={
              mailInp &&
              !mailInp.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
                ? "Invalid Email ID"
                : ""
            }
          />
          <TextField
            variant="standard"
            fullWidth
            type="text"
            label={"Enter your Name"}
            value={nameInp}
            onChange={(e) => {
              setNameInp(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    setNameInp("");
                  }}
                >
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
        </>
      ) : (
        <>
          <Typography>{signUpMessage}</Typography>
          <Link
            sx={{
              textDecoration: "none",
              fontWeight: "bold",
              position: "absolute",
              bottom: 5,
              left: 40,
              cursor: "pointer",
            }}
            onClick={() => {
              setMailInpPage(true);
              setUserSignUp(false);
            }}
          >
            Back To Login Page
          </Link>
        </>
      )}
    </>
  );
}
