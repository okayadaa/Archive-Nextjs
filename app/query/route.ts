import { db } from "@vercel/postgres";

const client = await db.connect();

async function listInvoices() {
 	const data = await client.sql`
     SELECT invoices.amount, customers.name
     FROM invoices
     JOIN customers ON invoices.customer_id = customers.id
     WHERE invoices.amount = 666;
   `;

 	return data.rows;
 }

export async function GET() {
  try{
    const invoices = await listInvoices();
    return new Response(JSON.stringify(invoices), {
      headers: {
        'Content-Type': 'application/json' },
        status: 200,
    });
} catch (error) {
    return new Response(JSON.stringify({ error }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
