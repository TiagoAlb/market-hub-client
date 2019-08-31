import Dashboard from "../views/Dashboard/Dashboard.jsx";
import UserProfile from "../views/UserProfile/UserProfile.jsx";
import MarketplacesRoute from "../views/Marketplaces/MarketplacesRoute.jsx";
import TableList from "../views/TableList/TableList.jsx";
import Typography from "../views/Typography/Typography.jsx";
import Ads from "../views/Ads/Ads.jsx";
import Maps from "../views/Maps/Maps.jsx";
import Notifications from "../views/Notifications/Notifications.jsx";
import Upgrade from "../views/Upgrade/Upgrade.jsx";

const sideBarRoutes = [
  {
    path: "/dashboard",
    name: "Painel",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    path: "/user",
    name: "Cadastro",
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
    path: "/anuncios",
    name: "Anúncios",
    icon: "pe-7s-news-paper",
    component: Ads
  },
  {
    path: "/carteira",
    name: "Carteira",
    icon: "pe-7s-wallet",
    component: MarketplacesRoute
  },/*
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
  { path: "/icons", name: "Icons", icon: "pe-7s-science", component: Icons },
  { path: "/maps", name: "Maps", icon: "pe-7s-map-marker", component: Maps },
  {
    path: "/notifications",
    name: "Notificações",
    icon: "pe-7s-bell",
    component: Notifications
  }, 
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "pe-7s-rocket",
    component: Upgrade
  },*/
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default sideBarRoutes;
