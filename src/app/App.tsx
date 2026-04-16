import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ToolsPage } from './pages/ToolsPage';
import { VideosPage } from './pages/VideosPage';
import { ChatPage } from './pages/ChatPage';
import { TheoryPage } from './pages/TheoryPage';
import { ScalesPage } from './pages/tools/ScalesPage';
import { MetronomePage } from './pages/tools/MetronomePage';
import { PlaybacksPage } from './pages/tools/PlaybacksPage';
import { ScoresPage } from './pages/tools/ScoresPage';
import { TunerPage } from './pages/tools/TunerPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ferramentas" element={<ToolsPage />} />
        <Route path="/ferramentas/escalas" element={<ScalesPage />} />
        <Route path="/ferramentas/metronomo" element={<MetronomePage />} />
        <Route path="/ferramentas/playbacks" element={<PlaybacksPage />} />
        <Route path="/ferramentas/partituras" element={<ScoresPage />} />
        <Route path="/ferramentas/afinador" element={<TunerPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/teoria" element={<TheoryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<SignupPage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/contato" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}