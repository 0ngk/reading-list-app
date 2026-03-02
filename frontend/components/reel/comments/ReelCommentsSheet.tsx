import { CloseOutlined, DeleteOutlined, SendOutlined } from "@ant-design/icons";
import { useEffect, useRef } from "react";
import type { ReelComment } from "./types";

const MAX_LENGTH = 280;

type ReelCommentsSheetProps = {
  open: boolean;
  itemTitle: string;
  comments: ReelComment[];
  draft: string;
  onDraftChange: (value: string) => void;
  onSubmit: () => void;
  onDelete: (commentId: string) => void;
  onClose: () => void;
};

function formatTime(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60_000) return "たった今";
  const d = new Date(ts);
  const now = new Date();
  if (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  ) {
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function ReelCommentsSheet({
  open,
  itemTitle,
  comments,
  draft,
  onDraftChange,
  onSubmit,
  onDelete,
  onClose,
}: ReelCommentsSheetProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const commentsCount = comments.length;
  useEffect(() => {
    if (!open || commentsCount === 0) return;
    const frameId = window.requestAnimationFrame(() => {
      const listEl = listRef.current;
      if (!listEl) return;
      listEl.scrollTo({
        top: listEl.scrollHeight,
        behavior: "smooth",
      });
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [commentsCount, open]);

  const trimmed = draft.trim();
  const isOverLimit = trimmed.length > MAX_LENGTH;
  const canSubmit = trimmed.length > 0 && !isOverLimit;

  const handleSubmit = () => {
    if (canSubmit) onSubmit();
  };

  const stopPropagation = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      role="presentation"
      className={`reel-comments-backdrop ${open ? "is-open" : ""}`}
      aria-hidden={!open}
      onClick={onClose}
      onPointerDown={stopPropagation}
      onPointerUp={stopPropagation}
      onPointerMove={stopPropagation}
    >
      <div
        className={`reel-comments-sheet ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={`${itemTitle} のコメント`}
        aria-hidden={!open}
        onClick={stopPropagation}
      >
        <div className="reel-comments-handle" aria-hidden="true" />
        <div className="reel-comments-header">
          <div className="reel-comments-title-wrap">
            <h4 className="reel-comments-heading">コメント</h4>
            <p className="reel-comments-count">{commentsCount}件</p>
          </div>
          <button
            type="button"
            className="reel-comments-close"
            onClick={onClose}
            aria-label="コメント欄を閉じる"
          >
            <CloseOutlined />
          </button>
        </div>

        <div ref={listRef} className="reel-comments-list">
          {comments.length === 0 ? (
            <div className="reel-comments-empty" aria-live="polite">
              <p className="reel-comments-empty-title">
                まだコメントはありません
              </p>
              <p className="reel-comments-empty-body">
                最初のひとことを書いてみましょう。
              </p>
            </div>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="reel-comment-item">
                <div className="reel-comment-meta">
                  <span className="reel-comment-author">{c.authorName}</span>
                  <span className="reel-comment-time">
                    {formatTime(c.createdAt)}
                  </span>
                </div>
                <p className="reel-comment-body">{c.body}</p>
                {c.isMine && (
                  <button
                    type="button"
                    className="reel-comment-delete"
                    onClick={() => onDelete(c.id)}
                    aria-label="コメントを削除"
                  >
                    <DeleteOutlined />
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        <div className="reel-comments-form">
          <div className="reel-comments-input-wrap">
            <textarea
              className="reel-comments-textarea"
              placeholder="コメントを入力..."
              value={draft}
              onChange={(e) => onDraftChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              rows={1}
            />
            {isOverLimit && (
              <span className="reel-comments-over-limit">
                {trimmed.length}/{MAX_LENGTH}
              </span>
            )}
          </div>
          <button
            type="button"
            className="reel-comments-submit"
            disabled={!canSubmit}
            onClick={handleSubmit}
            aria-label="コメントを投稿"
          >
            <SendOutlined />
          </button>
        </div>
      </div>
    </div>
  );
}
