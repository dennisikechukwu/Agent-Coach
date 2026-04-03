import { AuthGuard } from "../../components/AuthGuard";
import { DashboardProvider } from "../../components/providers/DashboardProvider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <DashboardProvider>
        {children}
      </DashboardProvider>
    </AuthGuard>
  );
}
