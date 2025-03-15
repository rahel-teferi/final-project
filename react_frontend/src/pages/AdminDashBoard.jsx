import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { useState, useMemo } from "react";
import { Books } from "./Books";
import { Users } from "./Users";
import { Profile } from "../components/dashBoard/Profile";
import { Loans } from "./Loans";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

const Menu = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "books",
    title: "Books",
    icon: <LibraryBooksIcon />,
  },
  {
    segment: "users",
    title: "Users",
    icon: <PeopleIcon />,
  },
  {
    segment: "loans",
    title: "Loans",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "Profile",
    title: "Personal information",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Reports",
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "monthly",
        title: "Monthly",
        icon: <DescriptionIcon />,
      },
      {
        segment: "yearly",
        title: "Yearly",
        icon: <DescriptionIcon />,
      },
    ],
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

export default function AdminDashBoard() {
  const router = useDemoRouter("/Profile");

  return (
    <AppProvider
      branding={{
        logo: "",
        title: "Administrator dashboard",
        homeUrl: "/Profile",
      }}
      navigation={Menu}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        {/* <PageContainer title={""} breadcrumbs={[]}> */}
        {router.pathname === "/books" && <Books />}
        {router.pathname === "/users" && <Users />}
        {router.pathname === "/loans" && <Loans />}
        {router.pathname === "/Profile" && <Profile />}
        {/* </PageContainer> */}
      </DashboardLayout>
    </AppProvider>
  );
}
