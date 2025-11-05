"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import axios from "axios";

// Dynamic import to prevent SSR issues with MDEditor
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function NewJournalPage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!content.trim()) {
      alert("Please write something first!");
      return;
    }

    try {
      setLoading(true);

      // Get token from cookie
      const token = document.cookie
        ?.split("; ")
        ?.find((c) => c.startsWith("token="))
        ?.split("=")[1];

      // Send API request
      const res = await axios.post(
        "http://localhost:5000/api/journal/",
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        console.log("Journal created successfully!");
        setContent("");
      } else {
        console.log((res.data.error || "Something went wrong"));
      }
    } catch (error) {
      console.error(error);
      console.log(error.response?.data?.error || "Network or server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            ✍️ New Journal Entry
          </h1>
          <p className="text-muted">
            Reflect on your thoughts — AI will analyse your mood and patterns.
          </p>
        </div>

        {/* Markdown Editor */}
        <div data-color-mode="light">
          <MDEditor value={content} onChange={setContent} height={400} />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              if (confirm("Discard current entry?")) setContent("");
            }}
            className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
            disabled={loading}
          >
            Discard
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-5 py-2 rounded-md bg-primary text-white hover:bg-primary/80 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Journal"}
          </button>
        </div>
      </div>
    </div>
  );
}
