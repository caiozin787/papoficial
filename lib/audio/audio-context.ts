let sharedContext: AudioContext | null = null;

/** AudioContext compartilhado, criado sob demanda (precisa de um gesto do usuário no navegador). */
export function getAudioContext(): AudioContext {
  if (!sharedContext) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    sharedContext = new Ctor();
  }
  if (sharedContext.state === 'suspended') {
    void sharedContext.resume();
  }
  return sharedContext;
}
