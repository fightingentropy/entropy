import { promises as fs } from "fs";
import path from "path";
import TweetGrid from "./TweetGrid";

async function getTweets() {
  const filePath = path.join(process.cwd(), "src/data/tweets.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}

export default async function TweetsPage() {
  const tweets = await getTweets();

  return (
    <main>
      <TweetGrid tweets={tweets} />
    </main>
  );
} 