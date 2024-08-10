
interface PantryItem {
  id: number;
  name: string;
  quantity: number;
  expiryDate: string;
}

const pantryItems: PantryItem[] = [
  { id: 1, name: 'Rice', quantity: 5, expiryDate: '2025-01-01' },
  { id: 2, name: 'Beans', quantity: 3, expiryDate: '2024-10-10' },
  { id: 3, name: 'Flour', quantity: 2, expiryDate: '2024-06-15' },
];

export default function PantryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Your Pantry</h1>

      {/* Add Item Button */}
      <div className="flex justify-end mb-4">
       
          <a className="bg-green-500 text-white py-2 px-4 rounded">Add Item</a>
      
      </div>

      {/* Pantry Items List */}
      <ul className="space-y-4">
        {pantryItems.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-white p-4 rounded shadow"
          >
            <div>
              <h2 className="text-2xl font-semibold">{item.name}</h2>
              <p className="text-gray-500">Quantity: {item.quantity}</p>
              <p className="text-gray-500">Expiry Date: {item.expiryDate}</p>
            </div>
            <div>
              {/* Edit Button */}
            
                <a className="bg-blue-500 text-white py-2 px-4 rounded">Edit</a>
             
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
