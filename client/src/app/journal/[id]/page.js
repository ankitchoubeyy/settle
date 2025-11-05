"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchJournal, clearCurrentJournal } from "@/redux/slices/journalSlice.js";

// Simple Markdown parser
function parseMarkdown(text) {
  if (!text) return "";
  return text
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br />");
}

const JournalDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const { currentJournal, loading, error } = useSelector((state) => state.journal);

  // Debug: Check if id is correct
  console.log("Journal ID from params:", id);

  useEffect(() => {
    if (!id) return;

    dispatch(fetchJournal(id));
    return () => dispatch(clearCurrentJournal());
  }, [dispatch, id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted animate-pulse">Loading journal...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 text-center">{error}</p>
        <p className="text-sm text-muted">
          Check if your token is set and backend is running
        </p>
        <button className="btn-secondary" onClick={() => router.back()}>
          ← Back
        </button>
      </div>
    );
  }

  // No journal found
  if (!currentJournal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted text-center">Journal not found or has been deleted.</p>
        <button className="btn-secondary" onClick={() => router.back()}>
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-8 lg:px-16 bg-background">
      <div className="max-w-4xl mx-auto card p-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {currentJournal.title || "Untitled"}
        </h1>

        {/* Created Date */}
        <div className="text-sm text-muted mb-4">
          {new Date(currentJournal.createdAt).toLocaleString()}
        </div>

        {/* Content */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(currentJournal.content) }}
        />

        {/* Sentiment */}
        {currentJournal.sentiment && (
          <p className="mt-4 text-primary">
            Sentiment: {currentJournal.sentiment}
          </p>
        )}

        {/* AI Feedback */}
        {currentJournal.aiFeedback && (
          <p className="mt-2 text-muted">AI Feedback: {currentJournal.aiFeedback}</p>
        )}

        {/* Back Button */}
        <button
          className="mt-6 btn-secondary"
          onClick={() => router.back()}
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default JournalDetailPage;
