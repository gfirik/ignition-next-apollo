import React from "react";
import Link from "next/link";
export default function Modal({ modalContent, handleClick }) {
  const { description, url, votes, postedBy } = modalContent;

  return (
    <div className="dialog">
      <div className="content">
        <p>
          <strong>{description}</strong>
        </p>
        <span>Posted by {postedBy.name}</span>
        <div>
          URL address: <br />
          <Link href={url}>{url}</Link>
        </div>
        <button onClick={handleClick} className="close">
          Close
        </button>
      </div>
      <div>
        <b>Voted by:</b>
        {votes.map((vote) => (
          <p key={vote.user.id}>{vote.user.name}</p>
        ))}
      </div>
    </div>
  );
}
