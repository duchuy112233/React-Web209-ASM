import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import { Dashboard } from "@mui/icons-material";

const drawerWidth = 240;

function Sidebar() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* <Toolbar /> */}
      <Link to="/">
        <img src="./logo.svg" alt="logo" />
      </Link>

      <Divider />

      <List>
        {[
          {
            text: "Dashboard",
            icon: <Dashboard />,
            link: "/admin/product/list",
          },
          { text: "Inbox", icon: <InboxIcon />, link: "/inbox" },
          { text: "Starred", icon: <MailIcon />, link: "/starred" },
          { text: "Send email", icon: <InboxIcon />, link: "/send-email" },
          { text: "Drafts", icon: <MailIcon />, link: "/drafts" },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <Link
              to={item.link}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
