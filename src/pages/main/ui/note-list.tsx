"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Note from "@/shared/ui/Article";
import { getNotes, InitialNoteList } from "../model/get-notes";

interface NoteListProps {
  notes: InitialNoteList;
}

const NoteList = ({ notes }: NoteListProps) => {
  const [page, setPage] = useState(0);
  const [allNotes, setAllNotes] = useState<InitialNoteList>(notes);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);

  console.log(allNotes, "allNotes");

  // // 서버에서 새 데이터를 강제로 가져오는 함수
  // useEffect(() => {
  //   setAllNotes((prev) => [...notes, ...prev]);
  // }, [notes]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newProducts = await getNotes(page + 1);
          if (newProducts.length !== 0) {
            setAllNotes((prev) => [...prev, ...newProducts]);
            setPage((prev) => prev + 1);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      {
        threshold: 0.5,
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="flex flex-col pb-16">
      {allNotes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
      {!isLastPage ? (
        <span
          ref={trigger}
          className="text-center flex items-center justify-center h-20 text-neutral-400"
        >
          {isLoading ? "로딩 중..." : "더보기"}
        </span>
      ) : null}
    </div>
  );
};

export default NoteList;
