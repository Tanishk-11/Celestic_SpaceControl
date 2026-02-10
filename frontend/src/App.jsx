import { useState } from 'react';
import axios from 'axios';
import { 
  Upload, Rocket, Radio, 
  Cpu, Activity, Search, 
  Terminal, ShieldCheck, Globe,
  Crosshair, MapPin, Info, Zap
} from 'lucide-react';

// --- COMPONENT: PARSED MISSION REPORT (ANALYZER) ---
const ParsedMissionReport = ({ rawText }) => {
  const extractSection = (marker) => {
    const lines = rawText.split('\n');
    const line = lines.find(l => l.includes(marker));
    return line ? line.split(marker)[1].trim() : null;
  };

  const idRaw = extractSection("**Identification**:") || "Unknown Object";
  const visRaw = extractSection("**Visibility Check**:") || "Data Unavailable";
  const guideRaw = extractSection("**Guide**:") || "No navigation data available.";

  const identification = idRaw.replace(/[\*\(\)]/g, '').split("Confidence")[0].trim();
  const confidence = idRaw.includes("Confidence") ? idRaw.split("Confidence:")[1].replace(')', '').trim() : "N/A";

  return (
    <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* CARD 1: IDENTIFICATION */}
      <div className="bg-black/80 border border-white/20 rounded-lg p-4 relative overflow-hidden group hover:border-white/50 transition-all">
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <Crosshair className="w-12 h-12 text-white" />
        </div>
        <div className="flex justify-between items-start mb-1">
          <h4 className="text-gray-400 text-[10px] font-orbitron tracking-[0.2em] uppercase">Target ID</h4>
          <span className="bg-white/10 text-white text-[10px] px-2 py-0.5 rounded border border-white/20 font-mono">
            CONF: {confidence}
          </span>
        </div>
        <p className="text-2xl font-orbitron text-white tracking-wider">{identification}</p>
      </div>

      {/* CARD 2: PHYSICS */}
      <div className={`border rounded-lg p-4 relative ${
        visRaw.toLowerCase().includes("not visible") 
        ? "bg-red-950/20 border-red-500/30" 
        : "bg-emerald-950/20 border-emerald-500/30"
      }`}>
        <div className="flex justify-between items-start mb-1">
          <h4 className={`${
            visRaw.toLowerCase().includes("not visible") ? "text-red-400" : "text-emerald-400"
          } text-[10px] font-orbitron tracking-[0.2em] uppercase`}>Physics Validation</h4>
          <Globe className={`w-3 h-3 ${
             visRaw.toLowerCase().includes("not visible") ? "text-red-400" : "text-emerald-400"
          }`} />
        </div>
        <p className="text-sm font-inter font-medium text-gray-200">
          {visRaw.replace(/[\*\(\)]/g, '')}
        </p>
      </div>

      {/* CARD 3: NAVIGATION */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <div className="flex justify-between items-start mb-1">
          <h4 className="text-gray-400 text-[10px] font-orbitron tracking-[0.2em] uppercase">Vector</h4>
          <MapPin className="w-3 h-3 text-gray-400" />
        </div>
        <p className="text-sm font-inter text-gray-300 leading-relaxed">
          "{guideRaw.replace(/[\*\"]/g, '')}"
        </p>
      </div>

    </div>
  );
};

// --- COMPONENT: PARSED NEWS REPORT (NEW!) ---
const ParsedNewsReport = ({ rawText }) => {
  // Parsing Logic based on your Agent's Output Format
  // It looks for "**Headlines**:" and "**Did you know?**:"
  const parts = rawText.split("**Did you know?**:");
  
  const headlinesRaw = parts[0] ? parts[0].replace("**Headlines**:", "").trim() : "No Intelligence Available.";
  const factRaw = parts[1] ? parts[1].trim() : "Archive data corrupted.";

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
      
      {/* SECTION 1: MAIN INTEL */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-white"></div>
        <div className="flex items-center gap-2 mb-4">
           <Radio className="w-4 h-4 text-white animate-pulse" />
           <h3 className="text-xs font-orbitron tracking-[0.2em] text-gray-400 uppercase">Incoming Intelligence</h3>
        </div>
        <div className="prose prose-invert max-w-none font-inter text-sm text-gray-200 leading-7 whitespace-pre-wrap">
          {headlinesRaw}
        </div>
      </div>

      {/* SECTION 2: FUN FACT (TRIVIA) */}
      <div className="bg-white/5 border border-dashed border-white/10 rounded-lg p-4 flex items-start gap-4">
        <div className="p-2 bg-black rounded-full border border-white/20">
          <Zap className="w-4 h-4 text-yellow-400" />
        </div>
        <div>
          <h4 className="text-[10px] font-orbitron tracking-[0.2em] text-gray-400 uppercase mb-1">Archive Trivia</h4>
          <p className="font-mono text-xs text-gray-300 leading-relaxed">
            {factRaw}
          </p>
        </div>
      </div>

    </div>
  );
};

// --- MAIN APP ---

function App() {
  const [activeTab, setActiveTab] = useState('analyzer'); 
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("SYSTEM READY");
  
  // News State
  const [newsTopic, setNewsTopic] = useState("Space Exploration");
  const [newsResult, setNewsResult] = useState(null);
  const [loadingNews, setLoadingNews] = useState(false);

  // --- CRITICAL UPDATE: DYNAMIC URL ---
  // This automatically switches between Localhost (for dev) and Render (for production)
  const API_URL = 'https://celestic-spacecontrol-backend.onrender.com';
  // --- HANDLERS ---
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
      setStatus("IMAGE BUFFERED");
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    setStatus("ACQUIRING GPS LOCK...");

    if (!navigator.geolocation) {
      alert("GEOLOCATION MODULE NOT FOUND");
      setAnalyzing(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      setStatus("PROCESSING TELEMETRY...");
      const formData = new FormData();
      formData.append('image', file);
      formData.append('lat', position.coords.latitude);
      formData.append('lon', position.coords.longitude);

      try {
        setStatus("COMPUTING PHYSICS...");
        // UPDATED: Using API_URL variable
        const response = await axios.post(`${API_URL}/analyze`, formData);
        setResult(response.data.analysis);
        setStatus("ANALYSIS COMPLETE");
      } catch (error) {
        setStatus("CONNECTION FAILED");
        console.error("Analyze Error:", error);
      } finally {
        setAnalyzing(false);
      }
    });
  };

  const handleNewsFetch = async () => {
    setLoadingNews(true);
    setNewsResult(null);
    try {
      // UPDATED: Using API_URL variable
      const response = await axios.post(`${API_URL}/news`, {
        topic: newsTopic
      });
      setNewsResult(response.data.news);
    } catch (error) {
      console.error("News Error:", error);
      setNewsResult("ERROR: DATABASE UNREACHABLE.");
    } finally {
      setLoadingNews(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-inter selection:bg-white/20">
      
      {/* --- SIDEBAR --- */}
      <div className="w-64 border-r border-white/10 bg-[#0a0a0a] flex flex-col p-5 z-20">
        <div className="mb-10 flex items-center gap-3">
          {/* LOGO IMAGE */}
          <img 
            src="/Supernova.webp" 
            alt="Celestic Logo" 
            className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" 
          />
          <div>
            <h1 className="font-orbitron font-bold text-lg tracking-wider text-white">CELESTIC</h1>
            <p className="text-[9px] text-gray-500 font-mono tracking-[0.2em] uppercase">Space Control</p>
          </div>
        </div>

        <nav className="space-y-1 flex-1">
          <button 
            onClick={() => setActiveTab('analyzer')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
              activeTab === 'analyzer' 
              ? 'bg-white text-black' 
              : 'text-gray-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <Rocket className="w-4 h-4" />
            <span className="font-inter text-sm tracking-wide">Sky Analyzer</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('news')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
              activeTab === 'news' 
              ? 'bg-white text-black' 
              : 'text-gray-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span className="font-inter text-sm tracking-wide">All About Space</span>
          </button>
        </nav>

        {/* Footer */}
        <div className="mt-auto border-t border-white/5 pt-4 space-y-2">
          <div className="flex items-center gap-2 text-[10px] text-gray-600 font-mono">
            <ShieldCheck className="w-3 h-3 text-emerald-500" /> SYSTEM OPTIMAL
          </div>
          <div className="flex items-center gap-2 text-[10px] text-gray-600 font-mono">
            <Globe className="w-3 h-3 text-blue-500" /> ONLINE
          </div>
        </div>
      </div>

      {/* --- MAIN DISPLAY --- */}
      <div className="flex-1 relative overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
        {/* Subtle Starfield */}
        <div className="absolute inset-0 stars opacity-20 pointer-events-none"></div>
        
        <header className="sticky top-0 z-10 px-8 py-5 flex items-center justify-between bg-[#050505]/90 backdrop-blur-md border-b border-white/5">
          <h2 className="text-xl font-orbitron font-medium tracking-[0.1em] text-gray-200 uppercase flex items-center gap-2">
            {activeTab === 'analyzer' ? (
                <> <Activity className="w-4 h-4 text-white" /> Visual Telemetry </>
            ) : (
                <> <Radio className="w-4 h-4 text-white" /> Subspace Communications </>
            )}
          </h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded border border-white/10">
            <div className={`w-1.5 h-1.5 rounded-full ${analyzing || loadingNews ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'}`}></div>
            <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">{status}</span>
          </div>
        </header>

        <main className="p-8 max-w-6xl mx-auto z-10 relative">
          
          {/* === ANALYZER TAB === */}
          {activeTab === 'analyzer' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* INPUT PANEL (Left) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-1 relative group hover:border-white/30 transition-colors">
                  <label className="cursor-pointer relative block h-[450px] bg-black rounded-md overflow-hidden">
                    {preview ? (
                      <img src={preview} alt="Upload" className="w-full h-full object-contain" />
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-4">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white/10 transition-all">
                          <Upload className="w-6 h-6 text-gray-400 group-hover:text-white" />
                        </div>
                        <p className="font-orbitron text-xs tracking-[0.2em] uppercase text-gray-500">Initialize Feed</p>
                      </div>
                    )}
                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                  </label>
                </div>

                <button 
                  onClick={handleAnalyze}
                  disabled={!file || analyzing}
                  className="w-full py-3 bg-white hover:bg-gray-200 text-black font-inter font-bold text-sm tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  {analyzing ? <Cpu className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />}
                  {analyzing ? "PROCESSING..." : "INITIATE SCAN"}
                </button>
              </div>

              {/* OUTPUT PANEL (Right) */}
              <div className="lg:col-span-5 bg-[#0a0a0a] border border-white/10 rounded-lg p-5 min-h-[400px] flex flex-col relative">
                <div className="flex items-center gap-2 mb-4 opacity-40">
                  <Terminal className="w-3 h-3 text-white" />
                  <span className="font-mono text-[10px] text-white tracking-widest">LOGS_</span>
                </div>

                {result ? (
                  <ParsedMissionReport rawText={result} />
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-800 space-y-3">
                    <div className="w-12 h-12 border border-dashed border-gray-800 rounded-full animate-[spin_10s_linear_infinite]"></div>
                    <p className="font-mono text-[10px] tracking-widest text-gray-700">AWAITING TELEMETRY</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* === NEWS TAB === */}
          {activeTab === 'news' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center space-y-2 mb-8">
                <h1 className="text-4xl font-orbitron font-bold text-white tracking-wide">
                  DEEP SPACE ARCHIVES
                </h1>
                <p className="text-gray-500 font-inter text-sm">
                  Interstellar Intelligence Database
                </p>
              </div>
              
              {/* SEARCH BAR */}
              <div className="flex gap-0 rounded-lg overflow-hidden border border-white/20">
                <div className="flex-1 bg-black relative">
                  <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
                  <input 
                    type="text" 
                    value={newsTopic}
                    onChange={(e) => setNewsTopic(e.target.value)}
                    className="w-full bg-transparent border-none pl-12 pr-4 py-3 focus:outline-none text-white placeholder-gray-700 font-inter text-sm"
                    placeholder="Search query (e.g. Dark Matter)..."
                  />
                </div>
                <button 
                  onClick={handleNewsFetch}
                  disabled={loadingNews}
                  className="px-8 bg-white hover:bg-gray-200 text-black font-inter font-bold text-xs tracking-widest transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {loadingNews ? <Activity className="w-3 h-3 animate-spin" /> : "SCAN"}
                </button>
              </div>

              {/* NEWS RESULTS */}
              <div className="grid gap-4">
                {newsResult ? (
                  <ParsedNewsReport rawText={newsResult} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 opacity-30 space-y-4">
                    <div className="w-16 h-16 border-2 border-gray-700 rounded-full flex items-center justify-center relative">
                        <div className="absolute inset-0 border-t-2 border-white animate-[spin_3s_linear_infinite] rounded-full"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                    <div>
                        <p className="font-orbitron text-xs tracking-[0.3em] text-center text-white">SYSTEM ONLINE</p>
                        <p className="font-mono text-[9px] text-gray-500 text-center mt-1">AWAITING UPLINK QUERY</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default App;