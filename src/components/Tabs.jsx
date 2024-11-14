import { useState, isValidElement } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Stack
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      height={"100%"}
      padding={{ md: "", xs: "0px" }}
    >
      {children}
    </Stack>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabsCustom({ children }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function preventSingleTabCrash() {
    const theresOnlyOneTab = !Array.isArray(children);
    if (theresOnlyOneTab) {
      children = [children];
    }
  }
  preventSingleTabCrash();

  function preventConditionalTabCrash() {
    children = children.filter(
      (child) => isValidElement(child) // && Object.values(child.props).length > 0
    );
  }
  preventConditionalTabCrash();

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "10px" }}
      >
        <Tabs
          className={"sticky"}
          value={value}
          onChange={handleChange}
          aria-label="tabs"
          role="tablist"
        >
          {children.map((child, index) => (
            <Tab key={index} label={child.props.label} {...a11yProps(0)} />
          ))}
        </Tabs>
      </Box>
      <CustomTabPanel value={value}>{children[value]}</CustomTabPanel>
    </Stack>
  );
}
