'use client';

import { Clock, Play, Pause, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useMetronome, type TimeSignature } from '@/lib/audio/use-metronome';

const TIME_SIGNATURES: TimeSignature[] = ['2/4', '3/4', '4/4', '5/4', '6/8', '7/8'];
const QUICK_TEMPOS = [60, 80, 100, 120, 140, 160, 180, 200];

export default function MetronomePage() {
  const {
    bpm, setBpm, isPlaying, setIsPlaying, timeSignature, setTimeSignature,
    accentFirst, setAccentFirst, subdivisions, setSubdivisions, currentBeat, volume, setVolume, beats,
  } = useMetronome();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
          <Clock className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Metrónomo</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Defina seu tempo, escolha o compasso e ajuste as subdivisões para um treino avançado.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="text-7xl font-bold text-primary mb-2">{bpm}</div>
            <div className="text-lg text-muted-foreground">BPM</div>
          </div>

          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {Array.from({ length: beats }).map((_, index) => (
              <div
                key={index}
                className={`w-12 h-12 rounded-full border-2 transition-all duration-100 flex items-center justify-center font-bold ${
                  currentBeat === index && isPlaying ? 'bg-primary border-primary text-primary-foreground scale-110' : 'border-primary/30 text-primary/50'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>

          <div className="mb-6">
            <Slider value={[bpm]} onValueChange={(v) => setBpm(v[0])} min={40} max={240} step={1} className="w-full" />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>40</span>
              <span>240</span>
            </div>
          </div>

          <Button size="lg" className="w-full" variant={isPlaying ? 'destructive' : 'default'} onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <><Pause className="w-5 h-5 mr-2" />Parar</> : <><Play className="w-5 h-5 mr-2" />Iniciar</>}
          </Button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
          <h3 className="font-semibold text-card-foreground mb-4">Configurações</h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-card-foreground">Compasso</label>
              <Select value={timeSignature} onValueChange={(value) => setTimeSignature(value as TimeSignature)}>
                <SelectTrigger>
                  <SelectValue>{timeSignature}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {TIME_SIGNATURES.map((sig) => (
                    <SelectItem key={sig} value={sig}>{sig}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-card-foreground">
                <Volume2 className="w-4 h-4 inline mr-2" />
                Volume: {volume}%
              </label>
              <Slider value={[volume]} onValueChange={(v) => setVolume(v[0])} min={0} max={100} step={5} className="w-full" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="accent" className="text-sm font-medium">Acentuar primeiro tempo</Label>
              <Switch id="accent" checked={accentFirst} onCheckedChange={setAccentFirst} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="subdivisions" className="text-sm font-medium">Subdivisões (colcheias)</Label>
              <Switch id="subdivisions" checked={subdivisions} onCheckedChange={setSubdivisions} />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <label className="block text-sm font-medium mb-3 text-card-foreground">Tempos Rápidos</label>
            <div className="grid grid-cols-4 gap-2">
              {QUICK_TEMPOS.map((tempo) => (
                <Button
                  key={tempo} variant="outline" size="sm" onClick={() => setBpm(tempo)}
                  className={bpm === tempo ? 'bg-primary text-primary-foreground' : ''}
                >
                  {tempo}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
