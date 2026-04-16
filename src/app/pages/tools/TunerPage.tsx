import { useState, useEffect, useRef } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Headphones, Mic, MicOff, Power } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

const noteStrings = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function TunerPage() {
  const [isActive, setIsActive] = useState(false);
  const [frequency, setFrequency] = useState<number>(0);
  const [note, setNote] = useState<string>('--');
  const [cents, setCents] = useState<number>(0);
  const [isMicAllowed, setIsMicAllowed] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Convert frequency to note
  const getNote = (freq: number): { note: string; cents: number; octave: number } => {
    const noteNum = 12 * (Math.log(freq / 440) / Math.log(2));
    const noteIndex = Math.round(noteNum) + 69;
    const cents = Math.floor((noteNum - Math.round(noteNum)) * 100);
    
    return {
      note: noteStrings[noteIndex % 12],
      cents: cents,
      octave: Math.floor(noteIndex / 12) - 1
    };
  };

  // Auto-correlation algorithm for pitch detection
  const autoCorrelate = (buffer: Float32Array, sampleRate: number): number => {
    let SIZE = buffer.length;
    let rms = 0;

    for (let i = 0; i < SIZE; i++) {
      const val = buffer[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);

    if (rms < 0.01) return -1;

    let r1 = 0, r2 = SIZE - 1;
    const threshold = 0.2;

    for (let i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buffer[i]) < threshold) {
        r1 = i;
        break;
      }
    }

    for (let i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buffer[SIZE - i]) < threshold) {
        r2 = SIZE - i;
        break;
      }
    }

    buffer = buffer.slice(r1, r2);
    SIZE = buffer.length;

    const c = new Array(SIZE).fill(0);
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE - i; j++) {
        c[i] = c[i] + buffer[j] * buffer[j + i];
      }
    }

    let d = 0;
    while (c[d] > c[d + 1]) d++;

    let maxval = -1, maxpos = -1;
    for (let i = d; i < SIZE; i++) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }

    let T0 = maxpos;

    const x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
    const a = (x1 + x3 - 2 * x2) / 2;
    const b = (x3 - x1) / 2;
    if (a) T0 = T0 - b / (2 * a);

    return sampleRate / T0;
  };

  // Update pitch
  const updatePitch = () => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.fftSize;
    const buffer = new Float32Array(bufferLength);
    analyser.getFloatTimeDomainData(buffer);

    const detectedFreq = autoCorrelate(buffer, audioContextRef.current!.sampleRate);

    if (detectedFreq > 0 && detectedFreq < 4000) {
      const noteData = getNote(detectedFreq);
      setFrequency(Math.round(detectedFreq * 10) / 10);
      setNote(`${noteData.note}${noteData.octave}`);
      setCents(noteData.cents);
    }

    if (isActive) {
      rafIdRef.current = requestAnimationFrame(updatePitch);
    }
  };

  // Start tuner
  const startTuner = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setIsMicAllowed(true);

      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      microphoneRef.current.connect(analyserRef.current);

      setIsActive(true);
      setErrorMessage('');
      updatePitch();
    } catch (error: any) {
      // Don't log error to console - it's expected when permission is denied
      setIsMicAllowed(false);
      
      // Provide more specific error messages
      if (error.name === 'NotAllowedError') {
        setErrorMessage('Acesso ao microfone negado. Clique no ícone de cadeado na barra de endereço e permita o acesso ao microfone.');
      } else if (error.name === 'NotFoundError') {
        setErrorMessage('Nenhum microfone encontrado. Verifique se há um microfone conectado ao dispositivo.');
      } else if (error.name === 'NotReadableError') {
        setErrorMessage('O microfone está sendo usado por outro aplicativo. Feche outros aplicativos e tente novamente.');
      } else {
        setErrorMessage('Erro ao acessar o microfone. Por favor, verifique as permissões do navegador.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Stop tuner
  const stopTuner = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsActive(false);
    setFrequency(0);
    setNote('--');
    setCents(0);
  };

  useEffect(() => {
    return () => {
      stopTuner();
    };
  }, []);

  // Calculate needle rotation
  const getNeedleRotation = () => {
    const maxRotation = 45;
    return (cents / 50) * maxRotation;
  };

  // Get color based on tuning accuracy
  const getTuningColor = () => {
    const absCents = Math.abs(cents);
    if (absCents <= 5) return 'text-green-500';
    if (absCents <= 15) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Headphones className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Afinador Cromático
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Afine seu saxofone com precisão. Veja a visualização de frequência e ajuste sua afinação em tempo real.
            </p>
          </div>

          {/* Tuner Display */}
          <div className="max-w-2xl mx-auto mb-8">
            <Card className="p-8 shadow-xl">
              {/* Initial instruction */}
              {!isActive && isMicAllowed === null && (
                <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Mic className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-700 mb-1">
                        Permissão de microfone necessária
                      </p>
                      <p className="text-sm text-blue-600">
                        Quando você clicar em "Ligar Afinador", seu navegador pedirá permissão para acessar o microfone. 
                        Clique em "Permitir" para usar o afinador.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Microphone Status */}
              {isMicAllowed === false && errorMessage && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <MicOff className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-700 mb-1">
                        Erro ao acessar o microfone
                      </p>
                      <p className="text-sm text-red-600 mb-2">
                        {errorMessage}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setIsMicAllowed(null);
                          setErrorMessage('');
                        }}
                        className="mt-2 text-xs"
                      >
                        Tentar Novamente
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Active status */}
              {isActive && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-green-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-sm font-medium">
                      Afinador ativo - Toque uma nota
                    </p>
                  </div>
                </div>
              )}

              {/* Note Display */}
              <div className="text-center mb-8">
                <div className={`text-8xl font-bold mb-2 ${getTuningColor()}`}>
                  {note}
                </div>
                <div className="text-3xl text-muted-foreground">
                  {frequency > 0 ? `${frequency} Hz` : '--'}
                </div>
              </div>

              {/* Tuning Meter */}
              <div className="relative h-32 mb-8 bg-muted/30 rounded-lg overflow-hidden">
                {/* Background ticks */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-24">
                    {[-50, -25, 0, 25, 50].map((tick) => (
                      <div
                        key={tick}
                        className="absolute top-0 bottom-0 w-px bg-border"
                        style={{ left: `${50 + tick}%` }}
                      >
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                          {tick > 0 ? `+${tick}` : tick}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Center line */}
                <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-green-500 z-10" />

                {/* Needle */}
                {isActive && frequency > 0 && (
                  <div
                    className="absolute bottom-0 left-1/2 w-1 h-16 bg-primary origin-bottom transition-transform duration-100"
                    style={{
                      transform: `translateX(-50%) rotate(${getNeedleRotation()}deg)`
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
                  </div>
                )}
              </div>

              {/* Cents Display */}
              <div className="text-center mb-8">
                <div className={`text-4xl font-bold ${getTuningColor()}`}>
                  {isActive && frequency > 0 ? (
                    <>
                      {cents > 0 ? '+' : ''}{cents} cents
                    </>
                  ) : (
                    '--'
                  )}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {Math.abs(cents) <= 5 ? '✓ Afinado' : Math.abs(cents) <= 15 ? 'Quase afinado' : 'Desafinado'}
                </div>
              </div>

              {/* Control Button */}
              <Button
                size="lg"
                className="w-full"
                variant={isActive ? "destructive" : "default"}
                onClick={isActive ? stopTuner : startTuner}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Power className="w-5 h-5 mr-2" />
                    Carregando...
                  </>
                ) : isActive ? (
                  <>
                    <Power className="w-5 h-5 mr-2" />
                    Desligar Afinador
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 mr-2" />
                    Ligar Afinador
                  </>
                )}
              </Button>
            </Card>
          </div>

          {/* Instructions */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
              <h3 className="font-semibold text-card-foreground mb-4">Como usar o afinador</h3>
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>
                    Clique em "Ligar Afinador" e permita o acesso ao microfone quando solicitado.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>
                    Toque uma nota no seu saxofone próximo ao microfone.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>
                    Observe a nota detectada e o indicador de cents. Ajuste até que o indicador 
                    fique verde (±5 cents).
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span>
                    Para melhores resultados, afine em um ambiente silencioso.
                  </span>
                </li>
              </ol>

              <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
                <p className="text-sm text-foreground/70">
                  <strong className="text-accent">💡 Dica:</strong> O afinador funciona melhor 
                  com notas sustentadas. Evite tocar muito forte ou muito fraco.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}