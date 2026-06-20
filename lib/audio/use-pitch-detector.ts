'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { autoCorrelate } from './pitch-detection';
import { frequencyToNote } from '../theory/notes';

export type MicPermission = 'idle' | 'granted' | 'denied';

export interface PitchReading {
  frequency: number;
  note: string;
  octave: number;
  cents: number;
}

export function usePitchDetector() {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [permission, setPermission] = useState<MicPermission>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [reading, setReading] = useState<PitchReading | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const activeRef = useRef(false);

  const tick = useCallback(() => {
    const analyser = analyserRef.current;
    const ctx = audioContextRef.current;
    if (!analyser || !ctx) return;

    const buffer = new Float32Array(analyser.fftSize);
    analyser.getFloatTimeDomainData(buffer);
    const frequency = autoCorrelate(buffer, ctx.sampleRate);

    if (frequency > 0 && frequency < 4000) {
      const { note, octave, cents } = frequencyToNote(frequency);
      setReading({ frequency: Math.round(frequency * 10) / 10, note, octave, cents });
    }

    if (activeRef.current) {
      rafIdRef.current = requestAnimationFrame(tick);
    }
  }, []);

  const stop = useCallback(() => {
    activeRef.current = false;
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    sourceRef.current?.disconnect();
    audioContextRef.current?.close();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    audioContextRef.current = null;
    setIsActive(false);
    setReading(null);
  }, []);

  const start = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setPermission('granted');

      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctor();
      audioContextRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);
      sourceRef.current = source;

      activeRef.current = true;
      setIsActive(true);
      tick();
    } catch (error) {
      setPermission('denied');
      const err = error as DOMException;
      if (err.name === 'NotAllowedError') {
        setErrorMessage('Acesso ao microfone negado. Permita o acesso nas configurações do navegador.');
      } else if (err.name === 'NotFoundError') {
        setErrorMessage('Nenhum microfone encontrado.');
      } else if (err.name === 'NotReadableError') {
        setErrorMessage('O microfone está sendo usado por outro aplicativo.');
      } else {
        setErrorMessage('Erro ao acessar o microfone.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [tick]);

  useEffect(() => stop, [stop]);

  return { isActive, isLoading, permission, errorMessage, reading, start, stop };
}
