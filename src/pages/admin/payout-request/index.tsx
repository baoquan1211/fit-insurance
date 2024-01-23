import PayoutTable from "./components/payout-table";

function AdminPayOutRequestPage() {
  return (
    <section className="h-full p-4">
      <h1 className="text-2xl font-semibold">Yêu cầu bồi thường</h1>
      <PayoutTable />
    </section>
  );
}

export default AdminPayOutRequestPage;
