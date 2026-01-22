import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface PreviewFrameProps {
  code: string;
  refreshKey?: number; // Used to force reload
}

export const PreviewFrame: React.FC<PreviewFrameProps> = ({ code, refreshKey }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    // When code changes or refresh requested, update the iframe
    // We use a key on the iframe to fully unmount/remount it for clean state reset
    setKey(prev => prev + 1);
  }, [code, refreshKey]);

  return (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm relative">
        <div className="absolute top-2 right-2 z-10 opacity-0 hover:opacity-100 transition-opacity">
           {/* Hidden reload trigger area if needed, but mostly managed by parent */}
        </div>
      <iframe
        key={key}
        ref={iframeRef}
        title="Preview"
        srcDoc={code}
        className="w-full h-full border-none bg-white"
        sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin allow-downloads"
      />
    </div>
  );
};