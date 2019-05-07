import CompanyRegistration from '../views/CompanyRegistration/CompanyRegistration.jsx';

const notLoggedRoutes = [
    {path: "/companyRegistration", name: "companyRegistration", component: CompanyRegistration},
   // {path: "/recover/:email", name: "Recuperar", component: Recover},
    {redirect: true, path: "/", to: "/login", name: "Login"}
];

export default notLoggedRoutes;