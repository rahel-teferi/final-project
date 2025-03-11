import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import PeopleIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";
import { useState, useMemo, useContext } from "react";
import { Profile } from "../components/dashBoard/Profile";
import { UserBooksTable } from "../components/books/UserBooksTable";
import { UserloanedTable } from "../components/books/UserLoanedTable";
import AuthContext from "../components/core/AuthContext.jsx";

const Menu = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "userBookTable",
    title: "Books list",
    icon: <PeopleIcon />,
  },
  {
    segment: "Profile",
    title: "Personal information",
    icon: <PeopleIcon />,
  },
  {
    segment: "loaned",
    title: "Loaned books",
    icon: <LayersIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  style: { padding: 100 },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = useState(initialPath);

  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled("div")(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '""',
}));

// const AppProviderHeader = () => {
//   const headerText = "Welcome to My App";
// };

export default function UserDashBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const router = useDemoRouter("/Profile");
  const drawerWidth = "64px";

  return (
    <AppProvider
      branding={{
        logo: "",
        title: "Library Managment System",
        homeUrl: "/Profile",
      }}
      navigation={Menu}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        {/* <PageContainer> */}
        <Grid container spacing={2}>
          <Grid size={5} />
          <Grid size={12}>
            {router.pathname === "/userBookTable" && <UserBooksTable />}
            {router.pathname === "/Profile" && <Profile />}
            {router.pathname === "/loaned" && <UserloanedTable />}
          </Grid>
        </Grid>
        {/* </PageContainer> */}
      </DashboardLayout>
    </AppProvider>
  );
}
