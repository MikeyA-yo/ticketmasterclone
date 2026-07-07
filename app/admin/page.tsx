import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "../lib/auth";
import { isDbConfigured } from "../lib/mongodb";
import { listOrders } from "../lib/db/orders";
import AdminDashboard from "./admin-dashboard";

export const metadata: Metadata = { title: "Admin | Ticketmaster" };

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const orders = await listOrders();

  return (
    <div className="min-h-screen bg-tm-surface">
      <AdminDashboard orders={orders} dbConfigured={isDbConfigured()} />
    </div>
  );
}
