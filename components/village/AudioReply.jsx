"use client";
import { useEffect, useRef, useState } from "react";
import { Mic, Square, Play, Pause, RotateCcw } from "lucide-react";

export default function AudioReply({ onSubmit }) {
  const [rec, setRec] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [blobUrl, setBlobUrl] = useState("");
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const [rate, setRate] = useState(1);

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream);
    mr.ondataavailable = (e) => setChunks((ch) => [...ch, e.data]);
    mr.onstop = () => {
      const b = new Blob(chunks, { type: "audio/webm" });
      setBlobUrl(URL.createObjectURL(b));
    };
    setChunks([]);
    setRec(mr);
    mr.start();
    setRecording(true);
  }
  function stop() {
    rec?.stop();
    setRecording(false);
  }
  function reset() {
    setChunks([]);
    setBlobUrl("");
    setPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }
  function togglePlay() {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play(); setPlaying(true); }
  }
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = rate;
  }, [rate]);

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
      {!blobUrl ? (
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-600">Add audio reply (tones, pronunciation)</div>
          {!recording ? (
            <button onClick={start} className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700">
              <Mic size={14}/> Record
            </button>
          ) : (
            <button onClick={stop} className="inline-flex items-center gap-1 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700">
              <Square size={14}/> Stop
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <audio ref={audioRef} src={blobUrl} onEnded={() => setPlaying(false)} />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={togglePlay} className="rounded-full border border-gray-300 p-2 hover:bg-white">
                {playing ? <Pause size={14}/> : <Play size={14}/>}
              </button>
              <span className="text-xs text-gray-600">Speed</span>
              <select className="text-xs rounded border border-gray-300 px-1 py-0.5" value={rate} onChange={(e)=>setRate(parseFloat(e.target.value))}>
                <option value={0.75}>0.75×</option>
                <option value={1}>1×</option>
                <option value={1.25}>1.25×</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={reset} className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-white">
                <RotateCcw size={12}/> Reset
              </button>
              <button
                onClick={() => onSubmit?.(blobUrl)}
                className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700"
              >
                Post audio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
