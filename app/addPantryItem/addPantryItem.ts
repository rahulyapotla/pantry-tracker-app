import type { NextApiRequest, NextApiResponse } from 'next';
import { Timestamp } from 'firebase/firestore';
import { addPantryItem } from '../lib/data'
import { v4 as uuidv4 } from 'uuid';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, quantity, expiry_date } = req.body;

    // Ensure fields are valid
    if (typeof name !== 'string' || typeof quantity !== 'number' || !expiry_date) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    const id = uuidv4();
    const expiryDate = new Date(expiry_date);

    // Construct the new pantry item object
    const newItem = {
      id,
      name,
      quantity,
      expiry_date: Timestamp.fromDate(expiryDate),
    };

    try {
      // Add the item to Firestore
      await addPantryItem(newItem);
      res.status(200).json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add item' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
