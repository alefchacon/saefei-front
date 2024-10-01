import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";

export default function CheckList({ children, name, onChange, values = [] }) {
  const [checked, setChecked] = useState(values);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    return onChange(newChecked);
  };

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      {children.map((child, index) => {
        const labelId = `checkbox-list-label-${child.props.value}`;

        return (
          <ListItem
            key={child.props.value}
            sx={{ padding: 1 }}
            disablePadding
            divider
          >
            <ListItemButton
              role={undefined}
              onClick={handleToggle(child.props.value)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.includes(child.props.value)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              {child}
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
