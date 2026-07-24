'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function QRGeneratorPage() {
  const [tableNumber, setTableNumber] = useState('1');
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    // Generate the base URL dynamically based on current host
    if (typeof window !== 'undefined') {
      setBaseUrl(`${window.location.protocol}//${window.location.host}`);
    }
  }, []);

  const qrUrl = `${baseUrl}/menu?table=${tableNumber}`;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">QR Code Generator</h1>
          <p className="text-slate-400 mt-1">Generate scannable QR codes for your restaurant tables.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Configuration</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Table Number</label>
              <input 
                type="number" 
                min="1"
                max="100"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter table number..."
              />
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <h3 className="text-sm font-bold text-blue-400 mb-1">Generated URL</h3>
              <p className="text-xs text-blue-200 break-all">{qrUrl}</p>
            </div>
            
            <p className="text-xs text-slate-400">
              Customers scanning this code will be redirected directly to the menu with their table number pre-assigned for ordering.
            </p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center min-h-[300px]">
          <div className="bg-white p-4 rounded-xl shadow-2xl">
            {baseUrl && (
              <QRCodeSVG 
                value={qrUrl} 
                size={200}
                level="H"
                includeMargin={true}
                fgColor="#000000"
                bgColor="#ffffff"
              />
            )}
          </div>
          
          <button 
            className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/25 hover:from-blue-400 hover:to-indigo-400 transition-all"
            onClick={() => window.print()}
          >
            🖨️ Print QR Code
          </button>
        </div>
      </div>
    </div>
  );
}
