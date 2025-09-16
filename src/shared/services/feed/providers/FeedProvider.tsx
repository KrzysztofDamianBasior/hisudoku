import { FeedContext } from "../lib/FeedContext";
import { useFeed } from "../lib/useFeed";

export default function FeedProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const feed = useFeed();

    return <FeedContext.Provider value={feed}>{children}</FeedContext.Provider>;
}
