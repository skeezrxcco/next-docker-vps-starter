import { Suspense } from "react";
import UsersCard from "./components/UsersCard";
export const dynamic = 'force-dynamic'  

export default async function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <div className="space-y-6">
        <Suspense fallback={<div>Loading...</div>}>
          <UsersCard />
        </Suspense>
      </div>
    </main>
  );
}
