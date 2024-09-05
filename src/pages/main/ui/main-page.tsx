import { ONE_MINUTE, TEN_SECONDS, THIRTY_SECONDS } from "@/shared/config/time";
import Title from "@/shared/ui/Title";
import { unstable_cache } from "next/cache";
import NoteList from "./note-list";
import { getNotes } from "../model/get-notes";

const titleData = {
  title: `Notes`,
  subtitle: "Feeds",
  description: `Shake your thoughts, feelings, and moments`,
};

const MainPage = async () => {
  const allNotes = await unstable_cache(getNotes, [], {
    tags: ["notes"],
    revalidate: TEN_SECONDS,
  })();

  return <NoteList notes={allNotes} />;
};

export default MainPage;
