'use client';

import { useState, useEffect } from 'react';
import { createGuestUrl } from '@/lib/urlUtils';
import { usePathname } from 'next/navigation';
import { Lang } from '@/types';
import QRCode from 'react-qr-code';

interface InvitationLinkGeneratorProps {
  title?: string;
  buttonText?: string;
}

export default function InvitationLinkGenerator({
  title = 'Create Wedding Invitation Links',
  buttonText = 'Generate Links',
}: InvitationLinkGeneratorProps) {
  const [guestNames, setGuestNames] = useState<string>('');
  const [generatedLinks, setGeneratedLinks] = useState<Array<{ name: string; link: string }>>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'qrcode'>('list');
  const [selectedGuest, setSelectedGuest] = useState<string | null>(null);
  const pathname = usePathname();
  
  // Extract language from pathname
  const lang = pathname.split('/')[1] as Lang || 'en';
  
  // Reset copy status after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(null);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [copied]);
  
  const generateLinks = () => {
    if (!guestNames.trim()) return;
    
    const names = guestNames
      .split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0);
    
    const links = names.map(name => ({
      name,
      link: `${window.location.origin}${createGuestUrl(`/${lang}`, name)}`
    }));
    
    setGeneratedLinks(links);
    setActiveTab('list');
  };
  
  const copyToClipboard = (link: string, name: string) => {
    navigator.clipboard.writeText(link)
      .then(() => setCopied(name))
      .catch(err => console.error('Failed to copy: ', err));
  };

  const showQRCode = (name: string) => {
    setSelectedGuest(name);
    setActiveTab('qrcode');
  };
  
  // Find the link for the selected guest
  const selectedGuestLink = selectedGuest 
    ? generatedLinks.find(item => item.name === selectedGuest)?.link 
    : null;

  const downloadCSV = () => {
    if (generatedLinks.length === 0) return;
    const header = 'Name,Link';
    const rows = generatedLinks.map(item => `"${item.name.replace(/"/g, '""')}","${item.link}"`);
    const csvContent = [header, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invitation-links.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="max-w-2xl mx-auto bg-card rounded-lg shadow p-6 my-8">
      <h2 className="text-2xl font-serif mb-4">{title}</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter guest names (one per line):
        </label>
        <textarea
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          rows={5}
          value={guestNames}
          onChange={(e) => setGuestNames(e.target.value)}
          placeholder="John Smith&#10;Jane Doe&#10;Smith Family"
        />
      </div>
      
      <button
        onClick={generateLinks}
        className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded transition-colors"
      >
        {buttonText}
      </button>
      
      {generatedLinks.length > 0 && (
        <div className="mt-8">
          <button
            onClick={downloadCSV}
            className="mb-4 bg-secondary hover:bg-secondary/90 text-primary-foreground font-medium py-2 px-4 rounded transition-colors"
          >
            Export as Excel (CSV)
          </button>
          <div className="flex border-b border-gray-200 mb-4">
            <button
              onClick={() => setActiveTab('list')}
              className={`py-2 px-4 font-medium ${
                activeTab === 'list'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Link List
            </button>
            <button
              onClick={() => {
                if (selectedGuest || generatedLinks.length > 0) {
                  setSelectedGuest(selectedGuest || generatedLinks[0].name);
                  setActiveTab('qrcode');
                }
              }}
              className={`py-2 px-4 font-medium ${
                activeTab === 'qrcode'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              QR Codes
            </button>
          </div>
          
          {activeTab === 'list' && (
            <>
              <h3 className="text-lg font-medium mb-3">Generated Links:</h3>
              <div className="space-y-3">
                {generatedLinks.map((item, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded border border-gray-200">
                    <p className="font-medium mb-1">{item.name}</p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={item.link}
                        className="flex-1 text-sm p-2 bg-card border border-border rounded"
                      />
                      <button
                        onClick={() => copyToClipboard(item.link, item.name)}
                        className={`text-sm py-2 px-3 rounded ${
                          copied === item.name
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        {copied === item.name ? 'Copied!' : 'Copy'}
                      </button>
                      <button
                        onClick={() => showQRCode(item.name)}
                        className="text-sm py-2 px-3 rounded bg-primary text-primary-foreground"
                      >
                        QR
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {activeTab === 'qrcode' && selectedGuestLink && (
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <select 
                  value={selectedGuest || ''} 
                  onChange={(e) => setSelectedGuest(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md"
                >
                  {generatedLinks.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="bg-card p-4 rounded-lg shadow-md">
                <QRCode 
                  value={selectedGuestLink} 
                  size={200}
                  className="mx-auto"
                />
              </div>
              
              <p className="mt-4 text-center font-medium">
                Scan to view personalized invitation for {selectedGuest}
              </p>
              
              <button
                onClick={() => copyToClipboard(selectedGuestLink, selectedGuest || '')}
                className={`mt-4 py-2 px-4 rounded ${
                  copied === selectedGuest
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {copied === selectedGuest ? 'Copied!' : 'Copy Link'}
              </button>
              
              <div className="mt-6 text-sm text-gray-500">
                <p>Print this QR code and include it in physical invitations or share it digitally.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}