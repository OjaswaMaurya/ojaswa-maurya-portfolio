import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Terminal, 
  Zap, 
  Settings, 
  Play, 
  Plus, 
  Trash2, 
  MessageSquare, 
  TrendingDown, 
  Award,
  Sparkles,
  Send,
  RefreshCw,
  Sliders,
  Database,
  ArrowRight,
  Loader2
} from 'lucide-react';

interface AIPlaygroundProps {
  onLogMessage: (text: string, type?: 'system' | 'action' | 'success' | 'warning' | 'error') => void;
}

interface DatasetPair {
  input: string;
  output: string;
}

export default function AIPlayground({ onLogMessage }: AIPlaygroundProps) {
  // Task Assistant Hub State
  const [taskInput, setTaskInput] = useState('');
  const [taskMode, setTaskMode] = useState<'iot-code' | 'prompt-opt' | 'complexity'>('iot-code');
  const [taskOutput, setTaskOutput] = useState('');
  const [isTaskGenerating, setIsTaskGenerating] = useState(false);

  // Model Synthesizer & Tuning Simulator State
  const [agentName, setAgentName] = useState('CYBER_ASSIST_OS_v1');
  const [baseModel, setBaseModel] = useState('gemini-3.5-flash');
  const [temperature, setTemperature] = useState(0.7);
  const [epochs, setEpochs] = useState(5);
  const [dataset, setDataset] = useState<DatasetPair[]>([
    { input: 'landslide alert soil high', output: 'ACTIVATE_BUZZER(1000); DISPATCH_TELEGRAM_CRITICAL();' },
    { input: 'system boot initial', output: 'CALIBRATE_ACCELEROMETER(); OPEN_MESH_PORTS(0x0F);' },
    { input: 'low voltage shutdown threshold', output: 'PREVENT_HEAPS(); DEEP_SLEEP_SEC(3600);' },
  ]);
  const [newKeyPair, setNewKeyPair] = useState<DatasetPair>({ input: '', output: '' });
  
  // Model Training Simulation State
  const [trainingStatus, setTrainingStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [trainingLogs, setTrainingLogs] = useState<string[]>([]);
  const [validationLoss, setValidationLoss] = useState<number[]>([]);
  const [lossRate, setLossRate] = useState<number | null>(null);

  // Synthesized Explorer Probing State
  const [probeInput, setProbeInput] = useState('');
  const [probeOutput, setProbeOutput] = useState('');
  const [isProbing, setIsProbing] = useState(false);

  const trainingLogsEndRef = useRef<HTMLDivElement>(null);

  // Pre-loaded Task Helpers
  const preLoadTaskInput = (text: string) => {
    setTaskInput(text);
    onLogMessage(`Selected Task template: ${text.slice(0, 30)}...`, 'action');
  };

  // 1. Task Assistant Backend Generator
  const handleTaskGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    setIsTaskGenerating(true);
    setTaskOutput('');
    onLogMessage(`Executing natural task solver: [Mode: ${taskMode}]`, 'action');

    let promptSuffix = '';
    let systemRole = '';

    if (taskMode === 'iot-code') {
      systemRole = "You are an expert firmware developer. Your job is to output pure, highly-commented Arduino C++ or ESP-32 code. Focus on micro-second timing, stability, registers calibration, and error checks. Wrap code strictly in standard markdown blocks.";
      promptSuffix = `Generate ESP32/Arduino code for this task:\n${taskInput}\nInclude comments explaining register configurations or sensor bindings.`;
    } else if (taskMode === 'prompt-opt') {
      systemRole = "You are a Master Prompt Engineer skilled in Few-Shot reasoning, Chain-of-Thought modeling, and system-prompt structuring.";
      promptSuffix = `Refine and optimize this prompt into an extremely powerful System Prompt and User Template:\n${taskInput}\nFormat the output using clear sections: SYSTEM INSTRUCTION, CONSTRAINTS, FEW-SHOT EXAMPLES, USER MESSAGE FORMAT.`;
    } else {
      systemRole = "You are an expert algorithms engineer specialized in low-level memory footprints and Big O complexity calculations.";
      promptSuffix = `Analyze the time and space complexity of the code or algorithm described below. Provide exact details and optimized suggestions to improve operations:\n${taskInput}`;
    }

    try {
      const resp = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptSuffix,
          systemInstruction: systemRole,
          model: 'gemini-3.5-flash',
          modelConfig: { temperature: 0.6 }
        })
      });

      const data = await resp.json();
      if (resp.status !== 200) {
        throw new Error(data.error);
      }

      setTaskOutput(data.text || 'No data generated.');
      onLogMessage(`Task processed successfully and translated into logical stream arrays.`, 'success');
    } catch (err: any) {
      console.error(err);
      setTaskOutput(`[COMPILE ERROR]: ${err.message || 'Verification pipeline interrupted.'}`);
      onLogMessage(`Intelligence pipeline connection fault.`, 'error');
    } finally {
      setIsTaskGenerating(false);
    }
  };

  // 2. Add custom training pair
  const handleAddKeyPair = () => {
    if (!newKeyPair.input.trim() || !newKeyPair.output.trim()) return;
    setDataset(prev => [...prev, newKeyPair]);
    setNewKeyPair({ input: '', output: '' });
    onLogMessage('Synthetic dataset collection updated with fresh training sample.', 'system');
  };

  const handleRemoveKeyPair = (idx: number) => {
    setDataset(prev => prev.filter((_, i) => i !== idx));
    onLogMessage('Dataset tuple removed from active synthesis registry.', 'warning');
  };

  // 3. Simulated model compile cycle
  const runLocalTrainCycle = () => {
    if (trainingStatus === 'running') return;
    setTrainingStatus('running');
    setTrainingLogs([]);
    setValidationLoss([]);
    onLogMessage(`Starting training cycle initialized on agent: [${agentName}]`, 'warning');

    const steps = [
      `[LOAD] Loading fine-tuning scheduler using ${baseModel} weights...`,
      `[BATCH] Synthesizing ${dataset.length} prompt key-value datasets into micro-batches...`,
      `[GRID] Adjusting learning-rate to 2e-5 (Cosine Decay configured)`,
      `[WEIGHTS] Freezing bottom attention heads (Llama/Gemini layout configuration)...`
    ];

    let currentStep = 0;
    const initialInterval = setInterval(() => {
      if (currentStep < steps.length) {
        setTrainingLogs(prev => [...prev, steps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(initialInterval);
        // Start detailed epoch epochs training
        let epochIndex = 1;
        let baseLoss = 2.15;
        const lossTracker: number[] = [];

        const epochInterval = setInterval(() => {
          if (epochIndex <= epochs) {
            const simulatedLoss = parseFloat((baseLoss * (0.65 - (epochIndex * 0.08)) + (Math.random() * 0.04)).toFixed(4));
            baseLoss = simulatedLoss;
            lossTracker.push(simulatedLoss);
            setValidationLoss([...lossTracker]);

            const epochLogs = [
              `[EPOCH ${epochIndex}/${epochs}] Loss metrics updated: loss_val = ${simulatedLoss}`,
              `[COMPILE] Checked token overlaps ... 100% boundary check validated`,
              ...dataset.map((k, i) => `   - Validating pair ${i+1}: "${k.input.slice(0, 15)}..." mapped => target values match (delta_error: ${(Math.random() * 0.03).toFixed(5)})`)
            ];
            
            setTrainingLogs(prev => [...prev, ...epochLogs]);
            epochIndex++;
          } else {
            clearInterval(epochInterval);
            const finalLoss = baseLoss;
            setLossRate(finalLoss);
            
            const completionSteps = [
              `[POST-PROCESS] Epoch processing complete. Running model weights alignment matrix...`,
              `[EVAL] Validation subset accuracy: ${(100 - finalLoss * 15).toFixed(2)}%`,
              `[FLASH_LOCK] Locking model weights securely in active memory layers.`,
              `[SUCCESS] Custom model [${agentName}] is compiled and actively online for local queries!`
            ];
            
            setTrainingLogs(prev => [...prev, ...completionSteps]);
            setTrainingStatus('completed');
            onLogMessage(`Model [${agentName}] tuned! Final synthesis loss: ${finalLoss}. Ready to probe.`, 'success');
          }
        }, 1200);
      }
    }, 400);
  };

  // 4. Test newly "trained"/prompt-engineered Model with custom Gemini instruction injections!
  const handleProbeQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!probeInput.trim() || isProbing) return;

    setIsProbing(true);
    setProbeOutput('');
    onLogMessage(`Routing query directly to custom-tuned agent: [${agentName}]`, 'action');

    // Build the payload
    // We engineer the custom system instruction by injecting the agent description, chosen temperature, and training dataset.
    const trainingContext = dataset.map((d, i) => `Pair ${i + 1}:\nInput: ${d.input}\nExpected Logic: ${d.output}`).join('\n\n');
    
    const craftedSystemInstruction = `You are a custom-synthesized AI agent named "${agentName}". 
Your base model architecture is configured around ${baseModel}. 
You have been fine-tuned using the following key dataset pairings:
${trainingContext}

Your personality guidelines:
1. Always stay in character as the custom telemetry agent "${agentName}".
2. Integrate lessons, schemas, and actions from the provided dataset when matched or relevant.
3. Keep your output sharp, performant, and technical, styled in terminal telemetry syntax!`;

    try {
      const resp = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `User Query: ${probeInput}\nGenerate the response mapping based on your custom prompt architecture:`,
          systemInstruction: craftedSystemInstruction,
          model: 'gemini-3.5-flash',
          modelConfig: { temperature }
        })
      });

      const data = await resp.json();
      if (resp.status !== 200) {
        throw new Error(data.error);
      }

      setProbeOutput(data.text || 'No response compiled.');
      onLogMessage(`Custom Agent logical response mapping calculated successfully.`, 'success');
    } catch (err: any) {
      console.error(err);
      setProbeOutput(`[PROBE COMPILE ERROR]: ${err.message || 'Weights routing exception.'}`);
      onLogMessage(`Model agent failed to response properly. Check secrets key status.`, 'error');
    } finally {
      setIsProbing(false);
    }
  };

  // Scroll mock compilation log down
  useEffect(() => {
    if (trainingLogsEndRef.current) {
      trainingLogsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [trainingLogs]);

  return (
    <section id="aiforge" className="py-24 bg-neutral-950 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-4 bg-primary-orange animate-pulse"></span>
              <p className="font-mono text-xs uppercase tracking-widest text-primary-orange">COGNITIVE SYSTEM ARCHITECTURES</p>
            </div>
            <h2 className="font-sans font-black text-4xl tracking-tight text-white uppercase sm:text-5xl">
              AI FORGE &amp; PLAYGROUND
            </h2>
          </div>
          <p className="font-mono text-xs text-gray-400 max-w-sm leading-relaxed">
            Experiment with prompt optimization libraries and model fine-tuning logic workflows. Understand how LLM architectures converge using <strong className="text-primary-orange">concrete hardware telemetry training simulators</strong>.
          </p>
        </div>

        {/* Top Grid: Twin Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* COLUMN 1: Task Assistant Hub (7 columns width) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border border-white/10 bg-black/40 p-6 md:p-8 space-y-6 relative rounded-sm">
              <div className="absolute top-0 right-0 p-2 font-mono text-[8px] text-gray-500 bg-white/5 select-none font-bold">
                TASK_COPILOT_v2.5
              </div>

              <div className="flex items-center gap-2.5 border-b border-primary-orange/20 pb-3">
                <Zap className="h-5 w-5 text-primary-orange animate-pulse" />
                <h3 className="font-sans font-extrabold text-lg text-white uppercase select-none">
                  INTELLIGENT TASK ACCELERATOR
                </h3>
              </div>
              
              <p className="text-gray-400 text-xs font-sans leading-relaxed">
                Unlock rapid workflow efficiencies. Select an operational mode, describe the mission objectives below to query the server-side intelligence gateway, and verify code or optimize targets instantly.
              </p>

              {/* Mode Selection Tabs */}
              <div className="grid grid-cols-3 border border-white/10 bg-black/60 font-mono text-xs select-none">
                <button
                  onClick={() => setTaskMode('iot-code')}
                  className={`py-3 flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                    taskMode === 'iot-code' 
                      ? 'bg-primary-orange/10 text-primary-orange font-bold border-b border-primary-orange' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  id="tab-mode-iot"
                >
                  <Cpu className="h-4 w-4 shrink-0" />
                  <span>FIRMWARE COMPILER</span>
                </button>
                <button
                  onClick={() => setTaskMode('prompt-opt')}
                  className={`py-3 flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                    taskMode === 'prompt-opt' 
                      ? 'bg-primary-orange/10 text-primary-orange font-bold border-b border-primary-orange' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  id="tab-mode-opt"
                >
                  <Sparkles className="h-4 w-4 shrink-0" />
                  <span>PROMPT TUNER</span>
                </button>
                <button
                  onClick={() => setTaskMode('complexity')}
                  className={`py-3 flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                    taskMode === 'complexity' 
                      ? 'bg-primary-orange/10 text-primary-orange font-bold border-b border-primary-orange' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  id="tab-mode-complexity"
                >
                  <Terminal className="h-4 w-4 shrink-0" />
                  <span>COMPLEXITY ANALYZER</span>
                </button>
              </div>

              {/* Ready Prompt Templates */}
              <div className="space-y-2">
                <p className="font-mono text-[9px] text-gray-500 uppercase font-bold tracking-widest">PROMPT TEMPLATE SUGGESTIONS:</p>
                <div className="flex flex-wrap gap-2.5">
                  {taskMode === 'iot-code' && (
                    <>
                      <button 
                        onClick={() => preLoadTaskInput("Read MPU6050 accelerometer and fire an interrupt limit on 1.5G tilt threshold")}
                        className="px-2.5 py-1.5 bg-neutral-900 border border-white/5 hover:border-primary-orange text-[10px] text-gray-300 font-mono transition-colors cursor-pointer"
                        id="preset-code-1"
                      >
                        [Tilt Sensor Interrupt]
                      </button>
                      <button 
                        onClick={() => preLoadTaskInput("Establish secure HTTP POST post payloads to a REST API gateway using WiFiManager on ESP32")}
                        className="px-2.5 py-1.5 bg-neutral-900 border border-white/5 hover:border-primary-orange text-[10px] text-gray-300 font-mono transition-colors cursor-pointer"
                        id="preset-code-2"
                      >
                        [REST Telemetry Payload]
                      </button>
                    </>
                  )}
                  {taskMode === 'prompt-opt' && (
                    <>
                      <button 
                        onClick={() => preLoadTaskInput("Act as an automated diagnostic script helper that monitors server ports and formats errors")}
                        className="px-2.5 py-1.5 bg-neutral-900 border border-white/5 hover:border-primary-orange text-[10px] text-gray-300 font-mono transition-colors cursor-pointer"
                        id="preset-opt-1"
                      >
                        [Diagnostic Script]
                      </button>
                      <button 
                        onClick={() => preLoadTaskInput("Translate complex algorithmic warnings into brief human equations with clear mitigation values")}
                        className="px-2.5 py-1.5 bg-neutral-900 border border-white/5 hover:border-primary-orange text-[10px] text-gray-300 font-mono transition-colors cursor-pointer"
                        id="preset-opt-2"
                      >
                        [Human Equations Translator]
                      </button>
                    </>
                  )}
                  {taskMode === 'complexity' && (
                    <>
                      <button 
                        onClick={() => preLoadTaskInput("void sortQueue() {\n  for (int i=0; i<N-1; i++) {\n    for (int j=0; j<N-i-1; j++) {\n      if (q[j] > q[j+1]) swap(j, j+1);\n    }\n  }\n}")}
                        className="px-2.5 py-1.5 bg-neutral-900 border border-white/5 hover:border-primary-orange text-[10px] text-gray-300 font-mono transition-colors cursor-pointer"
                        id="preset-comp-1"
                      >
                        [Analyze Bubble Sort Code]
                      </button>
                      <button 
                        onClick={() => preLoadTaskInput("Explain memory leak dangers of allocating heap buffers asynchronously in high latency nested interrupt routines.")}
                        className="px-2.5 py-1.5 bg-neutral-900 border border-white/5 hover:border-primary-orange text-[10px] text-gray-300 font-mono transition-colors cursor-pointer"
                        id="preset-comp-2"
                      >
                        [Low Level Interrupt Leaks]
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Task Form submission */}
              <form onSubmit={handleTaskGenerate} className="space-y-4">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase text-primary-orange font-bold tracking-wider select-none">
                    &gt; INPUT OBJECTIVE DESCRIPTION
                  </label>
                  <textarea
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    rows={4}
                    placeholder={
                      taskMode === 'iot-code' 
                        ? "e.g., Program a state machine that controls a green LED on pin 15 and blinks faster when soil moisture drops below 30%..."
                        : taskMode === 'prompt-opt'
                        ? "e.g., Act as a C++ code reviewer that specializes in STM32 bare metal registry calls..."
                        : "e.g., Provide complex optimization on circular list mapping processes..."
                    }
                    className="w-full bg-black border border-white/15 focus:border-primary-orange text-white font-mono text-xs px-4 py-3 focus:outline-none transition-colors resize-none"
                    id="task-input-fld"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isTaskGenerating || !taskInput.trim()}
                  className={`w-full py-3.5 font-mono text-xs uppercase font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    isTaskGenerating || !taskInput.trim()
                      ? 'bg-neutral-900 border border-gray-600 text-gray-500 cursor-not-allowed'
                      : 'bg-primary-orange text-black hover:shadow-[0_0_25px_rgba(255,95,0,0.5)] hover:scale-[1.01]'
                  }`}
                  id="task-generate-btn"
                >
                  {isTaskGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> SYNTHESIZING RESPONSE PATHS...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" /> GENERATE AI SOLUTION
                    </>
                  )}
                </button>
              </form>

              {/* Task Generation Output Render */}
              {taskOutput && (
                <div className="space-y-3.5 pt-6 border-t border-white/10 animate-fadeIn">
                  <div className="flex justify-between items-center font-mono text-[10px] text-gray-500">
                    <span>COMPILE TERMINAL OUTPUT_LOG:</span>
                    <button 
                      onClick={() => setTaskOutput('')}
                      className="hover:text-red-500 transition-colors"
                      id="clear-task-output-btn"
                    >
                      [FLUSH SCREEN]
                    </button>
                  </div>
                  <div className="bg-black border border-white/10 p-4 rounded-sm overflow-x-auto font-mono text-xs text-gray-300 max-h-96 whitespace-pre-wrap leading-relaxed select-all border-l-2 border-l-primary-orange">
                    {taskOutput}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* COLUMN 2: Custom Fine Tuning Loader (5 columns width) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-white/10 bg-neutral-950 p-6 md:p-8 space-y-6 relative rounded-sm">
              <div className="absolute top-0 right-0 p-2 font-mono text-[8px] text-gray-500 bg-white/5 select-none font-bold">
                FINE_TUNE_DEVICES_V10
              </div>

              <div className="flex items-center gap-2.5 border-b border-primary-orange/20 pb-3">
                <Database className="h-5 w-5 text-primary-orange animate-pulse" />
                <h3 className="font-sans font-extrabold text-lg text-white uppercase select-none">
                  MODEL SYNTHESIZER
                </h3>
              </div>

              <p className="text-gray-400 text-xs font-sans leading-relaxed">
                Step-by-step custom LLM training path simulator. Feed target pairs, configure hyperparameters, and watch real loss curves converge to customize your prompt instructions mapping.
              </p>

              {/* Model Settings Form */}
              <div className="space-y-4 font-mono text-xs">
                
                {/* Agent Name field */}
                <div className="space-y-1">
                  <span className="text-primary-orange font-bold uppercase select-none text-[10px]">&gt; TARGET_AGENT_NAME</span>
                  <input 
                    type="text" 
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value.toUpperCase().replace(/\s+/g, '_'))}
                    className="w-full bg-black border border-white/15 focus:border-primary-orange text-white px-3 py-2 focus:outline-none focus:ring-0 uppercase font-mono font-bold text-xs"
                    id="tuning-name-input"
                  />
                </div>

                {/* Hyperparameters select and range slider */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <span className="text-gray-400 select-none text-[9px] uppercase tracking-widest">Base Weight Model</span>
                    <select 
                      value={baseModel}
                      onChange={(e) => setBaseModel(e.target.value)}
                      className="w-full bg-black border border-white/15 px-2.5 py-2 text-white text-[10px] focus:outline-none font-mono"
                      id="tuning-base-select"
                    >
                      <option value="gemini-3.5-flash">gemini-3.5-flash</option>
                      <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite</option>
                      <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-gray-400 select-none text-[9px] uppercase tracking-widest">Epoch Loops</span>
                    <input 
                      type="number" 
                      min="1" 
                      max="12" 
                      value={epochs}
                      onChange={(e) => setEpochs(parseInt(e.target.value) || 1)}
                      className="w-full bg-black border border-white/15 px-2.5 py-2 text-white focus:outline-none font-mono text-[10px]"
                      id="tuning-epochs-input"
                    />
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span className="uppercase">Temperature Logic (Randomness)</span>
                    <span className="text-primary-orange font-semibold">{temperature}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1.5"
                    step="0.05"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-orange"
                    id="tuning-temp-slider"
                  />
                </div>

              </div>

              {/* Active Dataset Segment */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center font-mono text-[10px] text-primary-orange uppercase font-bold tracking-widest select-none">
                  <span>Target Train Pairs ({dataset.length})</span>
                  <span>[MAPPED REGISTERS]</span>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto border border-white/10 bg-black/50 p-2.5 font-mono text-[11px]">
                  {dataset.map((kp, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-2 border-b border-white/5 pb-2 pt-0.5">
                      <div className="text-gray-300 space-y-0.5">
                        <p><strong className="text-primary-orange">IN:</strong> "{kp.input}"</p>
                        <p><strong className="text-secondary-orange font-medium">OUT:</strong> <code className="text-gray-400 bg-white/5 px-1 rounded-sm text-[10px]">{kp.output}</code></p>
                      </div>
                      
                      <button 
                        onClick={() => handleRemoveKeyPair(idx)}
                        className="text-gray-500 hover:text-red-500 cursor-pointer p-0.5"
                        aria-label="Delete entry"
                        id={`delete-btn-${idx}`}
                      >
                        <Trash2 className="h-3 w-3 shrink-0" />
                      </button>
                    </div>
                  ))}

                  {dataset.length === 0 && (
                    <p className="text-gray-500 text-center py-4 italic select-none">Datasets completely clean. Add samples below to build prompts.</p>
                  )}
                </div>

                {/* Submitting training dataset pair */}
                <div className="bg-black border border-white/5 p-3 space-y-2 font-mono text-xs">
                  <p className="text-[10px] text-gray-500 select-none uppercase font-bold">&gt; INTERPOLATE NEW TRAINING KEY:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text" 
                      placeholder="e.g. status critical"
                      value={newKeyPair.input}
                      onChange={(e) => setNewKeyPair(prev => ({ ...prev, input: e.target.value }))}
                      className="bg-zinc-950 border border-white/10 px-2 py-1.5 focus:border-primary-orange text-white text-[10px] focus:outline-none"
                      id="dataset-new-input"
                    />
                    <input 
                      type="text" 
                      placeholder="e.g. POWER_DOWN_SYS()"
                      value={newKeyPair.output}
                      onChange={(e) => setNewKeyPair(prev => ({ ...prev, output: e.target.value }))}
                      className="bg-zinc-950 border border-white/10 px-2 py-1.5 focus:border-primary-orange text-white text-[10px] focus:outline-none"
                      id="dataset-new-output"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddKeyPair}
                    className="w-full py-1.5 border border-white/15 hover:border-primary-orange hover:bg-white/5 text-[10px] font-bold text-gray-300 uppercase tracking-widest flex items-center justify-center gap-1 cursor-pointer"
                    id="dataset-add-pair-btn"
                  >
                    <Plus className="h-3.5 w-3.5" /> ATTACH TUPLE
                  </button>
                </div>
              </div>

              {/* Start synthesis action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={runLocalTrainCycle}
                  disabled={trainingStatus === 'running' || dataset.length === 0}
                  className={`w-full py-3.5 font-mono text-xs uppercase font-extrabold tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    trainingStatus === 'running' || dataset.length === 0
                      ? 'bg-neutral-900 border border-gray-600 text-gray-500 cursor-not-allowed'
                      : 'border border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-black hover:shadow-[0_0_20px_#ff5f00]'
                  }`}
                  id="run-tuning-compile-btn"
                >
                  <RefreshCw className={`h-4 w-4 ${trainingStatus === 'running' ? 'animate-spin' : ''}`} />
                  {trainingStatus === 'running' ? 'RUNNING EPOCH TRAINING...' : 'COMPILE CUSTOM WEIGHTS'}
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Train feedback simulation logs & Loss Chart rendering */}
        {trainingLogs.length > 0 && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 animate-fadeIn">
            {/* Terminal Compiler Logs */}
            <div className="md:col-span-8 space-y-2">
              <span className="font-mono text-[10px] text-gray-500 select-none uppercase font-bold">&gt;_ CALIBRATION METRICS LOG:</span>
              <div className="bg-black border border-white/10 p-4 h-64 overflow-y-auto space-y-2 font-mono text-xs text-gray-400 rounded-sm">
                {trainingLogs.map((logStr, idx) => {
                  let logClass = "text-gray-400";
                  if (logStr.includes("[ERROR]")) logClass = "text-red-500 font-bold";
                  if (logStr.includes("[SUCCESS]")) logClass = "text-primary-orange font-bold text-shadow-orange";
                  if (logStr.includes("[EPOCH")) logClass = "text-secondary-orange font-medium";
                  if (logStr.includes("[LOAD]") || logStr.includes("[BATCH]")) logClass = "text-gray-500";
                  return (
                    <div key={idx} className={logClass}>
                      {logStr}
                    </div>
                  );
                })}
                <div ref={trainingLogsEndRef} />
              </div>
            </div>

            {/* Validation Loss curve (SVG) */}
            <div className="md:col-span-4 border border-white/10 bg-neutral-950 p-4 flex flex-col justify-between rounded-sm">
              <div className="space-y-1">
                <div className="flex gap-1.5 items-center text-[10px] font-mono text-primary-orange font-bold select-none uppercase">
                  <TrendingDown className="h-3.5 w-3.5" />
                  <span>Validation Loss Curve</span>
                </div>
                <p className="text-[10px] font-mono text-gray-500">Convergence monitoring metric chart (simulated):</p>
              </div>

              {/* Custom High-Quality SVG Line Graph Chart */}
              <div className="h-32 w-full flex items-center justify-center bg-black/60 border border-white/5 relative my-3 p-1">
                {validationLoss.length > 0 ? (
                  <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                    {/* SVG grid lines */}
                    <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                    <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                    <line x1="0" y1="40" x2="100" y2="40" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                    
                    {/* SVG Line path drawing */}
                    <path
                      d={`M ${validationLoss.map((l, i) => {
                        // Normalize loss value (2.15 to 0.05) into SVG space (height 50)
                        const x = (i / (epochs - 1)) * 100;
                        const y = 45 - (l / 2.3) * 40;
                        return `${x} ${y}`;
                      }).join(' L ')}`}
                      fill="none"
                      stroke="#ff5f00"
                      strokeWidth="1.5"
                      className="animate-draw-path"
                    />

                    {/* SVG Data node dots */}
                    {validationLoss.map((l, i) => {
                      const x = (i / (epochs - 1)) * 100;
                      const y = 45 - (l / 2.3) * 40;
                      return (
                        <circle
                          key={i}
                          cx={x}
                          cy={y}
                          r="2"
                          fill="#ffaa00"
                          title={`Loss ${l}`}
                        />
                      );
                    })}
                  </svg>
                ) : (
                  <span className="font-mono text-[10px] text-gray-600 italic select-none">Epoch feed active only during compilation...</span>
                )}
              </div>

              <div className="border-t border-white/5 pt-2.5 font-mono text-[10px] text-gray-400 flex justify-between select-none">
                <span>Final converged Loss:</span>
                <span className="text-primary-orange font-bold font-mono">
                  {lossRate !== null ? lossRate.toFixed(4) : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM SECTION: Live synthesized agent exploration console */}
        <div className="mt-12 border border-primary-orange/20 bg-black/80 p-6 md:p-8 space-y-6 relative rounded-sm">
          <div className="absolute top-0 right-0 p-2 font-mono text-[8px] text-gray-500 bg-white/5 select-none font-bold">
            PROBE_PROMPT_CHANNEL
          </div>
          
          <div className="flex gap-2 items-center border-b border-primary-orange/20 pb-3">
            <MessageSquare className="h-5 w-5 text-primary-orange" />
            <h3 className="font-sans font-extrabold text-white text-base uppercase select-none">
              PROBE AGENT DIRECTLY [HOST ROUTED CHANNEL]
            </h3>
          </div>

          <p className="text-gray-400 text-xs font-sans leading-relaxed">
            Test and interact with your custom prompt engineered model parameters. If compiled above, the backend safely packs your fine-tuning datasets into active high-level system instructions as a custom wrapper, giving you actual specialized intelligence query loops!
          </p>

          <form onSubmit={handleProbeQuery} className="space-y-4">
            <div className="flex bg-black border border-white/10 text-xs text-gray-300">
              <span className="p-3 bg-white/5 font-mono text-primary-orange uppercase font-bold select-none shrink-0 border-r border-white/10 flex items-center">
                &gt;_ {agentName} ASK
              </span>
              <input 
                type="text" 
                value={probeInput}
                onChange={(e) => setProbeInput(e.target.value)}
                placeholder={
                  trainingStatus === 'completed'
                    ? "Ask your agent custom questions matching your datasets or specs!"
                    : "e.g., Explain telemetry actions on sensor alert, or summarize coding structures..."
                }
                className="w-full bg-transparent focus:outline-none px-4 py-3 placeholder:text-gray-700 font-mono text-xs text-primary-orange"
                id="probe-input-fld"
              />
              <button
                type="submit"
                disabled={isProbing || !probeInput.trim()}
                className={`px-5 font-mono font-bold text-xs uppercase cursor-pointer border-l border-white/10 flex items-center gap-1.5 transition-colors ${
                  isProbing || !probeInput.trim()
                    ? 'text-gray-600 bg-neutral-900 cursor-not-allowed'
                    : 'bg-primary-orange/10 text-primary-orange hover:bg-primary-orange hover:text-black font-semibold'
                }`}
                id="probe-submit-btn"
              >
                {isProbing ? <Loader2 className="h-4 w-4 animate-spin" /> : <>SEND <Send className="h-3 w-3" /></>}
              </button>
            </div>
          </form>

          {probeOutput && (
            <div className="border border-white/10 bg-black p-4 md:p-6 space-y-3 border-l-2 border-l-primary-orange animate-fadeIn select-all">
              <div className="flex justify-between items-center font-mono text-[10px] text-primary-orange font-bold uppercase select-none">
                <span>&gt; AGENT OUTPUT METRIC FEED:</span>
                <span className="text-gray-500">SENDER: {agentName}</span>
              </div>
              
              <div className="font-mono text-[11px] md:text-xs text-gray-300 whitespace-pre-wrap leading-relaxed">
                {probeOutput}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
