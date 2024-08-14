'use client'


import { fetchPantryItems, deletePantryItem } from "../lib/data";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { useState, useEffect } from "react";

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  expiry_date: any;
}

interface PantryItemsProps {
  pantryItems: PantryItem[];
}


export default function PantryList({ pantryItems }: PantryItemsProps) {

  const [pantryItemsTemp, setPantryItemsTemp] = useState<PantryItem[]>([]);
  
  useEffect(()=>{
    getPantryItems()
  }, [])
    
  const getPantryItems = async () =>{
    const data = await fetchPantryItems()
    setPantryItemsTemp(data)
  }
  
  
  const handleDeletePantryItem = async itemId => {
    await deletePantryItem(itemId)
    getPantryItems()
  }

    return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Your Pantry</h1>
    
          {/* Add Item Button */}
          <div className="flex justify-end mb-4">
            {/* Add Item Button */}
          <div className="flex justify-end mb-4">
            <Link href="/addPantryItem" className="bg-green-500 text-white py-2 px-4 rounded">Add Item</Link>
          </div>
          </div>
    
          {/* Pantry Items List */}
          <ul className="space-y-4">
            {pantryItemsTemp.length === 0 ? (
              <li>No items in pantry.</li>
            ) : (
              pantryItemsTemp.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center bg-orange-400 p-4 rounded shadow"
                >
                  <div>
                    <h2 className="text-2xl font-semibold">{item.name}</h2>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-gray-500">Expiry Date: {item.expiry_date}</p>
                  </div>
                   
                  <div className="flex space-x-2">
                  <Link href={`/editPantryItems/${item.id}`} className="bg-blue-500 text-white py-2 px-4 rounded">
                    Edit
                  </Link>
                 <button
                      className="bg-red-500 text-white py-2 px-4 rounded"
                      onClick={() => handleDeletePantryItem(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                 
                </li>
              ))
            )}
          </ul>
        </div>
      );
  };

