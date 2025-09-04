import { Hero } from "@/components/hero";
import { TrustIndicators } from "@/components/trust-indicators";
import { Features } from "@/components/features";
import { Capabilities } from "@/components/capabilities";
import { Advantages } from "@/components/advantages";
import { Solutions } from "@/components/solutions";
import { Testimonials } from "@/components/testimonials";
import { Workflow } from "@/components/workflow";
import { Security } from "@/components/security";
import { CTA } from "@/components/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustIndicators />
      <Features />
      <Capabilities />
      <Advantages />
      <Solutions />
      <Testimonials />
      <Workflow />
      <Security />
      <CTA />
    </>
  );
}