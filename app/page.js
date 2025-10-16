import { redirect } from "next/navigation";

export default function Home() {
  // Instantly redirect to the waitlist page
  redirect("/waitlist");
  return null;
}
