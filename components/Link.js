import Link from "next/link";
import { BiUpvote } from "react-icons/bi";

export default function LinkPost({ link, setModalContent }) {
  const { description, url, votes } = link;
  return (
    <div className="link-wrapper" onClick={() => setModalContent(link)}>
      <Link href={url}>
        <a target="_blank" className="description">
          {description}
        </a>
      </Link>
      <div className="upvote-section">
        <button>
          <BiUpvote />
        </button>
        <div className="votes">
          {votes.length > 0 ? (
            votes.length > 3 ? (
              <p>
                {votes
                  .map((vote) => vote.user.name[0])
                  .slice(0, 3)
                  .join(", ")}
                {votes.length > 3 ? `and ${votes.length - 3} others` : ""}
              </p>
            ) : (
              votes.map((vote) => vote.user.name).join(", ")
            )
          ) : (
            "No votes"
          )}
        </div>
      </div>
    </div>
  );
}
