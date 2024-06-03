import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useRouter } from "next/navigation";

export default function SideNav(props) {
  const router = useRouter();
  const sideNavData = [
    {
      name: "Stock Inward",
      icon: ArchiveIcon,
      key: "si",
    },
    {
      name: "Stock Outward",
      icon: UnarchiveIcon,
      key: "so",
    },
  ];
  return (
    <Drawer
      open={props.drawerOpen}
      variant="persistent"
      sx={{
        width: "max-content",
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: "max-content",
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {sideNavData.map((text, index) => (
            <ListItem key={text.name} disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push(text.key);
                  props.setDrawerOpen(!props.drawerOpen);
                }}
              >
                <ListItemIcon>
                  <text.icon />
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
