"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { useState } from "react";
import {
  Box,
  IconButton,
  Link,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OtpInput from "../componenets/OtpInput";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewuser,
  getIsUserExist,
  validateOtp,
} from "../services/slices/userSlice";
import SignUpPage from "../componenets/SignUpPage";
import { useRouter } from "next/navigation";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Login() {
  const [open, setOpen] = useState(true);
  const [otpPage, setOtpPage] = useState(false);
  const [mailInp, setMailInp] = useState("");
  const [otpLogin, setOtpLogin] = useState(true);
  const [mailInpPage, setMailInpPage] = useState(true);
  const [userErr, setUserErr] = useState(false);
  const [userSignUp, setUserSignUp] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState("");
  const [nameInp, setNameInp] = useState("");
  const [inputOtpValue, setInputOtpValue] = useState("");
  const [isValidOtp, setIsValidOtp] = useState(false);
  const { isUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const router = useRouter();

  React.useEffect(() => {
    var user = localStorage.getItem("isUser");
    if (user) router.push("/");
  }, []);

  const handleClose = (e) => {
    if (e.type === "click") e.preventDefault();
    else setOpen(false);
  };

  const handleNextPage = (e) => {
    e.preventDefault();
    if (userSignUp) {
      dispatch(createNewuser({ uEmail: mailInp, uName: nameInp })).then(
        (res) => {
          setSignUpMessage(res.payload.data);
        }
      );
    } else if (mailInpPage) {
      dispatch(getIsUserExist({ mailId: mailInp })).then((res) => {
        if (!res.payload.data) setUserErr(true);
        else {
          setOtpPage(true);
          setMailInpPage(false);
        }
      });
    } else {
      dispatch(validateOtp({ otp: inputOtpValue })).then((res) => {
        if (res.payload.data) router.push("/");
        else setIsValidOtp(true);
      });
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      disableEscapeKeyDown
    >
      <DialogContent
        sx={{
          p: 0,
          display: "flex",
          justifyContent: "space-between",
          minHeight: "50vh",
        }}
      >
        <Box
          sx={{
            width: "40%",
            p: 1.5,
            backgroundColor: "#2874f0",
            color: "white",
          }}
        >
          <Typography variant="h3" sx={{ mt: 7 }}>
            Login
          </Typography>
          <Typography sx={{ color: "whitesmoke", mt: 3 }}>
            Get Access for your stocks
          </Typography>
        </Box>
        <form onSubmit={handleNextPage}>
          <Box
            sx={{
              mt: 5,
              ml: 2,
              mr: 2,
              position: "relative",
              width: "-webkit-fill-available",
            }}
          >
            {mailInpPage && (
              <TextField
                variant="standard"
                fullWidth
                type="email"
                label={
                  userSignUp ? "Enter Email Address" : "Enter your Email ID"
                }
                value={mailInp}
                onChange={(e) => {
                  setMailInp(e.target.value);
                  setUserErr(false);
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => {
                        setMailInp("");
                        setUserErr(false);
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  ),
                }}
                error={
                  userErr ||
                  (mailInp &&
                    !mailInp.match(
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                    ))
                }
                helperText={
                  (mailInp &&
                    !mailInp.match(
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                    )) ||
                  userErr
                    ? "Invalid Email ID"
                    : ""
                }
              />
            )}
            {otpPage && (
              <div>
                <Tooltip title="Back to Mail ID">
                  <IconButton onClick={() => setOtpPage(false)}>
                    <ArrowBackIcon />
                  </IconButton>
                </Tooltip>
                <OtpInput
                  setOtpLogin={setOtpLogin}
                  setInputOtpValue={setInputOtpValue}
                  isValidOtp={isValidOtp}
                  setIsValidOtp={setIsValidOtp}
                />
              </div>
            )}
            {userSignUp && (
              <div>
                <Tooltip title="Back to Login Page">
                  <IconButton
                    onClick={() => {
                      setMailInpPage(true);
                      setUserSignUp(false);
                      setSignUpMessage("");
                      setMailInp("");
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Tooltip>
                <SignUpPage
                  mailInp={mailInp}
                  setMailInp={setMailInp}
                  nameInp={nameInp}
                  setNameInp={setNameInp}
                  signUpMessage={signUpMessage}
                  setUserSignUp={setUserSignUp}
                  setMailInpPage={setMailInpPage}
                />
              </div>
            )}
            {!signUpMessage && (
              <Button
                variant="contained"
                onClick={handleNextPage}
                disabled={
                  !otpPage
                    ? !mailInp.match(
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                      )
                    : otpLogin
                }
                sx={{ mt: 3, textAlign: "center", pl: 6, pr: 6 }}
                color="success"
              >
                {"Continue to Sign-in..."}
              </Button>
            )}
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
