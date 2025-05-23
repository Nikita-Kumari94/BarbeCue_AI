import React, { useEffect, useState } from "react";
import bg1 from '../../assets/bg1.jpg';

function RestaurantDashboard() {
  const [ngoList, setNgoList] = useState([]);

  useEffect(() => {
    // TODO: Fetch NGO requests from backend
    setNgoList([
      { id: 1, name: "Hope Orphanage", location: "JanakPuri, New Delhi-56"},
      { id: 2, name: "Care NGO", location: "Najafgarh, New Delhi-32"},
      { id: 3, name: "Umang NGO", location: "Mongolpuri, New Delhi-88"},
      { id: 4, name: "Ek Prayaas Trust", location: "JanakPuri, New Delhi-49"},
    ]);
  }, []);

  return (
    <div className="min-h-screen p-12 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg1})` }}
    >
      <h2 className="text-3xl font-bold text-yellow-900 text-center mb-10">NGO Requests</h2>
      <div className="grid gap-4 max-w-3xl mx-auto">
        {ngoList.map((ngo) => (
          <div key={ngo.id} className="bg-white p-10 rounded-md shadow-md flex flex-row justify-between">
            <div>
            <h3 className="text-xl font-semibold text-yellow-800">{ngo.name}</h3>
            <p className="text-sm text-gray-700">Location: {ngo.location}</p></div>
            <button className="mt-3 bg-yellow-700 text-white py-1 px-4 rounded hover:bg-yellow-800">
              Contact NGO
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantDashboard;