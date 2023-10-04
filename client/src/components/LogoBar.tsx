import { Typography } from "@mui/material";
import FlexCenter from "./FlexCenter";
import Logo from "./Logo";


const LogoBar = () => {
    return (
        <FlexCenter
        width="100%"
        p="1rem 6%"
        style={{ backgroundColor: "#F5FFFA" }}
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="#1E90FF">
          Linked
        </Typography>
        <Logo width={35} height={35}/>
      </FlexCenter>
    );
};

export default LogoBar;