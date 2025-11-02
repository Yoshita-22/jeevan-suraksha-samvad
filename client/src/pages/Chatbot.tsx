import React, { useState, useRef, useEffect } from "react";
import { Mic, Send, Volume2, Loader2, Globe } from "lucide-react";
// @ts-ignore
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

interface Message {
  text: string;
  sender: "user" | "ai";
}

const ChatbotUI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedLang, setSelectedLang] = useState<string>("hi-IN"); // default Hindi
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 🔹 Step 1: Helper function to clean Markdown
  const stripMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1") // remove bold (**text**)
      .replace(/\*(.*?)\*/g, "$1") // remove italics (*text*)
      .replace(/[_#>-]/g, "") // remove underscores, hashes, etc.
      .replace(/\n+/g, " ") // remove excessive newlines
      .trim();
  };

  // Handle sending text to backend
  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    resetTranscript();
    setLoading(true);

    try {
      const res = await fetch("https://jeevan-suraksha-samvad-backend.onrender.com/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text, lang: selectedLang }),
      });

      const data = await res.json();

      const cleanReply = stripMarkdown(data.reply || "Sorry, I didn’t understand that.");

      const aiMessage: Message = {
        text: cleanReply,
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiMessage]);
      speakText(aiMessage.text);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          text: "⚠️ Connection error. Please try again.",
          sender: "ai",
        },
      ]);
    }
    setLoading(false);
  };

  // 🔹 Step 2: Dynamic Text-to-Speech with clean text
  const speakText = (text: string) => {
    const cleanText = stripMarkdown(text); // clean before speaking

    // Stop any previous speech
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);

    const langMap: Record<string, string> = {
      "hi-IN": "hi-IN",
      "te-IN": "te-IN",
      "mr-IN": "mr-IN",
      "kn-IN": "kn-IN",
      "en-IN": "en-IN",
    };

    utterance.lang = langMap[selectedLang] || "en-IN";
    utterance.rate = 1;
    utterance.pitch = 1;

    const voices = speechSynthesis.getVoices();
    const matchingVoice = voices.find((v) => v.lang === utterance.lang);
    if (matchingVoice) utterance.voice = matchingVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  const handleMute = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Mic Handling
  const handleMic = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setInput(transcript);
      resetTranscript();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({
        continuous: true,
        language: selectedLang,
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#f8f7f4] to-[#eae6df] font-sans">
      {/* Header */}
      <div className="p-4 bg-[#00796B] text-white text-center font-semibold text-lg shadow-md">
        Jeevan Suraksha AI Assistant
        <p className="text-sm font-normal">
          Your health companion in your own language
        </p>
      </div>

      {/* Language Selector */}
      <div className="flex items-center justify-center bg-white border-b p-2 gap-2 shadow-sm">
        <Globe className="text-teal-700" size={18} />
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="hi-IN">Hindi</option>
          <option value="te-IN">Telugu</option>
          <option value="mr-IN">Marathi</option>
          <option value="kn-IN">Kannada</option>
          <option value="en-IN">English</option>
        </select>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-2xl shadow-md max-w-[75%] text-sm ${
                msg.sender === "user"
                  ? "bg-pink-200 text-gray-800 rounded-br-none"
                  : "bg-teal-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {stripMarkdown(msg.text)}

              {msg.sender === "ai" && (
                <div className="inline-flex ml-2 gap-2 items-center">
                  {/* Speak Button */}
                  <button
                    className="text-teal-700 hover:text-teal-900"
                    onClick={() => speakText(msg.text)}
                  >
                    <Volume2 size={16} />
                  </button>

                  {/* Mic Toggle Button */}
                  <button
                    onClick={isSpeaking ? handleMute : () => speakText(msg.text)}
                    className={
                      isSpeaking
                        ? "text-red-600 hover:text-red-800"
                        : "text-gray-600 hover:text-gray-800"
                    }
                    title={isSpeaking ? "Mute Mic" : "Unmute Mic"}
                  >
                    {isSpeaking ? "🎤" : "🔇"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-teal-100 text-gray-700 p-3 rounded-2xl shadow-md max-w-[60%] rounded-bl-none flex items-center gap-2">
              <Loader2 className="animate-spin" size={18} />
              <span>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-white border-t flex items-center gap-2">
        <button
          onClick={handleMic}
          className={`p-3 rounded-full ${
            listening ? "bg-red-500" : "bg-teal-600"
          } text-white shadow-md`}
        >
          <Mic size={20} />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask in your language..."
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none"
        />

        <button
          onClick={() => handleSend(input || transcript)}
          className="p-3 bg-teal-600 text-white rounded-full shadow-md hover:bg-teal-700"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatbotUI;
