import React, { useState, useEffect } from 'react';
import { generateWebComponent } from './services/geminiService';
import { INITIAL_CODE, SUGGESTIONS } from './constants';
import { AppStatus } from './types';
import { CodeEditor } from './components/CodeEditor';
import { PreviewFrame } from './components/PreviewFrame';
import { Button } from './components/Button';
import { 
  Sparkles, 
  Code2, 
  Play, 
  Layout, 
  Maximize2, 
  Smartphone, 
  Monitor,
  AlertCircle,
  Columns
} from 'lucide-react';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState(INITIAL_CODE);
  const [debouncedCode, setDebouncedCode] = useState(INITIAL_CODE);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'split'>('preview');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [refreshKey, setRefreshKey] = useState(0);

  // Debounce code updates for the preview to prevent flashing while typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCode(code);
    }, 1000); // 1 second delay
    return () => clearTimeout(timer);
  }, [code]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setStatus(AppStatus.GENERATING);
    try {
      const generatedCode = await generateWebComponent(prompt);
      setCode(generatedCode);
      setDebouncedCode(generatedCode); // Update preview immediately on generation
      setStatus(AppStatus.SUCCESS);
      // Auto switch to preview on success
      if (activeTab === 'code') setActiveTab('preview');
    } catch (error) {
      console.error(error);
      setStatus(AppStatus.ERROR);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
    const textarea = document.querySelector('textarea');
    if (textarea) textarea.focus();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              Gemini CodeCraft
            </h1>
          </div>
          <div className="text-sm text-slate-500 hidden sm:block">
            Powered by Gemini 2.5 Flash
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 flex flex-col lg:flex-row gap-6 overflow-hidden h-[calc(100vh-64px)]">
        
        {/* Left Panel: Controls & Input */}
        <section className="w-full lg:w-1/3 flex flex-col gap-4 overflow-y-auto">
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Describe your idea
            </label>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. A login form with floating labels and a gradient background..."
                className="w-full min-h-[120px] p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-slate-700 bg-slate-50"
              />
              <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                Cmd + Enter to run
              </div>
            </div>

            {status === AppStatus.ERROR && (
               <div className="mt-3 p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-center">
                 <AlertCircle size={16} className="mr-2" />
                 Failed to generate. Please try again.
               </div>
            )}

            <div className="mt-4 flex items-center justify-between">
               <span className="text-xs text-slate-500">
                 {status === AppStatus.GENERATING ? 'Dreaming up code...' : 'Ready to create'}
               </span>
               <Button 
                onClick={handleGenerate} 
                disabled={!prompt.trim() || status === AppStatus.GENERATING}
                isLoading={status === AppStatus.GENERATING}
               >
                 <Sparkles size={16} className="mr-2" />
                 Generate
               </Button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex-1">
             <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
               Quick Starts
             </h3>
             <div className="flex flex-wrap gap-2">
               {SUGGESTIONS.map((s, i) => (
                 <button
                  key={i}
                  onClick={() => handleSuggestionClick(s)}
                  className="text-left text-sm p-2 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 rounded-lg transition-colors duration-200"
                 >
                   {s}
                 </button>
               ))}
             </div>
             
             <div className="mt-8 pt-6 border-t border-slate-100">
               <div className="flex items-center text-slate-500 mb-2">
                  <Code2 size={16} className="mr-2" />
                  <span className="text-sm font-medium">Under the hood</span>
               </div>
               <p className="text-xs text-slate-400 leading-relaxed">
                 Generates a single-file HTML document with Tailwind CSS via CDN. 
                 Code is sandboxed in an iframe for security.
               </p>
             </div>
          </div>
        </section>

        {/* Right Panel: Output */}
        <section className="w-full lg:w-2/3 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Toolbar */}
          <div className="h-12 border-b border-slate-200 flex items-center justify-between px-4 bg-slate-50">
            <div className="flex space-x-1 bg-slate-200/50 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'preview' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Layout size={14} className="mr-2" />
                Preview
              </button>
              <button
                onClick={() => setActiveTab('split')}
                className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'split' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Columns size={14} className="mr-2" />
                Split
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'code' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Code2 size={14} className="mr-2" />
                Code
              </button>
            </div>

            {(activeTab === 'preview' || activeTab === 'split') && (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:flex bg-white border border-slate-200 rounded-lg p-0.5">
                  <button 
                    onClick={() => setViewMode('desktop')}
                    className={`p-1.5 rounded ${viewMode === 'desktop' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                    title="Desktop View"
                  >
                    <Monitor size={16} />
                  </button>
                  <button 
                    onClick={() => setViewMode('mobile')}
                    className={`p-1.5 rounded ${viewMode === 'mobile' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                    title="Mobile View"
                  >
                    <Smartphone size={16} />
                  </button>
                </div>
                <Button variant="icon" onClick={() => setRefreshKey(k => k + 1)} title="Refresh Preview">
                  <Play size={16} />
                </Button>
              </div>
            )}
          </div>

          {/* Viewport */}
          <div className="flex-1 bg-slate-100 relative overflow-hidden flex items-start justify-center p-4 gap-4">
            
            {/* Preview Pane */}
            {(activeTab === 'preview' || activeTab === 'split') && (
               <div 
                 className={`transition-all duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden border border-slate-300 bg-white ${
                   activeTab === 'split' ? 'w-1/2 h-full' : 
                   viewMode === 'mobile' ? 'w-[375px] h-[667px] self-center' : 'w-full h-full'
                 }`}
               >
                 <PreviewFrame code={debouncedCode} refreshKey={refreshKey} />
               </div>
            )}

            {/* Code Editor Pane */}
            {(activeTab === 'code' || activeTab === 'split') && (
              <div className={`${activeTab === 'split' ? 'w-1/2 h-full' : 'w-full h-full'} shadow-lg rounded-lg overflow-hidden`}>
                <CodeEditor code={code} onChange={setCode} />
              </div>
            )}

          </div>

        </section>
      </main>
    </div>
  );
};

export default App;