import React, { useEffect, useState } from 'react';
import api from './api';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in many bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function Header({onNew}) {
  return (
    <header className="bg-green-700 text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">MG</div>
        <div>
          <div className="font-bold text-lg">Machakos GreenLoop</div>
          <div className="text-sm">Linking producers • recyclers • champions • county</div>
        </div>
      </div>
      <div>
        <button onClick={onNew} className="bg-white text-green-700 px-3 py-1 rounded">New Pickup</button>
      </div>
    </header>
  )
}

function Sidebar({producers, recyclers, champions, onSchedule}) {
  return (
    <aside className="w-full lg:w-96 p-3 space-y-3">
      <div className="bg-white p-3 rounded shadow">
        <div className="font-semibold">Summary</div>
        <div className="mt-2 text-sm">Producers: {producers.length} • Recyclers: {recyclers.length} • Champions: {champions.length}</div>
      </div>

      <div className="bg-white p-3 rounded shadow">
        <div className="font-semibold mb-2">Top Producers</div>
        {producers.map(p => (
          <div key={p.id} className="border p-2 rounded mb-2">
            <div className="font-medium">{p.name}</div>
            <div className="text-xs text-gray-600">{p.location} • {p.wasteTypes.join(', ')}</div>
            <div className="mt-1"><button onClick={()=>onSchedule(p)} className="text-xs underline">Schedule pickup</button></div>
          </div>
        ))}
      </div>

      <div className="bg-white p-3 rounded shadow">
        <div className="font-semibold mb-2">Recyclers</div>
        {recyclers.map(r => (
          <div key={r.id} className="border p-2 rounded mb-2">
            <div className="font-medium">{r.name}</div>
            <div className="text-xs text-gray-600">{r.materials.join(', ')} • Capacity {r.capacityKg}kg</div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default function App(){
  const [producers, setProducers] = useState([]);
  const [recyclers, setRecyclers] = useState([]);
  const [champions, setChampions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProducer, setSelectedProducer] = useState(null);
  const center = [-1.509, 37.262]; // Machakos Town center

  useEffect(()=>{
    async function load(){
      const p = await api.getProducers();
      const r = await api.getRecyclers();
      const c = await api.getChampions();
      setProducers(p); setRecyclers(r); setChampions(c);
    }
    load();
  },[]);

  const handleSchedule = (producer) => {
    setSelectedProducer(producer);
    setShowModal(true);
  };

  const handleSubmit = async (form) => {
    await api.createPickupRequest(form);
    alert('Pickup scheduled (mock).');
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNew={()=>setShowModal(true)} />
      <div className="flex flex-1 p-4 gap-4">
        <div className="flex-1 bg-white rounded shadow p-3">
          <div className="h-96 rounded overflow-hidden border">
            <MapContainer center={center} zoom={13} style={{height:'100%', width:'100%'}}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {/* Producers */}
              {producers.map(p => (
                <Marker key={p.id} position={p.coords}>
                  <Popup>
                    <div><strong>{p.name}</strong></div>
                    <div className="text-xs">{p.location}</div>
                    <div className="text-xs">Types: {p.wasteTypes.join(', ')}</div>
                    <div style={{marginTop:6}}><button onClick={()=>handleSchedule(p)} className="text-xs underline">Schedule pickup</button></div>
                  </Popup>
                </Marker>
              ))}

              {/* Recyclers */}
              {recyclers.map(r => (
                <CircleMarker key={'r'+r.id} center={r.coords} radius={8}>
                  <Popup><div><strong>{r.name}</strong></div><div className="text-xs">Materials: {r.materials.join(', ')}</div></Popup>
                </CircleMarker>
              ))}

              {/* Champions */}
              {champions.map(c => (
                <CircleMarker key={'c'+c.id} center={c.coords} radius={6}>
                  <Popup><div><strong>{c.name}</strong></div><div className="text-xs">Area: {c.area}</div></Popup>
                </CircleMarker>
              ))}

            </MapContainer>
          </div>

          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white p-2 rounded shadow">
              <div className="text-sm text-gray-500">Active Producers</div>
              <div className="font-bold text-xl">{producers.length}</div>
            </div>
            <div className="bg-white p-2 rounded shadow">
              <div className="text-sm text-gray-500">Registered Recyclers</div>
              <div className="font-bold text-xl">{recyclers.length}</div>
            </div>
            <div className="bg-white p-2 rounded shadow">
              <div className="text-sm text-gray-500">Champions</div>
              <div className="font-bold text-xl">{champions.length}</div>
            </div>
          </div>
        </div>

        <Sidebar producers={producers} recyclers={recyclers} champions={champions} onSchedule={handleSchedule} />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-4 rounded">
            <div className="flex justify-between items-center mb-2">
              <div className="font-bold">Schedule Pickup</div>
              <button onClick={()=>setShowModal(false)} className="text-sm text-gray-600">Close</button>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Producer: <strong>{selectedProducer ? selectedProducer.name : 'New'}</strong></div>
              <form onSubmit={(e)=>{ e.preventDefault(); const weight = e.target.weight.value; handleSubmit({ producerId: selectedProducer?.id || null, producerName: selectedProducer?.name || e.target.name.value, weightKg: weight }); }}>
                {!selectedProducer && (
                  <div className="mb-2">
                    <input name="name" placeholder="Producer name" className="w-full p-2 border rounded" />
                  </div>
                )}
                <div className="mb-2">
                  <input name="weight" type="number" defaultValue={10} className="w-full p-2 border rounded" />
                </div>
                <div className="flex gap-2">
                  <button className="bg-green-700 text-white px-3 py-1 rounded">Schedule</button>
                  <button type="button" onClick={()=>setShowModal(false)} className="px-3 py-1 border rounded">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <footer className="p-3 text-center text-xs text-gray-600">Machakos GreenLoop — prototype</footer>
    </div>
  )
}
