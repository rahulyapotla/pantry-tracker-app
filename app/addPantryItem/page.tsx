import { redirect } from 'next/navigation';
import { addPantryItem } from '../lib/data';
import { Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export default function AddPantryItemPage() {
  async function handleSubmit(formData: FormData) {
    'use server';
    const name = formData.get('name')?.toString() || '';
    const quantity = Number(formData.get('quantity'));
    const expiry_date = new Date(formData.get('expiry_date')?.toString() || '');

    const id = uuidv4();

    // Construct the new pantry item object
    const newItem = {
      id,
      name,
      quantity,
      expiry_date: Timestamp.fromDate(expiry_date),
    };

    // Add the item to Firestore
    await addPantryItem(newItem);

    // Redirect to the pantry items page after submission
    redirect('/pantryitems');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Add New Item</h1>
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg font-medium">Name:</label>
          <input type="text" name="name" id="name" className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-lg font-medium">Quantity:</label>
          <input type="number" name="quantity" id="quantity" className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div>
          <label htmlFor="expiry_date" className="block text-lg font-medium">Expiry Date:</label>
          <input type="date" name="expiry_date" id="expiry_date" className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Add Item</button>
      </form>
    </div>
  );
}

