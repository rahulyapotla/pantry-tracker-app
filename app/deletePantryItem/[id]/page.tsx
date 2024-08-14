'use client';

import { deletePantryItem, fetchPantryItems } from "../../lib/data"
import { useState } from "react";

interface DeleteButtonProps {
  id: string;
  onDelete: () => void;  // Callback function to update the parent component's state
}

export default function DeleteButton({ id, onDelete }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await deletePantryItem(id);
    onDelete();  // Trigger the callback to refresh the list
    setLoading(false);
  }

  return (
    <button
      className="bg-red-500 text-white py-2 px-4 rounded"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
}
