import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ChipCustom from "./Chip";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Stack
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      padding={"20px"}
    >
      {children}
    </Stack>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ChipTabs({ children }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  console.log(children[value]);

  return (
    <Box sx={{ width: "100%" }}>
      <Stack gap={"10px"} direction={"row"} flexWrap={"wrap"}>
        {children.map((child, index) => (
          <ChipCustom
            color={value === index ? "primary" : ""}
            onClick={(e) => handleChange(e, index)}
            label={child.props.label}
            {...a11yProps(0)}
          />
        ))}
      </Stack>
      <CustomTabPanel value={value}>{children[value]}</CustomTabPanel>
    </Box>
  );
}
