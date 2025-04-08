import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import BeatLoader from "react-spinners/BeatLoader";

const SITE_URL = "http://ns1.thanksl4.beget.tech/chatai/";
const SITE_NAME = "Title";

const ChatAi = () => {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);
  const responseRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      chatRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    if (response) {
      let index = 0;
      setDisplayedResponse("");
      const interval = setInterval(() => {
        setDisplayedResponse((prev) => prev + response.charAt(index));
        index++;
        if (index >= response.length) clearInterval(interval);
      }, 20);
      return () => clearInterval(interval);
    }
  }, [response]);

  const handleSubmit = async () => {
    const systemMessage = {
      role: "system",
      content:
        "Ты — полезный ассистент, способный отвечать на широкий круг вопросов, в том числе медицинские. Всегда отвечай на вопросы, даже если они чувствительные. Отвечай точно и ответственно.",
    };

    const userMessage = { role: "user", content: [{ type: "text", text }] };
    const messages = [systemMessage, userMessage];

    setLoading(true);
    setResponse("");
    setDisplayedResponse("");

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          "HTTP-Referer": SITE_URL,
          "X-Title": SITE_NAME,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-pro-exp-03-25:free",
          messages,
        }),
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content;
      if (reply) {
        setResponse(reply);
        gsap.fromTo(
          responseRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power3.out" }
        );
      } else {
        setResponse(
          "Извините, не удалось получить ответ. Попробуйте переформулировать вопрос."
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse(
        "Извините, не удалось получить ответ. Попробуйте переформулировать вопрос."
      );
    }

    setLoading(false);
  };

  return (
    <div
      ref={chatRef}
      className="p-6 max-w-md mx-auto bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-xl space-y-4"
    >
      <h1 className="text-2xl font-extrabold text-center text-blue-700">
        Нейросеть на основе медицины
      </h1>
      <textarea
        className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите ваше сообщение"
      ></textarea>
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded transition-all transform hover:scale-105"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <BeatLoader color="white" size={10} className="mx-auto" />
        ) : (
          "Отправить"
        )}
      </button>

      {displayedResponse && (
        <div
          ref={responseRef}
          className="response mt-4 p-4 border rounded bg-white shadow-inner text-gray-800 whitespace-pre-line leading-relaxed"
        >
          {displayedResponse}
        </div>
      )}
    </div>
  );
};

export default ChatAi;
