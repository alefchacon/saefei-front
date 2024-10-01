import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";

export default function CheckList({ children }) {
  const [checked, setChecked] = useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <FormControl>
      <FormLabel>asdf</FormLabel>

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
    </FormControl>
  );
}
