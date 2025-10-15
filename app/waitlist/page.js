import Head from "next/head";
import WaitlistNav from "@/components/WaitlistNav";
//import WaitlistNavbar from "/components/WaitlistNavbar";
import WaitlistHero from "/components/WaitlistHero";
import Countdown from "/components/Countdown";
import Mission from "/components/Mission";
import WFeatures from "/components/WFeatures";
import JoinMovement from "/components/JoinMovement";
import WaitlistFooter from "/components/WaitlistFooter";



export default function Home() {
  return (
    <>
      <Head>
        <title>LangMaster Waitlist – Master African Languages with AI</title>
        <meta
          name="description"
          content="Learn Yoruba, Igbo, Hausa fast, fun, and culturally authentic with AI-powered LangMaster."
        />
        <meta property="og:title" content="LangMaster – Master African Languages with AI" />
        <meta property="og:description" content="Learn Yoruba, Igbo, Hausa fast, fun, and culturally authentic with AI-powered LangMaster." />
        <meta property="og:image" content="/logo.png" />
      </Head>
      <WaitlistNav />
         <WaitlistHero />
            <Countdown />
             <Mission />
              <WFeatures />
                <JoinMovement />
                 <WaitlistFooter />
    </>
  );
}
