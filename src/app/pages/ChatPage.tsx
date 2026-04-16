import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Send, MessageCircle, User, Bot, Video, Upload, CheckCircle, Clock, X, Play } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

interface VideoSubmission {
  id: string;
  videoUrl: string;
  videoName: string;
  timestamp: Date;
  status: 'pending' | 'reviewed';
  feedback?: string;
  studentName?: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'instructor';
  timestamp: Date;
  video?: VideoSubmission;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Olá! Bem-vindo ao chat de dúvidas da Sax Tools. Como posso ajudar você hoje? Você também pode enviar vídeos para eu avaliar sua técnica!',
    sender: 'instructor',
    timestamp: new Date(Date.now() - 3600000),
  },
];

const autoResponses: Record<string, string> = {
  'olá': 'Olá! Como posso ajudar você hoje?',
  'oi': 'Oi! Em que posso ser útil?',
  'escalas': 'Para praticar escalas, recomendo começar com as escalas maiores e menores. Use nossa ferramenta de Escalas Interativas na seção de Ferramentas. Que dúvida específica você tem sobre escalas?',
  'afinação': 'Para afinar seu saxofone, use nosso Afinador Cromático. Lembre-se de aquecer o instrumento antes de afinar. A nota de referência é o Lá 440Hz. Precisa de mais orientações?',
  'respiração': 'A respiração correta é fundamental! Respire pelo diafragma, não pelos ombros. Confira nossa vídeo-aula sobre Técnicas de Respiração na seção de Vídeos. Tem alguma dificuldade específica?',
  'metrônomo': 'O metrônomo é essencial para desenvolver senso rítmico. Comece devagar (60-80 BPM) e aumente gradualmente. Use nosso Metrônomo Pro para praticar. Quer dicas de exercícios?',
  'iniciante': 'Seja bem-vindo! Para iniciantes, recomendo: 1) Aprender a montar o instrumento corretamente, 2) Praticar respiração, 3) Começar com notas longas. Confira a Aula 1 para Iniciantes nos nossos vídeos!',
};

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [videoSubmissions, setVideoSubmissions] = useState<VideoSubmission[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoSubmission | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getAutoResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    for (const [keyword, response] of Object.entries(autoResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    return 'Obrigado pela sua pergunta! Um instrutor irá responder em breve. Enquanto isso, explore nossas ferramentas e vídeo-aulas para continuar aprendendo.';
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = getAutoResponse(inputText);
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'instructor',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, responseMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('video/')) {
      alert('Por favor, envie apenas arquivos de vídeo.');
      return;
    }

    // Validar tamanho (máx 50MB para demo)
    if (file.size > 50 * 1024 * 1024) {
      alert('O vídeo deve ter no máximo 50MB.');
      return;
    }

    const videoUrl = URL.createObjectURL(file);
    const videoSubmission: VideoSubmission = {
      id: Date.now().toString(),
      videoUrl,
      videoName: file.name,
      timestamp: new Date(),
      status: 'pending',
      studentName: 'Aluno',
    };

    setVideoSubmissions((prev) => [...prev, videoSubmission]);

    // Adicionar mensagem com vídeo
    const newMessage: Message = {
      id: Date.now().toString(),
      text: `Enviei um vídeo para avaliação: ${file.name}`,
      sender: 'user',
      timestamp: new Date(),
      video: videoSubmission,
    };

    setMessages((prev) => [...prev, newMessage]);

    // Auto-resposta do instrutor
    setIsTyping(true);
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Recebi seu vídeo! Vou analisar sua técnica e te dar um feedback detalhado em breve. Continue praticando!',
        sender: 'instructor',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, responseMessage]);
      setIsTyping(false);
    }, 1500);

    // Resetar input
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };

  const handleAddFeedback = () => {
    if (!selectedVideo || !feedbackText.trim()) return;

    // Atualizar submission
    setVideoSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === selectedVideo.id
          ? { ...sub, status: 'reviewed' as const, feedback: feedbackText }
          : sub
      )
    );

    // Adicionar mensagem de feedback
    const feedbackMessage: Message = {
      id: Date.now().toString(),
      text: `Feedback sobre "${selectedVideo.videoName}": ${feedbackText}`,
      sender: 'instructor',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, feedbackMessage]);
    setFeedbackText('');
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Chat de Dúvidas e Avaliação
              </h1>
              <p className="text-lg text-foreground/70">
                Tire suas dúvidas e envie vídeos para avaliação personalizada
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chat Container */}
              <div className="lg:col-span-2">
                <div className="bg-background rounded-xl shadow-lg border border-border overflow-hidden">
                  {/* Chat Messages */}
                  <div className="h-[500px] overflow-y-auto p-6 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-start gap-3 ${
                          message.sender === 'user' ? 'flex-row-reverse' : ''
                        }`}
                      >
                        {/* Avatar */}
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                            message.sender === 'user'
                              ? 'bg-primary/10 text-primary'
                              : 'bg-secondary text-secondary-foreground'
                          }`}
                        >
                          {message.sender === 'user' ? (
                            <User className="h-5 w-5" />
                          ) : (
                            <Bot className="h-5 w-5" />
                          )}
                        </div>

                        {/* Message Bubble */}
                        <div
                          className={`flex-1 max-w-[70%] ${
                            message.sender === 'user' ? 'flex flex-col items-end' : ''
                          }`}
                        >
                          <div
                            className={`rounded-lg px-4 py-3 ${
                              message.sender === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-foreground'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.text}</p>
                            
                            {/* Video Preview in Message */}
                            {message.video && (
                              <div className="mt-3 rounded-lg overflow-hidden bg-black/20">
                                <video
                                  src={message.video.videoUrl}
                                  controls
                                  className="w-full max-h-48"
                                >
                                  Seu navegador não suporta vídeos.
                                </video>
                              </div>
                            )}
                          </div>
                          <span className="text-xs text-foreground/50 mt-1">
                            {message.timestamp.toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                          <Bot className="h-5 w-5" />
                        </div>
                        <div className="bg-muted rounded-lg px-4 py-3">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Chat Input */}
                  <div className="border-t border-border p-4 bg-muted/30">
                    <div className="flex gap-3 mb-3">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Digite sua dúvida..."
                        className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!inputText.trim()}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Send className="h-5 w-5" />
                        <span className="hidden sm:inline">Enviar</span>
                      </button>
                    </div>
                    
                    {/* Video Upload Button */}
                    <div className="flex items-center gap-2">
                      <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                        id="video-upload"
                      />
                      <label
                        htmlFor="video-upload"
                        className="flex-1 px-4 py-2 bg-accent/10 text-accent border border-accent/30 rounded-lg hover:bg-accent/20 transition-colors cursor-pointer flex items-center justify-center gap-2 text-sm font-medium"
                      >
                        <Upload className="h-4 w-4" />
                        Enviar Vídeo para Avaliação
                      </label>
                    </div>
                  </div>
                </div>

                {/* Quick Tips */}
                <div className="mt-6 p-4 bg-background rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Dicas Rápidas:</h3>
                  <div className="flex flex-wrap gap-2">
                    {['escalas', 'afinação', 'respiração', 'metrônomo', 'iniciante'].map((topic) => (
                      <button
                        key={topic}
                        onClick={() => setInputText(topic)}
                        className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Video Submissions Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-background rounded-xl shadow-lg border border-border overflow-hidden sticky top-6">
                  <div className="p-4 border-b border-border bg-primary/5">
                    <h2 className="font-semibold text-foreground flex items-center gap-2">
                      <Video className="h-5 w-5 text-primary" />
                      Vídeos Enviados ({videoSubmissions.length})
                    </h2>
                  </div>

                  <div className="max-h-[600px] overflow-y-auto p-4 space-y-3">
                    {videoSubmissions.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Video className="h-12 w-12 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">Nenhum vídeo enviado ainda</p>
                      </div>
                    ) : (
                      videoSubmissions.map((submission) => (
                        <div
                          key={submission.id}
                          className="border border-border rounded-lg p-3 hover:border-primary/50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm text-foreground truncate">
                                {submission.videoName}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {submission.timestamp.toLocaleDateString('pt-BR')} às{' '}
                                {submission.timestamp.toLocaleTimeString('pt-BR', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </p>
                            </div>
                            <Badge
                              variant={submission.status === 'reviewed' ? 'default' : 'secondary'}
                              className="ml-2"
                            >
                              {submission.status === 'reviewed' ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              ) : (
                                <Clock className="h-3 w-3 mr-1" />
                              )}
                              {submission.status === 'reviewed' ? 'Revisado' : 'Pendente'}
                            </Badge>
                          </div>

                          <div className="relative rounded overflow-hidden bg-black group mb-2">
                            <video
                              src={submission.videoUrl}
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="h-8 w-8 text-white" />
                            </div>
                          </div>

                          {submission.feedback && (
                            <div className="mt-2 p-2 bg-primary/5 rounded text-xs text-foreground border-l-2 border-primary">
                              <p className="font-medium mb-1">Feedback:</p>
                              <p>{submission.feedback}</p>
                            </div>
                          )}

                          {submission.status === 'pending' && (
                            <Button
                              onClick={() => setSelectedVideo(submission)}
                              size="sm"
                              variant="outline"
                              className="w-full mt-2"
                            >
                              Adicionar Feedback
                            </Button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Modal */}
            {selectedVideo && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-border flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">
                      Adicionar Feedback
                    </h3>
                    <button
                      onClick={() => setSelectedVideo(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        Vídeo: {selectedVideo.videoName}
                      </p>
                      <video
                        src={selectedVideo.videoUrl}
                        controls
                        className="w-full rounded-lg"
                      >
                        Seu navegador não suporta vídeos.
                      </video>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Seu Feedback:
                      </label>
                      <textarea
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Descreva os pontos a melhorar, técnicas corretas, e próximos passos..."
                        rows={6}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => setSelectedVideo(null)}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleAddFeedback}
                        disabled={!feedbackText.trim()}
                        className="flex-1"
                      >
                        Enviar Feedback
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}