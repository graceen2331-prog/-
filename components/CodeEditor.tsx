import React from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from './Button';

interface CodeEditorProps {
  code: string;
  onChange?: (newCode: string) => void;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, readOnly = false }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code', err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-slate-300 font-mono text-sm rounded-lg overflow-hidden border border-slate-800 shadow-inner">
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-slate-700">
        <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
          {readOnly ? 'Output Code' : 'Editable Code'}
        </span>
        <Button 
          variant="ghost" 
          onClick={handleCopy} 
          className="!text-xs !p-1 hover:!bg-slate-700 text-slate-400"
          title="Copy Code"
        >
          {copied ? <Check size={14} className="text-green-400 mr-1" /> : <Copy size={14} className="mr-1" />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <div className="flex-1 relative">
        <textarea
          value={code}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          className="w-full h-full p-4 bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm resize-none focus:outline-none custom-scrollbar"
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
      </div>
    </div>
  );
};