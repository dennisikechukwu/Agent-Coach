import { redirect } from "next/navigation";

// Analytics is a client-side tab on /dashboard, not its own route.
// Redirect any direct visits back to the dashboard.
export default function AnalyticsRedirect() {
  redirect("/dashboard");
}
