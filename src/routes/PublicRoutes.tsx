import React from "react";
import { Route } from "react-router-dom";
import Callback from "../pages/Callback";
import ContactUs from "../pages/ContactUs";
const Support = React.lazy(() => import("../pages/Support"));
const Docs = React.lazy(() => import("../pages/Docs"));
const Features = React.lazy(() => import("../pages/Features"));
const Home = React.lazy(() => import("../pages/Home"));
const HelpUs = React.lazy(() => import("../pages/HelpUs"));
const Overview = React.lazy(() => import("../pages/Overview"));
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
