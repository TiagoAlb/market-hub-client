import Ads from "../views/Ads/Ads.jsx";
import Dashboard from "../views/Dashboard/Dashboard.jsx";
import Maps from "../views/Maps/Maps.jsx";
import MarketplacesRoute from "../views/Marketplaces/MarketplacesRoute.jsx";
import Notifications from "../views/Notifications/Notifications.jsx";
import TableList from "../views/TableList/TableList.jsx";
import Typography from "../views/Typography/Typography.jsx";
import UserProfile from "../views/UserProfile/UserProfile.jsx";

const loggedRoutes = [
  {
    path: "/dashboard",
    name: "Painel",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    path: "/user",
    name: "Profile",
    icon: "pe-7s-user",
    component: UserProfile
  },
  {
    path: "/marketplaces",
    name: "Marketplaces",
    icon: "pe-7s-lock",
    component: MarketplacesRoute
  },
  {
    path: "/table",
    name: "Table List",
    icon: "pe-7s-note2",
    component: TableList
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "pe-7s-news-paper",
    component: Typography
  },
  { path: "/anuncios", name: "Anúncios", icon: "pe-7s-science", component: Ads },
  { path: "/maps", name: "Maps", icon: "pe-7s-map-marker", component: Maps },
  {
    path: "/notifications",
    name: "Notificações",
    icon: "pe-7s-bell",
    component: Notifications
  },
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default loggedRoutes;
