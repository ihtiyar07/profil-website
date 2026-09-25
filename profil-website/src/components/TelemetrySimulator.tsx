import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Cpu, 
  Activity, 
  AlertTriangle, 
  Wifi, 
  Zap, 
  RefreshCw, 
  CheckCircle2, 
  Flame,
  Snowflake,
  Gauge
} from 'lucide-react';
import type { Language } from '../data/portfolioData';

interface TelemetrySimulatorProps {
  currentLang: Language;
}

interface TelemetryLog {
  id: string;
  time: string;
  topic: string;
  payload: string;
  type: 'info' | 'warn' | 'success';
}

export const TelemetrySimulator: React.FC<TelemetrySimulatorProps> = ({ currentLang }) => {
  const isTr = currentLang === 'tr';

  const [temp, setTemp] = useState(3.8);
  const [pressure, setPressure] = useState(4.25);
  const [dischargePressure, setDischargePressure] = useState(15.2);
  const [frequency, setFrequency] = useState(48.5);
  const [networkMode, setNetworkMode] = useState<'ETH/Wi-Fi' | '4G LTE'>('ETH/Wi-Fi');
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [packetsSent, setPacketsSent] = useState(4892);
  const [logs, setLogs] = useState<TelemetryLog[]>([
    {
      id: '1',
      time: '15:42:01.120',
      topic: 'telemetry/coldchain/chiller-01/metrics',
      payload: '{"temp":3.8,"press":4.25,"freq":48.5,"rssi":-62}',
      type: 'info'
    },
    {
      id: '2',
      time: '15:42:02.122',
      topic: 'telemetry/coldchain/chiller-01/modbus',
      payload: '01 03 04 01 7C 00 E8 2A B4 [CRC OK]',
      type: 'success'
    }
  ]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const deltaTemp = (Math.random() - 0.5) * 0.15;
      const deltaPress = (Math.random() - 0.5) * 0.08;
      const deltaFreq = (Math.random() - 0.5) * 0.2;

      setTemp(prev => {
        const next = Number((prev + deltaTemp).toFixed(1));
        return isAlertActive ? Math.min(12.4, Math.max(8.5, next)) : Math.min(5.2, Math.max(2.8, next));
      });

      setPressure(prev => Number((prev + deltaPress).toFixed(2)));
      setDischargePressure(prev => Number((prev + deltaPress * 1.5).toFixed(2)));
      setFrequency(prev => Number((prev + deltaFreq).toFixed(1)));
      setPacketsSent(prev => prev + 1);

      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
      const randomHex = Math.floor(Math.random() * 255).toString(16).padStart(2, '0').toUpperCase();

      const newLog: TelemetryLog = {
        id: Math.random().toString(),
        time: timeStr,
        topic: 'telemetry/coldchain/chiller-01/metrics',
        payload: `{"temp":${temp},"press":${pressure},"modbus_reg":"0x${randomHex}","mode":"${networkMode}"}`,
        type: isAlertActive ? 'warn' : 'info'
      };

      setLogs(prev => [newLog, ...prev.slice(0, 7)]);
    }, 1400);

    return () => clearInterval(interval);
  }, [isRunning, isAlertActive, temp, pressure, networkMode]);

  const handleToggleAlert = () => {
    setIsAlertActive(!isAlertActive);
    if (!isAlertActive) {
      setTemp(9.4);
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      setLogs(prev => [
        {
          id: Math.random().toString(),
          time: timeStr,
          topic: 'alarm/coldchain/chiller-01/overtemp',
          payload: 'HIGH TEMP ALARM: Evaporator exceeded threshold (9.4°C > 6.0°C)',
          type: 'warn'
        },
        ...prev
      ]);
    } else {
      setTemp(3.8);
    }
  };

  const handleToggleNetwork = () => {
    const nextMode = networkMode === 'ETH/Wi-Fi' ? '4G LTE' : 'ETH/Wi-Fi';
    setNetworkMode(nextMode);
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setLogs(prev => [
      {
        id: Math.random().toString(),
        time: timeStr,
        topic: 'network/gateway/failover',
        payload: `AUTOMATIC FAILOVER -> Switched to ${nextMode}`,
        type: 'success'
      },
      ...prev
    ]);
  };

  const handleWriteSetpoint = () => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setLogs(prev => [
      {
        id: Math.random().toString(),
        time: timeStr,
        topic: 'control/chiller-01/holding_reg',
        payload: 'MODBUS WRITE REG 40001 (Set: 3.5°C) -> ACK [01 06 9C 41 0D 8A]',
        type: 'success'
      },
      ...prev
    ]);
  };

  return (
    <section id="telemetry" className="py-12 sm:py-16 md:py-24 border-b border-slate-800/80 bg-gradient-to-b from-[#030712] via-[#050c18] to-[#030712] w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 mb-2 sm:mb-3">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>{isTr ? 'Canlı Donanım Sandbox' : 'Hardware Telemetry Sandbox'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {isTr ? 'Endüstriyel Telemetri Simülatörü' : 'Industrial IoT Telemetry'}
            </h2>
            <p className="mt-1.5 sm:mt-2 text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl font-sans">
              {isTr
                ? 'ESP32 firmware ve Modbus RTU protokolü ile endüstriyel soğutma tesisinden gelen canlı telemetriyi inceleyin.'
                : 'Inspect simulated live telemetry streamed via ESP32 FreeRTOS firmware and Modbus RTU from cold-chain chillers.'}
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => setIsRunning(!isRunning)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRunning ? 'animate-spin' : ''}`} />
              <span>{isRunning ? (isTr ? 'Canlı Akış Aktif' : 'Ticking') : (isTr ? 'Duraklatıldı' : 'Paused')}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Left: Device Status & Gauges (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Top Gateway Status Card */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-xl font-mono">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 sm:pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-white font-bold truncate">NODE: ESP32-CHILLER-01</span>
                  <span className="text-[10px] text-slate-400 hidden xs:inline">| RS-485</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className={`w-2 h-2 rounded-full ${isAlertActive ? 'bg-rose-500 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
                  <span className={`text-[11px] sm:text-xs font-bold ${isAlertActive ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {isAlertActive ? 'ALARM: HIGH TEMP' : 'STATUS: NORMAL'}
                  </span>
                </div>
              </div>

              {/* Hardware Parameters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2.5 sm:pt-3 text-[10px] sm:text-[11px] text-slate-400">
                <div>
                  <span className="block text-slate-400 text-[9px] sm:text-[10px]">INTERFACE</span>
                  <strong className="text-cyan-400 truncate block">{networkMode}</strong>
                </div>
                <div>
                  <span className="block text-slate-400 text-[9px] sm:text-[10px]">GSM SIGNAL</span>
                  <strong className="text-slate-200 truncate block">-62 dBm (CSQ 28)</strong>
                </div>
                <div>
                  <span className="block text-slate-400 text-[9px] sm:text-[10px]">BAUDRATE</span>
                  <strong className="text-slate-200 truncate block">9600 8-N-1</strong>
                </div>
                <div>
                  <span className="block text-slate-400 text-[9px] sm:text-[10px]">PACKETS</span>
                  <strong className="text-emerald-400 truncate block">{packetsSent.toLocaleString()}</strong>
                </div>
              </div>
            </div>

            {/* Gauges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Metric 1 */}
              <div className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                isAlertActive 
                  ? 'bg-rose-950/30 border-rose-500/50 shadow-[0_0_20px_-3px_rgba(244,63,94,0.3)]' 
                  : 'bg-slate-900/80 border-slate-800'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-mono text-slate-400">
                    {isTr ? 'Evaporatör Sıcaklığı' : 'Evaporator Temp'}
                  </span>
                  {temp < 6 ? (
                    <Snowflake className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Flame className="w-4 h-4 text-rose-500 animate-bounce" />
                  )}
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className={`text-2xl sm:text-3xl font-extrabold font-mono tracking-tight ${
                    isAlertActive ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    {temp > 0 ? `+${temp}` : temp}°C
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Reg: 30001</span>
                </div>
                <div className="mt-1.5 text-[9px] sm:text-[10px] font-mono text-slate-400 flex items-center justify-between">
                  <span>Target: +4.0°C</span>
                  <span className={isAlertActive ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                    {isAlertActive ? 'Threshold Spike' : 'Stable'}
                  </span>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-mono text-slate-400">
                    {isTr ? 'Emme / Basma Bar' : 'Suction / Disch.'}
                  </span>
                  <Gauge className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="mt-2 flex items-baseline gap-1.5 sm:gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-cyan-400">
                    {pressure}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-slate-400">/ {dischargePressure} bar</span>
                </div>
                <div className="mt-1.5 text-[9px] sm:text-[10px] font-mono text-slate-400 flex items-center justify-between">
                  <span>Reg: 30003 & 4</span>
                  <span className="text-emerald-400">Optimal</span>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-mono text-slate-400">
                    {isTr ? 'Kompresör İnvertör' : 'Inverter Frequency'}
                  </span>
                  <Activity className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-slate-100">
                    {frequency}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-slate-400">Hz</span>
                </div>
                <div className="mt-1.5 text-[9px] sm:text-[10px] font-mono text-slate-400 flex items-center justify-between">
                  <span>PID Modulation</span>
                  <span className="text-cyan-400">Active</span>
                </div>
              </div>

            </div>

            {/* Interactive Actions (Responsive flex buttons) */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] sm:text-xs font-mono text-slate-400 block mb-2.5 font-semibold uppercase tracking-wider">
                {isTr ? '🎮 Donanım Test Eylemleri:' : '🎮 Hardware Test Actions:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={handleToggleAlert}
                  className={`px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center ${
                    isAlertActive
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md'
                      : 'bg-slate-900 hover:bg-slate-850 border border-rose-500/40 text-rose-300'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{isAlertActive ? (isTr ? 'Alarmı Sıfırla' : 'Reset Alarm') : (isTr ? 'Sıcaklık Artışı (+9°C)' : 'Spike Temp')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleToggleNetwork}
                  className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-850 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <Wifi className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{isTr ? '4G Failover Geç' : '4G Failover'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWriteSetpoint}
                  className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-850 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{isTr ? 'Register Yaz (0x06)' : 'Write Reg (0x06)'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right: Live MQTT & Modbus Wire Packet Stream (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-3.5 sm:p-4 font-mono shadow-2xl h-full flex flex-col">
              
              <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-white font-bold text-[11px] sm:text-xs">MQTT OVER TLS</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-slate-400">Ring-Buffer: 0 dropped</span>
              </div>

              {/* Terminal log */}
              <div className="mt-2.5 flex-1 space-y-2 overflow-y-auto max-h-[260px] sm:max-h-[340px] pr-1 scrollbar-thin text-[10px] sm:text-[11px]">
                {logs.map((log) => (
                  <div 
                    key={log.id} 
                    className="p-2 rounded bg-slate-900/70 border border-slate-800/80 leading-snug animate-in fade-in duration-150"
                  >
                    <div className="flex items-center justify-between text-[9px] text-slate-400 mb-0.5">
                      <span>{log.time}</span>
                      <span className={`px-1 rounded text-[8px] sm:text-[9px] ${
                        log.type === 'warn' 
                          ? 'bg-rose-950 text-rose-300 border border-rose-800' 
                          : log.type === 'success'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      }`}>
                        {log.topic.split('/').slice(-1)[0]}
                      </span>
                    </div>
                    <div className="text-slate-400 text-[9px] truncate">{log.topic}</div>
                    <div className={`mt-0.5 font-mono break-all text-[10px] sm:text-[11px] ${
                      log.type === 'warn' ? 'text-rose-300 font-semibold' : log.type === 'success' ? 'text-emerald-300' : 'text-slate-200'
                    }`}>
                      {log.payload}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400">
                <span>Modbus / MQTT v5</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  QoS 1
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
