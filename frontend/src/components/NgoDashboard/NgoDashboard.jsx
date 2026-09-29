import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function NgoDashboard() {
  const [donations, setDonations] = useState([]), [message, setMessage] = useState('');
  const load = () => api('/donations').then(setDonations).catch((error) => setMessage(error.message));
  useEffect(() => { load(); }, []);
  const request = async (id) => { try { await api(`/donations/${id}/requests`, { method: 'POST', body: JSON.stringify({}) }); setMessage('Request submitted.'); load(); } catch (error) { setMessage(error.message); } };
  return <main className="min-h-screen bg-amber-50 p-6 md:p-12"><div className="mx-auto max-w-4xl"><h1 className="mb-2 text-3xl font-bold text-yellow-900">Available food donations</h1><p className="mb-6 text-gray-700">Verified NGOs can request available donations.</p>{message && <p className="mb-4 rounded bg-white p-3 text-yellow-900">{message}</p>}<div className="grid gap-4">{donations.length ? donations.map((item) => <article key={item.id} className="rounded-xl bg-white p-5 shadow"><h2 className="text-xl font-bold">{item.food_name}</h2><p>{item.quantity} {item.unit} from {item.restaurant_name}</p><p className="text-sm text-gray-600">Pickup: {item.pickup_address} · Expires: {new Date(item.expires_at).toLocaleString()}</p><button onClick={() => request(item.id)} className="mt-3 rounded bg-yellow-800 px-4 py-2 text-white">Request food</button></article>) : <p>No available donations right now.</p>}</div></div></main>;
}
