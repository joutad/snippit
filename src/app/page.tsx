"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";
import { DocResult } from "@/types/types";

export default function Home() {
  const isHardCoded = false; // For debugging, set to true; Saves on API credits when developing; SET TO false IN PRODUCTION
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState<DocResult[]>([]);
  const hardCodedResults = [
    {
      "id": "https://react.dev/reference/react/useState",
      "title": "useState – React",
      "url": "https://react.dev/reference/react/useState",
      "publishedDate": "2024-01-01T00:00:00.000Z",
      "author": "",
      "score": 0.2503798007965088,
      "text": "[API Reference](https://react.dev/reference/react)\n\n[Hooks](https://react.dev/reference/react/hooks)\n\n# useState\n\n`useState` is a React Hook that lets you add a [state variable](https://react.dev/learn/state-a-components-memory) to your component.\n\n`",
      "summary": "This React documentation explains `useState`, a Hook for managing component state.  It's declared at the top of a component using `const [state, setState] = useState(initialState);`.\n\n`initialState` sets the initial state value; it can be any data type.  If it's a function, React calls it once to get the initial state – useful for expensive initializations.\n\n`useState` returns an array: the current state value and a `setState` function to update it.  Calling `setState` triggers a re-render, updating the UI.  The documentation covers updating state (including objects and arrays), handling re-renders, and common troubleshooting issues like \"too many re-renders.\"  It's essentially a simple, efficient way to add dynamic behavior to your React components.\n",
      "image": "https://react.dev/images/og-reference.png",
      "favicon": "https://react.dev/favicon-32x32.png",
      "extras": {
        "links": [
          "https://react.dev/"
        ]
      }
    },
    {
      "id": "https://react.dev/learn/managing-state",
      "title": "Managing State – React",
      "url": "https://react.dev/learn/managing-state",
      "publishedDate": "1997-01-01T00:00:00.000Z",
      "author": "",
      "score": 0.23296338319778442,
      "text": "[Learn React](https://react.dev/learn)\n\n# Managing State\n\nIntermediate\n\nAs your application grows, it helps to be more intentional about how your state is organized and how the data flows between your components. Redundant or duplicate state is a com",
      "summary": "This React documentation explains how to manage application state effectively as it grows.  It emphasizes a state-driven approach to UI updates, avoiding direct UI manipulation.  Instead, the UI reflects different \"states\" (e.g., \"typing,\" \"submitting,\" \"success\").  The document uses a quiz form example to illustrate how state variables (`useState` hook) control UI elements (button enable/disable, error messages).  Key concepts covered include structuring state for maintainability, lifting state up to share it between components,  handling complex state logic with reducers, and using context for efficient data passing.  The guide also links to further resources for each of these topics.\n",
      "image": "https://react.dev/images/og-learn.png",
      "favicon": "https://react.dev/favicon-32x32.png",
      "extras": {
        "links": [
          "https://react.dev/"
        ]
      }
    }
  ];
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});
  const toggleExpand = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isHardCoded) {
      if (query.trim() === "") return;

      const res = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setResponses(data);
    }
    else {
      setResponses(hardCodedResults);
    }
    
    setQuery("");
  };

  return (
    <main className="min-h-screen p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full mt-20">
        <h1
          className="text-4xl font-bold text-center mb-6"
          style={{fontFamily: "var(--jetBrains-mono)"}}
        >
            snippit
          </h1>
        <form onSubmit={handleSubmit} className="flex gap-2 text-black">
          <input
            type="text"
            className="flex-1 p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:selection:bg-[#404040] dark:selection:text-white"
            id="inputText"
            placeholder="Ask about React, Tailwind, JS..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Ask
          </button>
        </form>

        {/* Responses */}
        {
          responses.map((item, i) => {
            const isExpanded = expandedCards[i];
            
            return (
              <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 my-5">
                
                {/* Result Title */}
                <div className="flex items-center gap-2 mb-2">
                  <img src={item.favicon} alt="favicon" className="w-5 h-5" />
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 font-semibold hover:underline text-lg"
                  >
                    {item.title}
                  </a>
                </div>

                {/* Result Summary */}
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line prose-sm dark:prose-invert max-w-none" style={{fontFamily: "var(--font-pt-serif)"}}>
                  <ReactMarkdown >
                    {item.summary + "\n---"}
                  </ReactMarkdown>
                </div>

                {/* Toggle Button */}
                <button
                  onClick={() => toggleExpand(i)}
                  className="text-sm hover:underline mb-3"
                >
                  {isExpanded ? "▲ Hide documentation preview" : "▼ Show documentation preview"}
                </button>

                {/* Search Result & Contents */}
                {isExpanded &&
                  (
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {"\n" + item.text.replace('\n', '') + "..."}
                      </ReactMarkdown>
                    </div>
                  )
                }

                {/* Link to Source */}
                <div className="mt-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    View full doc →
                  </a>
                </div>

              </div>
            );
          })
        }
      </div>
    </main>
  );
}
