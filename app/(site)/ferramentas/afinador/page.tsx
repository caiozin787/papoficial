'use client';

import { useState } from 'react';
import { Headphones, Mic, MicOff, Power } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { usePitchDetector } from '@/lib/audio/use-pitch-detector';
import { SAX_INSTRUMENTS, concertToWritten, type SaxInstrument } from '@/lib/theory/transposition';

export default function TunerPage() {
  const { isActive, isLoading, permission, errorMessage, reading, start, stop } = usePitchDetector();
  const [instrument, setInstrument] = useState<SaxInstrument>(SAX_INSTRUMENTS[0]);

  const cents = reading?.cents ?? 0;
  const displayNote = reading ? concertToWritten(reading.note, reading.octave, instrument) : null;
  const getTuningColor = () => {
    const absCents = Math.abs(cents);
    if (absCents <= 5) return 'text-green-500';
    if (absCents <= 15) return 'text-amber-500';
    return 'text-red-500';
  };

  const needleRotation = (cents / 50) * 45;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
          <Headphones className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Afinador Cromático</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Afine seu saxofone com precisão. Veja a visualização de frequência e ajuste sua afinação em tempo real.
        </p>
      </div>

      <div className="flex justify-center gap-2 mb-8">
        {SAX_INSTRUMENTS.map((inst) => (
          <button
            key={inst}
            onClick={() => setInstrument(inst)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              instrument === inst ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'
            }`}
          >
            {inst}
          </button>
        ))}
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <Card className="p-8 shadow-xl">
          {!isActive && permission === 'idle' && (
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Mic className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-700 mb-1">Permissão de microfone necessária</p>
                  <p className="text-sm text-blue-600">
                    Quando você clicar em &quot;Ligar Afinador&quot;, seu navegador pedirá permissão para acessar o microfone.
                  </p>
                </div>
              </div>
            </div>
          )}

          {permission === 'denied' && errorMessage && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <MicOff className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-700 mb-1">Erro ao acessar o microfone</p>
                  <p className="text-sm text-red-600">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}

          {isActive && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-sm font-medium">Afinador ativo — Toque uma nota</p>
              </div>
            </div>
          )}

          <div className="text-center mb-8">
            <div className={`text-8xl font-bold mb-2 ${getTuningColor()}`}>
              {displayNote ? `${displayNote.root}${displayNote.octave}` : '--'}
            </div>
            <div className="text-3xl text-muted-foreground">{reading ? `${reading.frequency} Hz` : '--'}</div>
            {reading && (
              <div className="text-sm text-muted-foreground/70 mt-1">
                afinação concertante: {reading.note}{reading.octave}
              </div>
            )}
          </div>

          <div className="relative h-32 mb-8 bg-muted/30 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-24">
                {[-50, -25, 0, 25, 50].map((tick) => (
                  <div key={tick} className="absolute top-0 bottom-0 w-px bg-border" style={{ left: `${50 + tick}%` }}>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                      {tick > 0 ? `+${tick}` : tick}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-green-500 z-10" />

            {isActive && reading && (
              <div
                className="absolute bottom-0 left-1/2 w-1 h-16 bg-primary origin-bottom transition-transform duration-100"
                style={{ transform: `translateX(-50%) rotate(${needleRotation}deg)` }}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
              </div>
            )}
          </div>

          <div className="text-center mb-8">
            <div className={`text-4xl font-bold ${getTuningColor()}`}>
              {isActive && reading ? `${cents > 0 ? '+' : ''}${cents} cents` : '--'}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {Math.abs(cents) <= 5 ? '✓ Afinado' : Math.abs(cents) <= 15 ? 'Quase afinado' : 'Desafinado'}
            </div>
          </div>

          <Button size="lg" className="w-full" variant={isActive ? 'destructive' : 'default'} onClick={isActive ? stop : start} disabled={isLoading}>
            {isLoading ? (
              <><Power className="w-5 h-5 mr-2" />Carregando...</>
            ) : isActive ? (
              <><Power className="w-5 h-5 mr-2" />Desligar Afinador</>
            ) : (
              <><Mic className="w-5 h-5 mr-2" />Ligar Afinador</>
            )}
          </Button>
        </Card>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
          <h3 className="font-semibold text-card-foreground mb-4">Como usar o afinador</h3>
          <ol className="space-y-3 text-sm text-muted-foreground">
            {[
              'Clique em "Ligar Afinador" e permita o acesso ao microfone quando solicitado.',
              'Toque uma nota no seu saxofone próximo ao microfone.',
              'Observe a nota detectada e o indicador de cents. Ajuste até que o indicador fique verde (±5 cents).',
              'Para melhores resultados, afine em um ambiente silencioso.',
            ].map((text, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
