import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState, useMemo, useCallback, type CSSProperties } from "react";
import { twMerge } from "tailwind-merge";
import toFaPercent from "../../utils/to-fa-number";
import type { FloatingVote, VoteType } from "./type";

const VOTE_STEP = 10;

const VoteBar = () => {
  const [upPercent, setUpPercent] = useState(50);
  const [vote, setVote] = useState<VoteType | null>(null);
  const [floatingVotes, setFloatingVotes] = useState<FloatingVote[]>([]);

  const isVoted = vote !== null;
  const downPercent = 100 - upPercent;

  const spawnFloatingVotes = useCallback(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (count >= 5) {
        clearInterval(interval);
        return;
      }

      const like: FloatingVote = {
        id: crypto.randomUUID(),
        x: `${Math.random() * 100 - 50}px`,
        y: `${-(Math.random() * 60 + 50)}px`,
        rotateFrom: `${Math.random() * 90 - 45}deg`,
        rotateTo: `${Math.random() * 90 - 45}deg`,
      };

      setFloatingVotes((prev) => [...prev, like]);
      count++;
    }, 200);

    setTimeout(() => setFloatingVotes([]), 2500);
  }, []);

  const handleUpVote = useCallback(() => {
    if (isVoted) return;
    setUpPercent((p) => Math.min(p + VOTE_STEP, 100));
    setVote("UP");
    spawnFloatingVotes();
  }, [isVoted, spawnFloatingVotes]);

  const handleDownVote = useCallback(() => {
    if (isVoted) return;
    setUpPercent((p) => Math.max(p - VOTE_STEP, 0));
    setVote("DOWN");
    spawnFloatingVotes();
  }, [isVoted, spawnFloatingVotes]);

  const upVoteClasses = useMemo(
    () => ({
      base: isVoted
        ? "bg-emerald-100 text-emerald-500"
        : "bg-emerald-500 text-white",
      borderMain:
        vote === "UP"
          ? "border-t-2 border-r-2 border-b-2 border-emerald-500/30"
          : "",
      borderCap: vote === "UP" ? "border-b-2 border-emerald-500/30" : "",
    }),
    [vote, isVoted]
  );

  const downVoteClasses = useMemo(
    () => ({
      base: isVoted ? "bg-red-100 text-red-500" : "bg-red-500 text-white",
      borderMain:
        vote === "DOWN"
          ? "border-t-2 border-l-2 border-b-2 border-red-500/30"
          : "",
      borderCap: vote === "DOWN" ? "border-b-2 border-red-500/30" : "",
    }),
    [vote, isVoted]
  );

  const renderFloatingVotes = (type: VoteType) =>
    floatingVotes.map((like) => (
      <span
        key={like.id}
        className={twMerge([
          "absolute animate-float-like pointer-events-none -top-2",
          type === "UP" ? "right-2" : "left-2",
        ])}
        style={
          {
            "--x": like.x,
            "--y": like.y,
            "--rotate-from": like.rotateFrom,
            "--rotate-to": like.rotateTo,
          } as CSSProperties
        }
      >
        {type === "UP" ? (
          <ThumbsUp size={12} className="text-emerald-500" />
        ) : (
          <ThumbsDown size={12} className="text-red-500" />
        )}
      </span>
    ));

  return (
    <div className="relative flex w-[250px]">
      <div
        style={{ width: `${upPercent}%` }}
        onClick={handleUpVote}
        className="relative flex h-12 cursor-pointer transition-all duration-500 -translate-x-2.5"
      >
        <div
          className={twMerge(
            "absolute right-[0.3px] flex h-full w-[calc(100%-16px)] items-center justify-center gap-1 rounded-r-full",
            upVoteClasses.base,
            upVoteClasses.borderMain
          )}
        >
          {!isVoted && <ThumbsUp size={16} />}
          <span>{isVoted ? `${toFaPercent(upPercent)}` : "صعودی"}</span>
        </div>

        {vote === "UP" && renderFloatingVotes("UP")}

        <div
          className={twMerge(
            "absolute left-[0.2px] h-full w-4 rotate-180 [clip-path:polygon(0_0,0_100%,100%_100%)]",
            upVoteClasses.base,
            upVoteClasses.borderCap
          )}
        />
        {vote === "UP" && (
          <div className="absolute left-2 h-full w-[2px] rotate-[-18deg] bg-emerald-500/30" />
        )}
      </div>

      <div
        style={{ width: `${downPercent}%` }}
        onClick={handleDownVote}
        className="relative flex h-12 cursor-pointer transition-all duration-500"
      >
        <div
          className={twMerge(
            "absolute left-0 flex h-full w-[calc(100%-16px)] items-center justify-center gap-1 rounded-l-full",
            downVoteClasses.base,
            downVoteClasses.borderMain
          )}
        >
          {!isVoted && <ThumbsDown size={16} />}
          <span>{isVoted ? `${toFaPercent(downPercent)}` : "نزولی"}</span>
        </div>

        {vote === "DOWN" && renderFloatingVotes("DOWN")}

        <div
          className={twMerge(
            "absolute right-[0.2px] h-full w-4 [clip-path:polygon(0_0,0_100%,100%_100%)]",
            downVoteClasses.base,
            downVoteClasses.borderCap
          )}
        />
        {vote === "DOWN" && (
          <div className="absolute right-2 h-full w-[2px] rotate-[-18deg] bg-red-500/30" />
        )}
      </div>
    </div>
  );
};

export default VoteBar;
