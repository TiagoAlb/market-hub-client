import CompanyRegistration from '../views/CompanyRegistration/CompanyRegistration.jsx';

const notLoggedRoutes = [
    { path: "/companyRegistration", name: "companyRegistration", component: CompanyRegistration },
    { redirect: true, path: "/", to: "/login", name: "Login" }
];

export default notLoggedRoutes;