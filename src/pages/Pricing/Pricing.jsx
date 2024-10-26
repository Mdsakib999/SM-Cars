import React from "react";
import CarSubscription from "../../components/PricingComponent/CarSubscription";
import FAQ from "../../components/PricingComponent/FAQ";
import ContactForm from "../../components/HomeComponent/ContactForm";

const Pricing = () => {
  return (
    <div>
      <CarSubscription />
      <FAQ />
      <ContactForm />
    </div>
  );
};

export default Pricing;
