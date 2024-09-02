import db from "@/shared/config/database";
import { ONE_MINUTE } from "@/shared/config/time";
import Article from "@/shared/ui/Article";
import Title from "@/shared/ui/Title";
import { unstable_cache } from "next/cache";

const titleData = {
  title: `Notes`,
  subtitle: "Feeds",
  // description: `Record of thought, moments, feelings that I don't want to forget.`,
  // description: `Record of thought, moments, feelings...`,
  description: `Shake your thoughts, feelings, and moments`,
};

const getPosts = async () => {
  const allPosts = await db.post.findMany({
    // skip: page * 1,
    orderBy: {
      createdAt: "desc", // 최신순 정렬
    },
  });
  return allPosts;
};

const MainPage = async () => {
  const allPosts = await unstable_cache(getPosts, [], {
    tags: ["posts"],
    revalidate: ONE_MINUTE,
  })();

  return (
    <div className="flex flex-col ">
      {/* <Title titleData={titleData} /> */}
      {allPosts.map((post) => (
        // <div key={post.id}>{post.title}</div>
        <Article key={post.id} note={post} />
      ))}
    </div>
  );
};

export default MainPage;
