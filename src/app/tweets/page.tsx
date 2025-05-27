import TweetGrid from "./TweetGrid";
import { tweets } from "@/data/tweets";

async function getTweets() {
  return tweets;
}

export default async function TweetsPage() {
  const tweets = await getTweets();

  return (
    <main>
      <TweetGrid tweets={tweets} />
    </main>
  );
} 