import { useState, useEffect, useRef } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Clock, Play, Pause, Volume2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Slider } from '../../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';

type TimeSignature = '2/4' | '3/4' | '4/4' | '5/4' | '6/8' | '7/8';

export function MetronomePage() {
  const [bpm, setBpm] = useState([120]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeSignature, setTimeSignature] = useState<TimeSignature>('4/4');
  const [accentFirst, setAccentFirst] = useState(true);
  const [subdivisions, setSubdivisions] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [volume, setVolume] = useState([80]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const beatsPerMeasure = {
    '2/4': 2,
    '3/4': 3,
    '4/4': 4,
    '5/4': 5,
    '6/8': 6,
    '7/8': 7
  };

  const beats = beatsPerMeasure[timeSignature];

  // Play beep sound
  const playBeep = (isAccent: boolean) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.frequency.value = isAccent ? 1200 : 800;
    oscillator.type = 'sine';

    const volumeValue = volume[0] / 100;
    gainNode.gain.setValueAtTime(volumeValue, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.1);
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = 60000 / bpm[0] / (subdivisions ? 2 : 1);
      
      intervalRef.current = setInterval(() => {
        setCurrentBeat((prev) => {
          const nextBeat = (prev + 1) % beats;
          const isAccent = accentFirst && nextBeat === 0;
          playBeep(isAccent);
          return nextBeat;
        });
      }, interval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setCurrentBeat(0);
    }
  }, [isPlaying, bpm, timeSignature, accentFirst, subdivisions, beats, volume]);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Clock className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Metrônomo Pro
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Defina seu tempo, escolha o compasso e ajuste as subdivisões para um treino avançado.
            </p>
          </div>

          {/* Main Metronome */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
              {/* BPM Display */}
              <div className="text-center mb-8">
                <div className="text-7xl font-bold text-primary mb-2">
                  {bpm[0]}
                </div>
                <div className="text-lg text-muted-foreground">BPM</div>
              </div>

              {/* Beat Indicators */}
              <div className="flex justify-center gap-3 mb-8">
                {Array.from({ length: beats }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-100 flex items-center justify-center font-bold ${
                      currentBeat === index && isPlaying
                        ? 'bg-primary border-primary text-primary-foreground scale-110'
                        : 'border-primary/30 text-primary/50'
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>

              {/* BPM Slider */}
              <div className="mb-6">
                <Slider
                  value={bpm}
                  onValueChange={setBpm}
                  min={40}
                  max={240}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>40</span>
                  <span>240</span>
                </div>
              </div>

              {/* Play/Pause Button */}
              <Button
                size="lg"
                className="w-full"
                variant={isPlaying ? "destructive" : "default"}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Parar
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Iniciar
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Settings */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
              <h3 className="font-semibold text-card-foreground mb-4">Configurações</h3>
              
              <div className="space-y-6">
                {/* Time Signature */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-card-foreground">
                    Compasso
                  </label>
                  <Select value={timeSignature} onValueChange={(value) => setTimeSignature(value as TimeSignature)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2/4">2/4</SelectItem>
                      <SelectItem value="3/4">3/4</SelectItem>
                      <SelectItem value="4/4">4/4</SelectItem>
                      <SelectItem value="5/4">5/4</SelectItem>
                      <SelectItem value="6/8">6/8</SelectItem>
                      <SelectItem value="7/8">7/8</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Volume */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-card-foreground">
                    <Volume2 className="w-4 h-4 inline mr-2" />
                    Volume: {volume[0]}%
                  </label>
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    min={0}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>

                {/* Accent First Beat */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="accent" className="text-sm font-medium">
                    Acentuar primeiro tempo
                  </Label>
                  <Switch
                    id="accent"
                    checked={accentFirst}
                    onCheckedChange={setAccentFirst}
                  />
                </div>

                {/* Subdivisions */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="subdivisions" className="text-sm font-medium">
                    Subdivisões (colcheias)
                  </Label>
                  <Switch
                    id="subdivisions"
                    checked={subdivisions}
                    onCheckedChange={setSubdivisions}
                  />
                </div>
              </div>

              {/* Quick BPM Buttons */}
              <div className="mt-6 pt-6 border-t border-border">
                <label className="block text-sm font-medium mb-3 text-card-foreground">
                  Tempos Rápidos
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[60, 80, 100, 120, 140, 160, 180, 200].map((tempo) => (
                    <Button
                      key={tempo}
                      variant="outline"
                      size="sm"
                      onClick={() => setBpm([tempo])}
                      className={bpm[0] === tempo ? 'bg-primary text-primary-foreground' : ''}
                    >
                      {tempo}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
