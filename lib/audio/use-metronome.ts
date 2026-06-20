'use client';

import { useEffect, useRef, useState } from 'react';
import { playClick } from './play-tone';

export type TimeSignature = '2/4' | '3/4' | '4/4' | '5/4' | '6/8' | '7/8';

const BEATS_PER_MEASURE: Record<TimeSignature, number> = {
  '2/4': 2, '3/4': 3, '4/4': 4, '5/4': 5, '6/8': 6, '7/8': 7,
};

export function useMetronome(initialBpm = 120) {
  const [bpm, setBpm] = useState(initialBpm);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeSignature, setTimeSignature] = useState<TimeSignature>('4/4');
  const [accentFirst, setAccentFirst] = useState(true);
  const [subdivisions, setSubdivisions] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [volume, setVolume] = useState(80);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const beats = BEATS_PER_MEASURE[timeSignature];

  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCurrentBeat(0);
      return;
    }

    const interval = 60000 / bpm / (subdivisions ? 2 : 1);
    intervalRef.current = setInterval(() => {
      setCurrentBeat((prev) => {
        const nextBeat = (prev + 1) % beats;
        const isAccent = accentFirst && nextBeat === 0;
        playClick(isAccent ? 1200 : 800, volume / 100);
        return nextBeat;
      });
    }, interval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, bpm, beats, accentFirst, subdivisions, volume]);

  return {
    bpm, setBpm, isPlaying, setIsPlaying, timeSignature, setTimeSignature,
    accentFirst, setAccentFirst, subdivisions, setSubdivisions, currentBeat, volume, setVolume, beats,
  };
}
