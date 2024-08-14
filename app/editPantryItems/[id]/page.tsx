import { Timestamp } from 'firebase/firestore';
import { fetchPantryItemById, updatePantryItem } from '../../lib/data'
import { redirect } from 'next/navigation';

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  expiry_date: Timestamp;
}

interface EditPantryItemProps {
  params: { id: string };
}

export default async function EditPantryItemPage({ params }: EditPantryItemProps) {
  const { id } = params;

  // Fetch the pantry item
  const pantryItem = await fetchPantryItemById(id) as PantryItem;

  async function handleSubmit(formData: FormData) {
    'use server';

    const name = formData.get('name') as string;
    const quantity = Number(formData.get('quantity'));
    const expiry_date = new Date(formData.get('expiry_date') as string).toISOString();

    // Update the item in Firestore
    await updatePantryItem(id, { name, quantity, expiry_date });

    // Redirect to pantry items list
    redirect('/pantryitems');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Edit Pantry Item</h1>
      <form action={handleSubmit} method="POST" className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg font-medium">Name:</label>
          <input type="text" name="name" id="name" defaultValue={pantryItem.name} className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-lg font-medium">Quantity:</label>
          <input type="number" name="quantity" id="quantity" defaultValue={pantryItem.quantity} className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div>
          <label htmlFor="expiry_date" className="block text-lg font-medium">Expiry Date:</label>
          <input type="date" name="expiry_date" id="expiry_date" defaultValue={new Date(pantryItem.expiry_date).toISOString().substr(0, 10)} className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update Item</button>
      </form>
    </div>
  );
}
