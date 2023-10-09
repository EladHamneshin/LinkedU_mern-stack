import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  Logout
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, removeCerdentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../components/FlexBetween";
import AuthState from "../types/states/AuthState";

const Navbar = () => {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const userInfo = useSelector<any, AuthState>((state) => state.auth.userInfo);

    const theme = useTheme();
    const neutralLight = theme.palette.primary.light;
    console.log(neutralLight.toString());
    

    return (
        <div style={{backgroundColor:neutralLight, height:100, width:100}}>

        </div>
    )
  
   
  };
  
  export default Navbar;