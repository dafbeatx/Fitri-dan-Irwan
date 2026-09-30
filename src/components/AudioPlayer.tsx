"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { VolumeX, Volume2 } from "lucide-react";

interface AudioPlayerProps {
  autoPlayTriggered: boolean;
  audioSrc?: string;
}

export function AudioPlayer({
  autoPlayTriggered,
  audioSrc = "/audio/wedding-melody.mp3",
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthContextRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Synthesizes a soothing harmonic ambient acoustic chord progression via Web Audio API
  const startHarmonicSynth = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!synthContextRef.current) {
        synthContextRef.current = new AudioCtx();
      }

      const ctx = synthContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const playPluck = (freq: number, delayMs: number) => {
        setTimeout(() => {
          if (!synthContextRef.current || synthContextRef.current.state === "closed") return;
          try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, ctx.currentTime);

            gain.gain.setValueAtTime(0.0001, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.4);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 2.5);
          } catch {
            // Audio context error ignore
          }
        }, delayMs);
      };

      // Gentle pentatonic harp notes: C4, E4, G4, A4, C5, D5
      const chords = [
        [261.63, 329.63, 392.0, 523.25], // C major
        [220.0, 261.63, 329.63, 440.0],  // A minor
        [174.61, 220.0, 261.63, 349.23], // F major
        [196.0, 246.94, 293.66, 392.0],  // G major
      ];

      let chordIndex = 0;
      const playChordProgression = () => {
        const currentChord = chords[chordIndex % chords.length];
        currentChord.forEach((noteFreq, idx) => {
          playPluck(noteFreq, idx * 300);
        });
        chordIndex++;
      };

      playChordProgression();
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = setInterval(playChordProgression, 3200);

      setIsSynthesizing(true);
      setIsPlaying(true);
    } catch {
      // Audio fallback fail safe
    }
  }, []);

  const stopHarmonicSynth = useCallback(() => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (synthContextRef.current && synthContextRef.current.state !== "closed") {
      synthContextRef.current.suspend();
    }
    setIsSynthesizing(false);
  }, []);

  const playMusic = useCallback(() => {
    if (audioRef.current) {
      const promise = audioRef.current.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // If audio file is missing or blocked, start ambient synthesizer
            startHarmonicSynth();
          });
      }
    } else {
      startHarmonicSynth();
    }
  }, [startHarmonicSynth]);

  const pauseMusic = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
    if (isSynthesizing) {
      stopHarmonicSynth();
    }
    setIsPlaying(false);
  }, [isSynthesizing, stopHarmonicSynth]);

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  useEffect(() => {
    if (autoPlayTriggered && !isPlaying) {
      playMusic();
    }
  }, [autoPlayTriggered, isPlaying, playMusic]);

  useEffect(() => {
    return () => {
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      if (synthContextRef.current && synthContextRef.current.state !== "closed") {
        synthContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed top-5 right-5 z-40">
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />
      <button
        onClick={toggleMusic}
        type="button"
        aria-label={isPlaying ? "Jeda musik latar" : "Putar musik latar"}
        className="group relative flex items-center gap-2 p-2.5 rounded-full bg-ivory-50/90 border border-gold-400/50 shadow-md backdrop-blur-sm transition-all hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-gold-400 min-w-11 min-h-11"
      >
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-full bg-sage-700 text-ivory-50 transition-transform ${
            isPlaying ? "animate-spin-slow" : ""
          }`}
        >
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-gold-100" />
          ) : (
            <VolumeX className="w-4 h-4 text-gold-100" />
          )}
        </span>
        <span className="hidden sm:inline-block pr-2 text-xs font-medium text-sage-700">
          {isPlaying ? "Musik Aktif" : "Putar Musik"}
        </span>
      </button>
    </div>
  );
}
