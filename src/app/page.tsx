"use client";

import { useState } from 'react';
import ConnectionPage from '@/components/ConnectionPage';
import TransferPage from '@/components/TransferPage';
import usePeerConnection from '@/hooks/usePeerConnection';
import FileTransfer from "@/components/FileTransfer";

export default function Home() {
  // Handle received data
  const [receivedFiles, setReceivedFiles] = useState<any[]>([]);
  const [receivedTexts, setReceivedTexts] = useState<any[]>([]);

  // Process received data
  function handleReceivedData(data: any) {
    if (data.type === 'file') {
      // Receive file
      const blob = new Blob([data.data], { type: data.dataType });
      const url = URL.createObjectURL(blob);
      
      setReceivedFiles(prev => [...prev, {
        name: data.name,
        size: data.size,
        url,
        type: data.dataType,
        id: Date.now().toString()
      }]);
    } else if (data.type === 'text') {
      // Receive text
      setReceivedTexts(prev => [...prev, {
        content: data.content,
        timestamp: new Date(data.timestamp).toLocaleString(),
        id: Date.now().toString()
      }]);
    }
  }

  const { 
    myPeerId, 
    connectionStatus, 
    connection, 
    connected,
    connectToPeer, 
    sendData
  } = usePeerConnection({
    onData: handleReceivedData
  });

  return (
    <main className="app-content">
      <FileTransfer />
    </main>
  );
} 