import type { Metadata } from 'next';
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import EditInvoiceForm from "@/app/ui/invoices/edit-form";
import { notFound } from "next/navigation";

type TPageProps = {
  params: Promise<{
    id: string;
  }>;
}
type TPageParams = TPageProps["params"];

export const metadata: Metadata = {
  title: "Invoice Edit"
};

export default async function Page(props: TPageProps) {
  const params = await props.params;
  const invoiceId = params.id;

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(invoiceId),
    fetchCustomers()
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/edit/${invoiceId}`,
            active: true,
          },
        ]}
      />
      <EditInvoiceForm invoice={invoice} customers={customers} />
    </main>
  )
}

