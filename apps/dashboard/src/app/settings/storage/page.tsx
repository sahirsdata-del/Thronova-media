"use client";

import { useEffect, useState } from "react";
import { 
  HardDrive, Trash2, DatabaseZap, Clock, FileWarning, 
  Activity, RefreshCw 
} from "lucide-react";

interface StorageData {
  diskUsage: { usedBytes: number | string; totalBytes: number | string; freeBytes: number | string };
  largestFiles: Array<{ filename: string; path: string; sizeBytes: number | string }>;
  cleanupLogs: Array<{ id: string; status: string; createdAt: string; workerNode: string; bytesFreed: number | string; filesDeleted: number }>;
}

export default function StorageDashboard() {
  const [data, setData] = useState<StorageData | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchStats() {
    try {
      const res = await fetch("/api/storage/stats");
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }
  const handleRefresh = async () => {
    setLoading(true);
    await fetchStats();
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading && !data) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950">
        <RefreshCw className="animate-spin text-zinc-500 h-8 w-8" />
      </div>
    );
  }

  const { diskUsage, largestFiles, cleanupLogs } = data || {};
  
  const formatBytes = (bytes: string | number) => {
    const b = Number(bytes);
    if (b === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(b) / Math.log(k));
    return parseFloat((b / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const usedPercentage = diskUsage 
    ? (Number(diskUsage.usedBytes) / Number(diskUsage.totalBytes)) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light tracking-tight text-white flex items-center gap-3">
              <HardDrive className="h-8 w-8 text-indigo-500" />
              Storage Management
            </h1>
            <p className="text-zinc-400 mt-2">
              Monitor local disk usage, automated cleanups, and retention policies.
            </p>
          </div>
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-all"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Disk Usage Card */}
          <div className="col-span-1 md:col-span-2 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 relative overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
            
            <h2 className="text-lg font-medium text-zinc-300 mb-6 flex items-center gap-2">
              <DatabaseZap className="h-5 w-5 text-indigo-400" />
              Current Disk Usage
            </h2>
            
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative w-48 h-48">
                {/* SVG Ring */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle 
                    cx="96" cy="96" r="88" 
                    className="stroke-zinc-800 fill-none" strokeWidth="12" 
                  />
                  <circle 
                    cx="96" cy="96" r="88" 
                    className="stroke-indigo-500 fill-none drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] transition-all duration-1000 ease-out" 
                    strokeWidth="12" 
                    strokeDasharray={2 * Math.PI * 88}
                    strokeDashoffset={2 * Math.PI * 88 * (1 - usedPercentage / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-light text-white">{usedPercentage.toFixed(1)}%</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Used</span>
                </div>
              </div>

              <div className="flex items-center gap-12 mt-8 w-full justify-center">
                <div className="text-center">
                  <p className="text-sm text-zinc-500 uppercase tracking-wider">Used</p>
                  <p className="text-xl font-medium text-zinc-200 mt-1">
                    {diskUsage ? formatBytes(diskUsage.usedBytes) : "0 B"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-zinc-500 uppercase tracking-wider">Free</p>
                  <p className="text-xl font-medium text-zinc-200 mt-1">
                    {diskUsage ? formatBytes(diskUsage.freeBytes) : "0 B"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-zinc-500 uppercase tracking-wider">Total</p>
                  <p className="text-xl font-medium text-zinc-200 mt-1">
                    {diskUsage ? formatBytes(diskUsage.totalBytes) : "0 B"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Retention Rules summary */}
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl flex flex-col">
            <h2 className="text-lg font-medium text-zinc-300 mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-emerald-400" />
              Retention Policies
            </h2>
            <div className="space-y-4 flex-1">
              {[
                { label: "Temporary Assets", value: "24 Hours" },
                { label: "Rendered Videos", value: "72 Hours post-upload" },
                { label: "Failed Renders", value: "7 Days" },
                { label: "Voice / Audio", value: "24 Hours" },
              ].map((policy, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-zinc-950/50 rounded-lg border border-zinc-800/50">
                  <span className="text-sm text-zinc-400">{policy.label}</span>
                  <span className="text-sm font-medium text-zinc-200">{policy.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-start gap-3">
              <Activity className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
              <p className="text-xs text-emerald-200/70 leading-relaxed">
                Cleanup jobs run autonomously in the background via BullMQ. Only files unlinked from active projects are purged.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Largest Files */}
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl">
             <h2 className="text-lg font-medium text-zinc-300 mb-6 flex items-center gap-2">
              <FileWarning className="h-5 w-5 text-rose-400" />
              Largest Files on Disk
            </h2>
            <div className="space-y-3">
              {largestFiles?.map((file, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 bg-zinc-950/50 rounded-lg border border-zinc-800/30 group hover:border-zinc-700 transition-all">
                  <div className="overflow-hidden pr-4">
                    <p className="text-sm font-medium text-zinc-300 truncate">{file.filename}</p>
                    <p className="text-xs text-zinc-500 mt-1 truncate">{file.path}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300">
                      {formatBytes(file.sizeBytes)}
                    </span>
                  </div>
                </div>
              ))}
              {(!largestFiles || largestFiles.length === 0) && (
                <div className="text-center py-8 text-zinc-500 text-sm">
                  No large files found.
                </div>
              )}
            </div>
          </div>

          {/* Cleanup Logs */}
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl">
             <h2 className="text-lg font-medium text-zinc-300 mb-6 flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-blue-400" />
              Recent Cleanups
            </h2>
            <div className="space-y-3">
              {cleanupLogs?.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 bg-zinc-950/50 rounded-lg border border-zinc-800/30">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${log.status === 'COMPLETED' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                      <p className="text-sm font-medium text-zinc-300">
                        {new Date(log.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">Node: {log.workerNode}</p>
                  </div>
                  <div className="text-right flex flex-col gap-1">
                    <span className="text-sm font-medium text-zinc-200">
                      -{formatBytes(log.bytesFreed)}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {log.filesDeleted} files
                    </span>
                  </div>
                </div>
              ))}
              {(!cleanupLogs || cleanupLogs.length === 0) && (
                <div className="text-center py-8 text-zinc-500 text-sm">
                  No cleanups have run yet.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
