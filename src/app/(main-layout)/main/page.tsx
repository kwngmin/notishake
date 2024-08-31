import db from "@/shared/config/database";
import Article from "@/shared/ui/Article";
import Title from "@/shared/ui/Title";

const titleData = {
  title: `Notes`,
  subtitle: "Feeds",
  description: `Record of thought, moments, feelings that I don't want to forget.`,
};

const MainPage = async () => {
  const allPosts = await db.post.findMany();
  console.log(allPosts);
  return (
    <div>
      {/* <Title titleData={titleData} /> */}
      {allPosts.map((post) => (
        // <div key={post.id}>{post.title}</div>
        <Article key={post.id} note={post} />
      ))}
    </div>
  );
};

export default MainPage;
