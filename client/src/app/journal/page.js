"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJournals } from "@/redux/slices/journalSlice.js";
import { FaBook } from "react-icons/fa";
import Link from "next/link";

export default function JournalListPage() {
  const dispatch = useDispatch();
  const { journals, loading, error } = useSelector((state) => state.journal);

  useEffect(() => {
    dispatch(fetchJournals());
  }, [dispatch]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-8 lg:px-16 bg-background">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-foreground flex items-center gap-2"><FaBook className="h-8 w-8 text-primary"/> Your Journals</h1>

        {loading && <p className="text-muted">Loading journals...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && journals.length === 0 && (
          <p className="text-muted">No journals yet. Start writing!</p>
        )}

        <div className="grid gap-6">
          {journals.map((journal) => (
            <div key={journal._id} className="card p-4 hover:shadow-lg transition">
              <h2 className="text-xl text-primary font-semibold text-foreground mb-2">
                {new Date(journal.createdAt).toLocaleString()}
              </h2>
              <p className="text-muted line-clamp-3">{journal.content}</p>
              {journal.sentiment && (
                <div className="text-sm mt-1">
                  Sentiment: <span className="text-primary">{journal.sentiment}</span>
                </div>
              )}
              {journal.aiFeedback && (
                <div className="text-sm mt-1 text-muted">AI Feedback: {journal.aiFeedback}</div>
              )}

              <Link
                href={`/journal/${journal._id}`}
                className="btn btn-primary mt-4"
              >
                View Journal
              </Link> 
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
