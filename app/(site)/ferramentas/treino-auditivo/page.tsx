'use client';

import { useEffect, useState } from 'react';
import { Ear, Volume2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  generateNoteQuestion, generateChordQuestion, generateScaleQuestion,
  type NoteQuestion, type ChordQuestion, type ScaleQuestion,
} from '@/lib/theory/ear-training';
import { playNote, playChordTones, playSequence } from '@/lib/audio/play-tone';

type Mode = 'note' | 'chord' | 'scale';
type Question = NoteQuestion | ChordQuestion | ScaleQuestion;

const MODE_LABELS: Record<Mode, string> = { note: 'Notas', chord: 'Acordes', scale: 'Escalas' };

function generateQuestion(mode: Mode): Question {
  if (mode === 'note') return generateNoteQuestion();
  if (mode === 'chord') return generateChordQuestion();
  return generateScaleQuestion();
}

function playQuestion(question: Question) {
  if (question.type === 'note') {
    playNote(question.note.frequency, 1);
  } else if (question.type === 'chord') {
    playChordTones(question.tones.map((t) => t.frequency), 1.4);
  } else {
    playSequence(question.tones.map((t) => t.frequency), 140);
  }
}

export default function EarTrainingPage() {
  const [mode, setMode] = useState<Mode>('note');
  const [question, setQuestion] = useState<Question | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // Gerada só no cliente: usa números aleatórios, então não pode rodar durante o SSR
  // (senão o servidor e o navegador produzem perguntas diferentes e o React quebra a hidratação).
  useEffect(() => {
    setQuestion(generateQuestion('note'));
  }, []);

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setQuestion(generateQuestion(newMode));
    setSelected(null);
  };

  const nextQuestion = () => {
    setQuestion(generateQuestion(mode));
    setSelected(null);
  };

  const handleAnswer = (option: string) => {
    if (selected || !question) return;
    setSelected(option);
    setScore((s) => ({ correct: s.correct + (option === question.answer ? 1 : 0), total: s.total + 1 }));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
          <Ear className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Treino Auditivo</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Desenvolva seu ouvido reconhecendo notas, acordes e escalas.
        </p>
      </div>

      <div className="flex justify-center gap-2 mb-8">
        {(Object.keys(MODE_LABELS) as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => handleModeChange(m)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              mode === m ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'
            }`}
          >
            {MODE_LABELS[m]}
          </button>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-xl border border-border p-8 shadow-lg text-center">
          <div className="text-sm text-muted-foreground mb-6">
            Acertos: <span className="font-semibold text-foreground">{score.correct}</span> / {score.total}
          </div>

          <Button size="lg" onClick={() => question && playQuestion(question)} disabled={!question} className="mb-8">
            <Volume2 className="w-5 h-5 mr-2" />
            Tocar
          </Button>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {question?.options.map((option) => {
              const isCorrect = option === question!.answer;
              const isSelected = option === selected;
              let style = 'border-border bg-background hover:border-primary/50';
              if (selected) {
                if (isCorrect) style = 'border-green-500 bg-green-500/10 text-green-700';
                else if (isSelected) style = 'border-red-500 bg-red-500/10 text-red-700';
              }
              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={!!selected}
                  className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${style}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {selected && (
            <Button variant="outline" onClick={nextQuestion}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Próxima pergunta
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
