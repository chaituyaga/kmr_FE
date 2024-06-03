import { Box, Input } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const OtpInput = (props) => {
  const length = 4;
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].children[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    props.setIsValidOtp(false);
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      props.setOtpLogin(false);
      props.setInputOtpValue(combinedOtp);
    }
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].children[0].focus();
    }
  };

  const handleClick = (index) => {
    for (let i = 0; i < index; i++) {
      if (!otp[i - 1]) inputRefs.current[otp.indexOf("")].children[0].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].children[0].focus();
    }
  };

  return (
    <Box sx={{ pt: 2 }}>
      {otp.map((value, index) => {
        return (
          <Input
            key={index}
            type="number"
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            error={props.isValidOtp}
            sx={{
              mr: 1,
              width: "40px",
              "& .MuiInput-input": {
                textAlign: "center",
              },
            }}
          />
        );
      })}
    </Box>
  );
};

export default OtpInput;
