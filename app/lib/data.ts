// app/lib/data/data.ts
import { doc, getFirestore, collection, getDocs, getDoc, addDoc, updateDoc, DocumentReference, Timestamp, deleteDoc } from 'firebase/firestore';
import { app } from "../firebaseConfig"

const db = getFirestore(app)

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  expiry_date: Timestamp;
}

// Function to fetch pantry items from Firebase
export async function fetchPantryItems() {
    try {
      // Reference to the 'pantryItems' collection
      const pantryCollectionRef = collection(db, 'pantry-items');
  
      // Fetch all documents in the 'pantryItems' collection
      const snapshot = await getDocs(pantryCollectionRef);
  
      // Map through the documents and extract the data
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      return items;
    } catch (error) {
      console.error("Error fetching pantry items:", error);
      throw new Error('Could not fetch pantry items.');
    }
}


export async function addPantryItem(item: PantryItem) {
  const pantryCollectionRef = collection(db, 'pantry-items');
  const docRef: DocumentReference = await addDoc(pantryCollectionRef, item);

  // Update the document with the generated ID
  await updateDoc(docRef, { id: docRef.id });
}

export async function fetchPantryItemById(id: string) {
  const docRef = doc(db, 'pantry-items', id);
  console.log(id)
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      ...data,
      expiry_date: data.expiry_date ? data.expiry_date.toDate().toISOString().substr(0, 10) : null,  
    };
  } else {
    throw new Error('No such document!');
  }
}

export async function updatePantryItem(id: string, updatedData: Partial<PantryItem>) {
  const docRef = doc(db, 'pantry-items', id);
  await updateDoc(docRef, updatedData);
}

export async function deletePantryItem(id: string) {
  const docRef = doc(db, 'pantry-items', id);
  await deleteDoc(docRef)
}