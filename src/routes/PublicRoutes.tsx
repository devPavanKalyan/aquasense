import React from "react";
import { Route } from "react-router-dom";
import ContactUs from "../components/pre_login/ContactUs";
const Support = React.lazy(() => import("../components/pre_login/Support"));
const Docs = React.lazy(() => import("../components/pre_login/Docs"));
const Features = React.lazy(() => import("../components/pre_login/Features"));
const Home = React.lazy(() => import("../components/pre_login/Home"));
const HelpUs = React.lazy(() => import("../components/pre_login/HelpUs"));
const Overview = React.lazy(() => import("../components/pre_login/Overview"));
const Callback = React.lazy(() => import("../Callback"));
const NotFound = React.lazy(() => import("../components/not_found/NotFound"));

const PublicRoutes = () => {
  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/helpus" element={<HelpUs />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/features" element={<Features />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/support" element={<Support />} />
      <Route path="*" element={<NotFound />} />
    </>
  );
};
export default PublicRoutes;
