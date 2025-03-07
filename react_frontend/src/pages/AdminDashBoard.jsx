import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import PeopleIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";
import { useState, useMemo } from "react";
import { Books } from "./Books";
import { Users } from "./Users";
import { LandingPageUser } from "../components/dashBoard/LandingPageUser";
import { BorrowReturn } from "./BorrowReturn";

const Menu = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "books",
    title: "Books",
    icon: <PeopleIcon />,
  },
  {
    segment: "users",
    title: "Users",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "borrowReturns",
    title: "BorrowReturn",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "integrations",
    title: "Integrations",
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

export default function AdminDashBoard() {
  const router = useDemoRouter("/hello");

  return (
    <AppProvider
      branding={{
        logo: "",
        title: "Library Managment System",
        homeUrl: "/hello",
      }}
      navigation={Menu}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <PageContainer title={""} breadcrumbs={[]}>
          <Grid container spacing={2}>
            <Grid size={3} />
            <Grid size={12}>
              {router.pathname === "/books" && <Books />}
              {router.pathname === "/users" && <Users />}
              {router.pathname === "/borrowReturns" && <BorrowReturn />}
              {router.pathname === "/hello" && <LandingPageUser />}
              {router.pathname !== "books" && router.pathname !== "users" && (
                <Skeleton height={14} />
              )}
            </Grid>
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
