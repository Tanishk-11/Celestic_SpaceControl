// import { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { 
//   Upload, Rocket, Radio, 
//   Cpu, Activity, Search, 
//   Terminal, ShieldCheck, Globe,
//   Crosshair, MapPin, Info, Zap,
//   Camera, X, Aperture,
//   Sparkles, HelpCircle, AlertCircle
// } from 'lucide-react';

// // --- COMPONENT: PARSED MISSION REPORT (ANALYZER) ---
// const ParsedMissionReport = ({ rawText }) => {
//   const extractSection = (marker) => {
//     const lines = rawText.split('\n');
//     const line = lines.find(l => l.includes(marker));
//     return line ? line.split(marker)[1].trim() : null;
//   };

//   const idRaw = extractSection("**Identification**:") || "Unknown Object";
//   const visRaw = extractSection("**Visibility Check**:") || "Data Unavailable";
//   const guideRaw = extractSection("**Guide**:") || "No navigation data available.";

//   const identification = idRaw.replace(/[\*\(\)]/g, '').split("Confidence")[0].trim();
//   const confidence = idRaw.includes("Confidence") ? idRaw.split("Confidence:")[1].replace(')', '').trim() : "N/A";

//   return (
//     <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
//       {/* CARD 1: IDENTIFICATION */}
//       <div className="bg-black/80 border border-white/20 rounded-lg p-4 relative overflow-hidden group hover:border-white/50 transition-all">
//         <div className="absolute top-0 right-0 p-2 opacity-10">
//           <Crosshair className="w-12 h-12 text-white" />
//         </div>
//         <div className="flex justify-between items-start mb-1">
//           <h4 className="text-gray-400 text-[10px] font-orbitron tracking-[0.2em] uppercase">Target ID</h4>
//           <span className="bg-white/10 text-white text-[10px] px-2 py-0.5 rounded border border-white/20 font-mono">
//             CONF: {confidence}
//           </span>
//         </div>
//         <p className="text-2xl font-orbitron text-white tracking-wider">{identification}</p>
//       </div>

//       {/* CARD 2: PHYSICS */}
//       <div className={`border rounded-lg p-4 relative ${
//         visRaw.toLowerCase().includes("not visible") 
//         ? "bg-red-950/20 border-red-500/30" 
//         : "bg-emerald-950/20 border-emerald-500/30"
//       }`}>
//         <div className="flex justify-between items-start mb-1">
//           <h4 className={`${
//             visRaw.toLowerCase().includes("not visible") ? "text-red-400" : "text-emerald-400"
//           } text-[10px] font-orbitron tracking-[0.2em] uppercase`}>Physics Validation</h4>
//           <Globe className={`w-3 h-3 ${
//              visRaw.toLowerCase().includes("not visible") ? "text-red-400" : "text-emerald-400"
//           }`} />
//         </div>
//         <p className="text-sm font-inter font-medium text-gray-200">
//           {visRaw.replace(/[\*\(\)]/g, '')}
//         </p>
//       </div>

//       {/* CARD 3: NAVIGATION */}
//       <div className="bg-white/5 border border-white/10 rounded-lg p-4">
//         <div className="flex justify-between items-start mb-1">
//           <h4 className="text-gray-400 text-[10px] font-orbitron tracking-[0.2em] uppercase">Vector</h4>
//           <MapPin className="w-3 h-3 text-gray-400" />
//         </div>
//         <p className="text-sm font-inter text-gray-300 leading-relaxed">
//           "{guideRaw.replace(/[\*\"]/g, '')}"
//         </p>
//       </div>

//     </div>
//   );
// };

// // --- COMPONENT: PARSED NEWS REPORT ---
// const ParsedNewsReport = ({ rawText }) => {
//   const parts = rawText.split("**Did you know?**"); 
//   let headlinesRaw = parts[0] ? parts[0].replace("**Headlines**:", "").trim() : "";
//   let factRaw = parts[1] ? parts[1].trim() : "Archive data corrupted.";
  
//   if (factRaw.startsWith(":")) {
//       factRaw = factRaw.substring(1).trim();
//   }

//   let newsItems = headlinesRaw.split('\n');
//   newsItems = newsItems
//     .map(item => item.trim().replace(/^[\*\-\•]\s*/, '')) 
//     .filter(item => item.length > 5); 

//   if (newsItems.length === 0 && headlinesRaw.length > 0) {
//       newsItems = [headlinesRaw];
//   } else if (newsItems.length === 0) {
//        newsItems = ["No actionable intelligence found in database."];
//   }

//   return (
//     <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
//       <div>
//         <div className="flex items-center gap-2 mb-4">
//            <Radio className="w-4 h-4 text-blue-400 animate-pulse" />
//            <h3 className="text-xs font-orbitron tracking-[0.2em] text-gray-400 uppercase">Incoming Intelligence Stream</h3>
//         </div>
        
//         <div className="space-y-3">
//           {newsItems.map((item, index) => (
//              <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 relative overflow-hidden group hover:border-white/30 transition-all">
//                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:via-blue-500/5 transition-all duration-500"></div>
//                <div className="flex items-start gap-3 relative z-10">
//                   <div className="mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity">
//                      <Sparkles className="w-4 h-4 text-blue-400" />
//                   </div>
//                   <p className="text-sm font-inter text-gray-200 leading-relaxed font-light">
//                      {item.replace(/\*\*/g, '')}
//                   </p>
//                </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="bg-white/5 border border-dashed border-white/10 rounded-lg p-4 flex items-start gap-4 mt-8">
//         <div className="p-2 bg-black rounded-full border border-white/20">
//           <Zap className="w-4 h-4 text-yellow-400" />
//         </div>
//         <div>
//           <h4 className="text-[10px] font-orbitron tracking-[0.2em] text-gray-400 uppercase mb-1">Archive Trivia</h4>
//           <p className="font-mono text-xs text-gray-300 leading-relaxed">
//             {factRaw}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- COMPONENT: MISSION PROTOCOL (HELP GUIDE) ---
// const MissionProtocol = ({ onClose }) => (
//   <div className="absolute top-2 left-2 right-2 bg-black/95 border border-blue-500/30 backdrop-blur-md rounded-lg p-5 z-30 animate-in fade-in slide-in-from-top-2 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
//     <div className="flex justify-between items-start mb-4">
//       <div className="flex items-center gap-2">
//         <AlertCircle className="w-4 h-4 text-blue-400" />
//         <h3 className="text-xs font-orbitron tracking-[0.2em] text-blue-400 uppercase">Mission Protocol</h3>
//       </div>
//       <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
//         <X className="w-4 h-4" />
//       </button>
//     </div>
//     <div className="space-y-3 font-mono text-[10px] text-gray-300 leading-relaxed">
//       <p>
//         <span className="text-blue-400 block mb-1">:: DIRECTIVE</span>
//         This terminal identifies celestial bodies. You must provide clear visual data of the <span className="text-white font-bold">NIGHT SKY</span>.
//       </p>
//       <p>
//         <span className="text-blue-400 block mb-1">:: PARAMETERS</span>
//         1. Ensure minimal light pollution.<br/>
//         2. Focus on specific constellations or star clusters.<br/>
//         3. Avoid clouds or terrestrial obstructions.
//       </p>
//       <p className="text-xs text-white pt-2 border-t border-white/10 mt-2">
//         <span className="animate-pulse">_READY FOR UPLINK</span>
//       </p>
//     </div>
//   </div>
// );

// // --- MAIN APP ---

// function App() {
//   const [activeTab, setActiveTab] = useState('analyzer'); 
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [analyzing, setAnalyzing] = useState(false);
//   const [result, setResult] = useState(null);
//   const [status, setStatus] = useState("SYSTEM READY");
//   const [showGuide, setShowGuide] = useState(false); // State for help guide
  
//   // Camera State
//   const [isCameraActive, setIsCameraActive] = useState(false);
//   const videoRef = useRef(null);

//   // News State
//   const [newsTopic, setNewsTopic] = useState("Space Exploration");
//   const [newsResult, setNewsResult] = useState(null);
//   const [loadingNews, setLoadingNews] = useState(false);

//   // --- DYNAMIC API URL ---
//   const API_URL = 'https://celestic-spacecontrol-backend.onrender.com';

//   // --- CAMERA HANDLERS ---
//   const startCamera = async () => {
//     setIsCameraActive(true);
//     setPreview(null);
//     setFile(null);
//     setResult(null);
//     setShowGuide(false);
//     setStatus("OPTICAL SENSORS ENGAGED");
    
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     } catch (err) {
//       console.error("Camera Error:", err);
//       alert("CAMERA ACCESS DENIED OR UNAVAILABLE");
//       setIsCameraActive(false);
//     }
//   };

//   const stopCamera = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       const tracks = videoRef.current.srcObject.getTracks();
//       tracks.forEach(track => track.stop());
//     }
//     setIsCameraActive(false);
//   };

//   const captureImage = () => {
//     const video = videoRef.current;
//     if (!video) return;

//     const canvas = document.createElement('canvas');
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     canvas.toBlob((blob) => {
//       const capturedFile = new File([blob], "capture.jpg", { type: "image/jpeg" });
//       setFile(capturedFile);
//       setPreview(URL.createObjectURL(capturedFile));
//       stopCamera();
//       setStatus("TARGET LOCKED");
//     }, 'image/jpeg');
//   };

//   // --- FILE HANDLERS ---
//   const handleFileChange = (e) => {
//     const selected = e.target.files[0];
//     if (selected) {
//       setFile(selected);
//       setPreview(URL.createObjectURL(selected));
//       setResult(null);
//       setIsCameraActive(false);
//       setShowGuide(false);
//       setStatus("IMAGE BUFFERED");
//     }
//   };

//   const handleAnalyze = async () => {
//     if (!file) return;
//     setAnalyzing(true);
//     setStatus("ACQUIRING GPS LOCK...");

//     if (!navigator.geolocation) {
//       alert("GEOLOCATION MODULE NOT FOUND");
//       setAnalyzing(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(async (position) => {
//       setStatus("PROCESSING TELEMETRY...");
//       const formData = new FormData();
//       formData.append('image', file);
//       formData.append('lat', position.coords.latitude);
//       formData.append('lon', position.coords.longitude);

//       try {
//         setStatus("COMPUTING PHYSICS...");
//         const response = await axios.post(`${API_URL}/analyze`, formData);
//         setResult(response.data.analysis);
//         setStatus("ANALYSIS COMPLETE");
//       } catch (error) {
//         setStatus("CONNECTION FAILED");
//         console.error("Analyze Error:", error);
//       } finally {
//         setAnalyzing(false);
//       }
//     });
//   };

//   const handleNewsFetch = async () => {
//     setLoadingNews(true);
//     setNewsResult(null);
//     try {
//       const response = await axios.post(`${API_URL}/news`, {
//         topic: newsTopic
//       });
//       setNewsResult(response.data.news);
//     } catch (error) {
//       console.error("News Error:", error);
//       setNewsResult("ERROR: DATABASE UNREACHABLE.");
//     } finally {
//       setLoadingNews(false);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-inter selection:bg-white/20">
      
//       {/* --- SIDEBAR --- */}
//       <div className="w-64 border-r border-white/10 bg-[#0a0a0a] flex flex-col p-5 z-20">
//         <div className="mb-10 flex items-center gap-3">
//           <img 
//             src="/Supernova.webp" 
//             alt="Celestic Logo" 
//             className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" 
//           />
//           <div>
//             <h1 className="font-orbitron font-bold text-lg tracking-wider text-white">CELESTIC</h1>
//             <p className="text-[9px] text-gray-500 font-mono tracking-[0.2em] uppercase">Space Control</p>
//           </div>
//         </div>

//         <nav className="space-y-1 flex-1">
//           <button 
//             onClick={() => setActiveTab('analyzer')}
//             className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
//               activeTab === 'analyzer' 
//               ? 'bg-white text-black' 
//               : 'text-gray-500 hover:text-white hover:bg-white/5'
//             }`}
//           >
//             <Rocket className="w-4 h-4" />
//             <span className="font-inter text-sm tracking-wide">Sky Analyzer</span>
//           </button>
          
//           <button 
//             onClick={() => setActiveTab('news')}
//             className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
//               activeTab === 'news' 
//               ? 'bg-white text-black' 
//               : 'text-gray-500 hover:text-white hover:bg-white/5'
//             }`}
//           >
//             <Radio className="w-4 h-4" />
//             <span className="font-inter text-sm tracking-wide">All About Space</span>
//           </button>
//         </nav>

//         {/* Footer */}
//         <div className="mt-auto border-t border-white/5 pt-4 space-y-2">
//           <div className="flex items-center gap-2 text-[10px] text-gray-600 font-mono">
//             <ShieldCheck className="w-3 h-3 text-emerald-500" /> SYSTEM OPTIMAL
//           </div>
//           <div className="flex items-center gap-2 text-[10px] text-gray-600 font-mono">
//             <Globe className="w-3 h-3 text-blue-500" /> ONLINE
//           </div>
//         </div>
//       </div>

//       {/* --- MAIN DISPLAY --- */}
//       <div className="flex-1 relative overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
//         <div className="absolute inset-0 stars opacity-20 pointer-events-none"></div>
        
//         <header className="sticky top-0 z-10 px-8 py-5 flex items-center justify-between bg-[#050505]/90 backdrop-blur-md border-b border-white/5">
//           <h2 className="text-xl font-orbitron font-medium tracking-[0.1em] text-gray-200 uppercase flex items-center gap-2">
//             {activeTab === 'analyzer' ? (
//                 <> <Activity className="w-4 h-4 text-white" /> Visual Telemetry </>
//             ) : (
//                 <> <Radio className="w-4 h-4 text-white" /> Subspace Communications </>
//             )}
//           </h2>
//           <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded border border-white/10">
//             <div className={`w-1.5 h-1.5 rounded-full ${analyzing || loadingNews ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'}`}></div>
//             <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">{status}</span>
//           </div>
//         </header>

//         <main className="p-8 max-w-6xl mx-auto z-10 relative">
          
//           {/* === ANALYZER TAB === */}
//           {activeTab === 'analyzer' && (
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
//               {/* INPUT PANEL (Left) */}
//               <div className="lg:col-span-7 space-y-4">
                
//                 {/* --- CAMERA & UPLOAD AREA --- */}
//                 <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-1 relative group hover:border-white/30 transition-colors">
                  
//                   {/* HELPER GUIDE OVERLAY */}
//                   {showGuide && <MissionProtocol onClose={() => setShowGuide(false)} />}
                  
//                   {/* INFO BUTTON (If no camera active) */}
//                   {!isCameraActive && !preview && (
//                     <button 
//                       onClick={() => setShowGuide(!showGuide)}
//                       className="absolute top-4 right-4 z-20 text-gray-500 hover:text-white transition-colors"
//                       title="Mission Protocol"
//                     >
//                       <HelpCircle className="w-5 h-5" />
//                     </button>
//                   )}

//                   <div className="relative block h-[450px] bg-black rounded-md overflow-hidden">
                    
//                     {/* STATE 1: CAMERA ACTIVE */}
//                     {isCameraActive ? (
//                       <div className="w-full h-full relative">
//                         <video 
//                           ref={videoRef} 
//                           autoPlay 
//                           playsInline 
//                           className="w-full h-full object-cover"
//                         />
//                         {/* Camera Overlays */}
//                         <div className="absolute inset-0 border-[2px] border-white/20 m-4 pointer-events-none">
//                           <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-red-500"></div>
//                           <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-red-500"></div>
//                           <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-red-500"></div>
//                           <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-red-500"></div>
//                           <div className="absolute inset-0 flex items-center justify-center">
//                             <Crosshair className="w-12 h-12 text-red-500/50" />
//                           </div>
//                         </div>
                        
//                         {/* Capture Controls */}
//                         <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-20">
//                           <button 
//                             onClick={captureImage}
//                             className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center hover:scale-110 transition-transform bg-white/10 backdrop-blur-sm"
//                           >
//                              <div className="w-12 h-12 bg-white rounded-full"></div>
//                           </button>
//                           <button 
//                              onClick={stopCamera}
//                              className="absolute right-8 top-2 p-2 bg-black/50 rounded-full text-white hover:bg-red-500/80 transition-colors"
//                           >
//                             <X className="w-6 h-6" />
//                           </button>
//                         </div>
//                       </div>

//                     ) : (
//                       // STATE 2: PREVIEW OR UPLOAD
//                       <label className="cursor-pointer w-full h-full block">
//                         {preview ? (
//                            <div className="relative w-full h-full">
//                               <img src={preview} alt="Upload" className="w-full h-full object-contain" />
//                               <button 
//                                 onClick={(e) => {
//                                   e.preventDefault();
//                                   setPreview(null);
//                                   setFile(null);
//                                   setResult(null);
//                                 }}
//                                 className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-red-500/80 transition-colors"
//                               >
//                                 <X className="w-4 h-4 text-white" />
//                               </button>
//                            </div>
//                         ) : (
//                           <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-6">
//                             <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white/10 transition-all">
//                               <Upload className="w-8 h-8 text-gray-400 group-hover:text-white" />
//                             </div>
//                             <div className="text-center">
//                               {/* UPDATED TEXT FOR CLARITY */}
//                               <p className="font-orbitron text-sm tracking-[0.2em] uppercase text-gray-500 mb-2">Awaiting Visual Uplink</p>
//                               <p className="text-xs text-gray-600 font-mono">Upload Night Sky Imagery or Engage Sensors</p>
//                             </div>
//                           </div>
//                         )}
//                         <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
//                       </label>
//                     )}

//                   </div>
//                 </div>

//                 {/* --- CONTROLS ROW --- */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <button 
//                     onClick={startCamera}
//                     disabled={isCameraActive || analyzing}
//                     className="py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-inter font-bold text-xs tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
//                   >
//                     <Camera className="w-4 h-4" />
//                     ENGAGE SENSORS
//                   </button>

//                   <button 
//                     onClick={handleAnalyze}
//                     disabled={!file || analyzing || isCameraActive}
//                     className="py-3 bg-white hover:bg-gray-200 text-black font-inter font-bold text-xs tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,255,255,0.1)]"
//                   >
//                     {analyzing ? <Cpu className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />}
//                     {analyzing ? "PROCESSING..." : "INITIATE SCAN"}
//                   </button>
//                 </div>

//               </div>

//               {/* OUTPUT PANEL (Right) */}
//               <div className="lg:col-span-5 bg-[#0a0a0a] border border-white/10 rounded-lg p-5 min-h-[400px] flex flex-col relative">
//                 <div className="flex items-center gap-2 mb-4 opacity-40">
//                   <Terminal className="w-3 h-3 text-white" />
//                   <span className="font-mono text-[10px] text-white tracking-widest">LOGS_</span>
//                 </div>

//                 {result ? (
//                   <ParsedMissionReport rawText={result} />
//                 ) : (
//                   <div className="flex-1 flex flex-col items-center justify-center text-gray-800 space-y-3">
//                     <div className="w-12 h-12 border border-dashed border-gray-800 rounded-full animate-[spin_10s_linear_infinite]"></div>
//                     <p className="font-mono text-[10px] tracking-widest text-gray-700">AWAITING TELEMETRY</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* === NEWS TAB === */}
//           {activeTab === 'news' && (
//             <div className="max-w-4xl mx-auto space-y-6">
//               <div className="text-center space-y-2 mb-8">
//                 <h1 className="text-4xl font-orbitron font-bold text-white tracking-wide">
//                   DEEP SPACE ARCHIVES
//                 </h1>
//                 <p className="text-gray-500 font-inter text-sm">
//                   Interstellar Intelligence Database
//                 </p>
//               </div>
              
//               {/* SEARCH BAR */}
//               <div className="flex gap-0 rounded-lg overflow-hidden border border-white/20">
//                 <div className="flex-1 bg-black relative">
//                   <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
//                   <input 
//                     type="text" 
//                     value={newsTopic}
//                     onChange={(e) => setNewsTopic(e.target.value)}
//                     className="w-full bg-transparent border-none pl-12 pr-4 py-3 focus:outline-none text-white placeholder-gray-700 font-inter text-sm"
//                     placeholder="Search query (e.g. Dark Matter)..."
//                   />
//                 </div>
//                 <button 
//                   onClick={handleNewsFetch}
//                   disabled={loadingNews}
//                   className="px-8 bg-white hover:bg-gray-200 text-black font-inter font-bold text-xs tracking-widest transition-colors flex items-center gap-2 disabled:opacity-50"
//                 >
//                   {loadingNews ? <Activity className="w-3 h-3 animate-spin" /> : "SCAN"}
//                 </button>
//               </div>

//               {/* NEWS RESULTS */}
//               <div className="grid gap-4">
//                 {newsResult ? (
//                   <ParsedNewsReport rawText={newsResult} />
//                 ) : (
//                   <div className="flex flex-col items-center justify-center py-20 opacity-30 space-y-4">
//                     <div className="w-16 h-16 border-2 border-gray-700 rounded-full flex items-center justify-center relative">
//                         <div className="absolute inset-0 border-t-2 border-white animate-[spin_3s_linear_infinite] rounded-full"></div>
//                         <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
//                     </div>
//                     <div>
//                         <p className="font-orbitron text-xs tracking-[0.3em] text-center text-white">SYSTEM ONLINE</p>
//                         <p className="font-mono text-[9px] text-gray-500 text-center mt-1">AWAITING UPLINK QUERY</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;





// VERSION 2
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { 
  Upload, Rocket, Radio, 
  Cpu, Activity, Search, 
  Terminal, ShieldCheck, Globe,
  Crosshair, MapPin, Info, Zap,
  Camera, X, Aperture,
  Sparkles, HelpCircle, AlertCircle,
  Menu // Added Menu icon for mobile
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

// --- COMPONENT: PARSED NEWS REPORT ---
const ParsedNewsReport = ({ rawText }) => {
  const parts = rawText.split("**Did you know?**"); 
  let headlinesRaw = parts[0] ? parts[0].replace("**Headlines**:", "").trim() : "";
  let factRaw = parts[1] ? parts[1].trim() : "Archive data corrupted.";
  
  if (factRaw.startsWith(":")) {
      factRaw = factRaw.substring(1).trim();
  }

  let newsItems = headlinesRaw.split('\n');
  newsItems = newsItems
    .map(item => item.trim().replace(/^[\*\-\•]\s*/, '')) 
    .filter(item => item.length > 5); 

  if (newsItems.length === 0 && headlinesRaw.length > 0) {
      newsItems = [headlinesRaw];
  } else if (newsItems.length === 0) {
       newsItems = ["No actionable intelligence found in database."];
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
      <div>
        <div className="flex items-center gap-2 mb-4">
           <Radio className="w-4 h-4 text-blue-400 animate-pulse" />
           <h3 className="text-xs font-orbitron tracking-[0.2em] text-gray-400 uppercase">Incoming Intelligence Stream</h3>
        </div>
        
        <div className="space-y-3">
          {newsItems.map((item, index) => (
             <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 relative overflow-hidden group hover:border-white/30 transition-all">
               <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:via-blue-500/5 transition-all duration-500"></div>
               <div className="flex items-start gap-3 relative z-10">
                  <div className="mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity">
                     <Sparkles className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-sm font-inter text-gray-200 leading-relaxed font-light">
                     {item.replace(/\*\*/g, '')}
                  </p>
               </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/5 border border-dashed border-white/10 rounded-lg p-4 flex items-start gap-4 mt-8">
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

// --- COMPONENT: MISSION PROTOCOL (HELP GUIDE) ---
const MissionProtocol = ({ onClose }) => (
  <div className="absolute top-2 left-2 right-2 bg-black/95 border border-blue-500/30 backdrop-blur-md rounded-lg p-5 z-30 animate-in fade-in slide-in-from-top-2 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-blue-400" />
        <h3 className="text-xs font-orbitron tracking-[0.2em] text-blue-400 uppercase">Mission Protocol</h3>
      </div>
      <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
    <div className="space-y-3 font-mono text-[10px] text-gray-300 leading-relaxed">
      <p>
        <span className="text-blue-400 block mb-1">:: DIRECTIVE</span>
        This terminal identifies celestial bodies. You must provide clear visual data of the <span className="text-white font-bold">NIGHT SKY</span>.
      </p>
      <p>
        <span className="text-blue-400 block mb-1">:: PARAMETERS</span>
        1. Ensure minimal light pollution.<br/>
        2. Focus on specific constellations or star clusters.<br/>
        3. Avoid clouds or terrestrial obstructions.
      </p>
      <p className="text-xs text-white pt-2 border-t border-white/10 mt-2">
        <span className="animate-pulse">_READY FOR UPLINK</span>
      </p>
    </div>
  </div>
);

// --- MAIN APP ---

function App() {
  const [activeTab, setActiveTab] = useState('analyzer'); 
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("SYSTEM READY");
  const [showGuide, setShowGuide] = useState(false);
  
  // Mobile Menu State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Camera State
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);

  // News State
  const [newsTopic, setNewsTopic] = useState("Space Exploration");
  const [newsResult, setNewsResult] = useState(null);
  const [loadingNews, setLoadingNews] = useState(false);

  // --- DYNAMIC API URL ---
  const API_URL = 'https://celestic-spacecontrol-backend.onrender.com';

  // --- CAMERA HANDLERS ---
  const startCamera = async () => {
    setIsCameraActive(true);
    setPreview(null);
    setFile(null);
    setResult(null);
    setShowGuide(false);
    setStatus("OPTICAL SENSORS ENGAGED");
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }); // Prefer back camera
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera Error:", err);
      alert("CAMERA ACCESS DENIED OR UNAVAILABLE");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsCameraActive(false);
  };

  const captureImage = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const capturedFile = new File([blob], "capture.jpg", { type: "image/jpeg" });
      setFile(capturedFile);
      setPreview(URL.createObjectURL(capturedFile));
      stopCamera();
      setStatus("TARGET LOCKED");
    }, 'image/jpeg');
  };

  // --- FILE HANDLERS ---
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
      setIsCameraActive(false);
      setShowGuide(false);
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false); // Close mobile menu when tab is selected
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#050505] text-white overflow-hidden font-inter selection:bg-white/20">
      
      {/* --- MOBILE HEADER (Visible only on small screens) --- */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#0a0a0a] border-b border-white/10 z-50">
        <div className="flex items-center gap-3">
          <img 
            src="/Supernova.webp" 
            alt="Celestic Logo" 
            className="w-8 h-8 object-contain" 
          />
          <h1 className="font-orbitron font-bold text-md tracking-wider text-white">CELESTIC</h1>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* --- SIDEBAR (Responsive) --- */}
      <div className={`
        fixed inset-0 z-40 bg-[#0a0a0a] transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:w-64 lg:flex lg:flex-col lg:border-r lg:border-white/10 lg:p-5
        ${isSidebarOpen ? 'translate-x-0 flex flex-col p-5' : '-translate-x-full'}
      `}>
        {/* Desktop Logo (Hidden on Mobile since it's in the header) */}
        <div className="hidden lg:flex mb-10 items-center gap-3">
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

        {/* Navigation */}
        <nav className="space-y-1 flex-1 mt-12 lg:mt-0">
          <button 
            onClick={() => handleTabChange('analyzer')}
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
            onClick={() => handleTabChange('news')}
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
      <div className="flex-1 relative overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] w-full">
        <div className="absolute inset-0 stars opacity-20 pointer-events-none"></div>
        
        <header className="sticky top-0 z-10 px-4 lg:px-8 py-5 flex items-center justify-between bg-[#050505]/90 backdrop-blur-md border-b border-white/5">
          <h2 className="text-sm lg:text-xl font-orbitron font-medium tracking-[0.1em] text-gray-200 uppercase flex items-center gap-2">
            {activeTab === 'analyzer' ? (
                <> <Activity className="w-4 h-4 text-white" /> Visual Telemetry </>
            ) : (
                <> <Radio className="w-4 h-4 text-white" /> Subspace Communications </>
            )}
          </h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded border border-white/10">
            <div className={`w-1.5 h-1.5 rounded-full ${analyzing || loadingNews ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'}`}></div>
            <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase hidden lg:inline">{status}</span>
            <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase lg:hidden">{status.split(" ")[0]}</span>
          </div>
        </header>

        <main className="p-4 lg:p-8 max-w-6xl mx-auto z-10 relative">
          
          {/* === ANALYZER TAB === */}
          {activeTab === 'analyzer' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* INPUT PANEL (Left) */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* --- CAMERA & UPLOAD AREA --- */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-1 relative group hover:border-white/30 transition-colors">
                  
                  {/* HELPER GUIDE OVERLAY */}
                  {showGuide && <MissionProtocol onClose={() => setShowGuide(false)} />}
                  
                  {/* INFO BUTTON (If no camera active) */}
                  {!isCameraActive && !preview && (
                    <button 
                      onClick={() => setShowGuide(!showGuide)}
                      className="absolute top-4 right-4 z-20 text-gray-500 hover:text-white transition-colors"
                      title="Mission Protocol"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                  )}

                  <div className="relative block h-[350px] lg:h-[450px] bg-black rounded-md overflow-hidden">
                    
                    {/* STATE 1: CAMERA ACTIVE */}
                    {isCameraActive ? (
                      <div className="w-full h-full relative">
                        <video 
                          ref={videoRef} 
                          autoPlay 
                          playsInline 
                          muted
                          className="w-full h-full object-cover"
                        />
                        {/* Camera Overlays */}
                        <div className="absolute inset-0 border-[2px] border-white/20 m-4 pointer-events-none">
                          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-red-500"></div>
                          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-red-500"></div>
                          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-red-500"></div>
                          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-red-500"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Crosshair className="w-12 h-12 text-red-500/50" />
                          </div>
                        </div>
                        
                        {/* Capture Controls */}
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-20">
                          <button 
                            onClick={captureImage}
                            className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center hover:scale-110 transition-transform bg-white/10 backdrop-blur-sm"
                          >
                             <div className="w-12 h-12 bg-white rounded-full"></div>
                          </button>
                          <button 
                             onClick={stopCamera}
                             className="absolute right-8 top-2 p-2 bg-black/50 rounded-full text-white hover:bg-red-500/80 transition-colors"
                          >
                            <X className="w-6 h-6" />
                          </button>
                        </div>
                      </div>

                    ) : (
                      // STATE 2: PREVIEW OR UPLOAD
                      <label className="cursor-pointer w-full h-full block">
                        {preview ? (
                           <div className="relative w-full h-full">
                              <img src={preview} alt="Upload" className="w-full h-full object-contain" />
                              <button 
                                onClick={(e) => {
                                  e.preventDefault();
                                  setPreview(null);
                                  setFile(null);
                                  setResult(null);
                                }}
                                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-red-500/80 transition-colors"
                              >
                                <X className="w-4 h-4 text-white" />
                              </button>
                           </div>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-6">
                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white/10 transition-all">
                              <Upload className="w-8 h-8 text-gray-400 group-hover:text-white" />
                            </div>
                            <div className="text-center px-4">
                              <p className="font-orbitron text-sm tracking-[0.2em] uppercase text-gray-500 mb-2">Awaiting Visual Uplink</p>
                              <p className="text-xs text-gray-600 font-mono">Upload Night Sky Imagery or Engage Sensors</p>
                            </div>
                          </div>
                        )}
                        <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                      </label>
                    )}

                  </div>
                </div>

                {/* --- CONTROLS ROW --- */}
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={startCamera}
                    disabled={isCameraActive || analyzing}
                    className="py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-inter font-bold text-[10px] lg:text-xs tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Camera className="w-4 h-4" />
                    ENGAGE SENSORS
                  </button>

                  <button 
                    onClick={handleAnalyze}
                    disabled={!file || analyzing || isCameraActive}
                    className="py-3 bg-white hover:bg-gray-200 text-black font-inter font-bold text-[10px] lg:text-xs tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  >
                    {analyzing ? <Cpu className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />}
                    {analyzing ? "PROCESSING..." : "INITIATE SCAN"}
                  </button>
                </div>

              </div>

              {/* OUTPUT PANEL (Right) */}
              <div className="lg:col-span-5 bg-[#0a0a0a] border border-white/10 rounded-lg p-5 min-h-[300px] lg:min-h-[400px] flex flex-col relative">
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
                <h1 className="text-2xl lg:text-4xl font-orbitron font-bold text-white tracking-wide">
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
                  className="px-4 lg:px-8 bg-white hover:bg-gray-200 text-black font-inter font-bold text-xs tracking-widest transition-colors flex items-center gap-2 disabled:opacity-50"
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