import Head from "next/head";
import LandingNavbar from "@/components/LandingNavbar";
import LandingHero from "@/components/LandingHero";
import LandingLanguageCards from "@/components/LandingLanguageCards";
import LanguageAndHowItWorks from "@/components/LanguageAndHowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import MoreThanWords from "@/components/MoreThanWords";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import FollowModal from "@/components/FollowModal";
import LandingFooter from "@/components/LandingFooter";


export default function Home() {
  return (
    <>
      <Head>
        <title>LangMaster – Master African Languages with AI</title>
        <meta
          name="description"
          content="Learn Yoruba, Igbo, Hausa fast, fun, and culturally authentic with AI-powered LangMaster."
        />
        <meta property="og:title" content="LangMaster – Master African Languages with AI" />
        <meta property="og:description" content="Learn Yoruba, Igbo, Hausa fast, fun, and culturally authentic with AI-powered LangMaster." />
        <meta property="og:image" content="/logo.png" />
      </Head>
       <FollowModal />
      <LandingNavbar />
      <LandingHero />
      <LanguageAndHowItWorks />
       <Features />
       <Testimonials />

          <Pricing />
            <CTA />
            <MoreThanWords />
      <LandingFooter />
    </>
  );
}
