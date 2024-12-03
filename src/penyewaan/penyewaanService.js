import { db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';

export const simpanPenyewaan = async (data) => {
    try {
        await addDoc(collection(db, 'penyewaan'), data);
        return true;
    } catch (error) {
        console.error('Gagal menyimpan data penyewaan:', error);
        return false;
    }
};
