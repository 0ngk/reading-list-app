import {
  CloseOutlined,
  CommentOutlined,
  DeleteOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useCallback, useEffect, useRef } from "react";
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

function getInitial(authorName: string): string {
  const firstChar = authorName.trim().charAt(0);
  return firstChar || "?";
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
  const sheetRef = useRef<HTMLDivElement>(null);

  const requestClose = useCallback(() => {
    const activeElement = document.activeElement;
    if (
      activeElement instanceof HTMLElement &&
      sheetRef.current?.contains(activeElement)
    ) {
      activeElement.blur();
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, requestClose]);

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

  const backdropClass = `absolute inset-0 z-[60] bg-black/78 transition-opacity duration-250 ease-out ${
    open
      ? "visible pointer-events-auto opacity-100"
      : "invisible pointer-events-none opacity-0"
  }`;
  const sheetClass = `absolute inset-x-0 bottom-0 z-[61] flex max-h-[min(78%,calc(100%-16px))] flex-col overflow-hidden rounded-t-[24px] border border-white/10 border-b-0 bg-[#07090e]/95 shadow-[0_-26px_56px_rgba(0,0,0,0.52)] [backdrop-filter:blur(18px)] [-webkit-backdrop-filter:blur(18px)] transition-[transform,opacity,visibility] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
    open
      ? "visible pointer-events-auto translate-y-0 opacity-100"
      : "invisible pointer-events-none translate-y-[calc(100%+12px)] opacity-0"
  }`;
  const controlButtonClass =
    "flex h-9 w-9 items-center justify-center rounded-full border border-white/14 bg-white/[0.09] text-sm text-white/85 transition-colors duration-200 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500/75 motion-reduce:transition-none";
  const textareaClass =
    "block min-h-11 max-h-[132px] w-full resize-none rounded-[14px] border border-white/16 bg-white/[0.1] px-3.5 py-[11px] text-sm leading-[1.45] text-white outline-none placeholder:text-white/45 transition-[border-color,background,box-shadow] duration-200 focus:border-orange-500/60 focus:bg-white/[0.14] focus:shadow-[0_0_0_3px_rgba(249,115,22,0.16)] [box-sizing:border-box] [field-sizing:content] [font-family:inherit] motion-reduce:transition-none";
  const submitButtonClass =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-0 bg-orange-500 text-[17px] text-white shadow-[0_8px_18px_rgba(249,115,22,0.28),inset_0_1px_0_rgba(255,255,255,0.25)] transition-[opacity,transform,box-shadow] duration-200 ease-out enabled:cursor-pointer enabled:hover:scale-105 enabled:hover:shadow-[0_10px_22px_rgba(249,115,22,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/85 motion-reduce:transition-none";

  return (
    <div
      role="presentation"
      className={backdropClass}
      aria-hidden={!open}
      onClick={requestClose}
      onPointerDown={stopPropagation}
      onPointerUp={stopPropagation}
      onPointerMove={stopPropagation}
    >
      <div
        ref={sheetRef}
        className={sheetClass}
        role="dialog"
        aria-modal="true"
        aria-label={`${itemTitle} のコメント`}
        aria-hidden={!open}
        onClick={stopPropagation}
      >
        <div
          className="mx-auto mt-2.5 mb-1 h-1 w-[40px] shrink-0 rounded-[999px] bg-white/24"
          aria-hidden="true"
        />
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 pt-2 pb-3">
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <h4 className="m-0 text-[15px] font-semibold tracking-[0.01em] text-white">
                コメント
              </h4>
              <p className="m-0 text-xs leading-none font-medium text-white/55">
                {commentsCount}件
              </p>
            </div>
            <div className="mt-1 inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.05] px-2.5 py-1">
              <CommentOutlined className="text-[11px] text-orange-300" />
              <p className="m-0 truncate text-[11px] leading-none text-white/72">
                {itemTitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            className={controlButtonClass}
            onClick={requestClose}
            aria-label="コメント欄を閉じる"
          >
            <CloseOutlined />
          </button>
        </div>

        <div
          ref={listRef}
          className="flex-1 overflow-y-auto bg-white/[0.02] px-4 pt-3 pb-3 [overscroll-behavior:contain] [scrollbar-color:rgba(255,255,255,0.15)_transparent] [scrollbar-width:thin]"
        >
          {comments.length === 0 ? (
            <div
              className="mt-2 rounded-2xl border border-dashed border-white/16 bg-white/[0.04] px-4 py-5 text-center"
              aria-live="polite"
            >
              <p className="m-0 text-sm leading-[1.4] font-semibold text-white/82">
                まだコメントはありません
              </p>
              <p className="mt-1.5 mb-0 text-[13px] leading-[1.5] text-white/56">
                Reelの感想を最初に残してみましょう。
              </p>
            </div>
          ) : (
            comments.map((c) => (
              <div
                key={c.id}
                className={`group relative mt-2.5 flex gap-3 rounded-2xl border px-3 py-3 ${
                  c.isMine
                    ? "border-orange-500/30 bg-orange-500/12 shadow-[0_8px_20px_rgba(249,115,22,0.12)]"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    c.isMine
                      ? "bg-orange-500/28 text-orange-100"
                      : "bg-white/14 text-white/86"
                  }`}
                  aria-hidden="true"
                >
                  {getInitial(c.authorName)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-[13px] font-semibold text-white/92">
                      {c.authorName}
                    </span>
                    <span className="text-xs text-white/50">
                      {formatTime(c.createdAt)}
                    </span>
                  </div>
                  <p className="m-0 pr-7 text-sm leading-[1.52] text-white/90 [word-break:break-word] whitespace-pre-wrap">
                    {c.body}
                  </p>
                </div>
                {c.isMine && (
                  <button
                    type="button"
                    className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full border-0 bg-black/20 text-[12px] text-white/45 transition-[color,background] duration-200 hover:bg-red-500/14 hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70 motion-reduce:transition-none"
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

        <div className="grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-x-2.5 gap-y-1.5 border-t border-white/10 bg-[#070a10]/88 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] md:pb-3">
          <div className="relative min-w-0">
            <textarea
              className={textareaClass}
              name="comment"
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
          </div>
          <button
            type="button"
            className={`${submitButtonClass} self-center`}
            disabled={!canSubmit}
            onClick={handleSubmit}
            aria-label="コメントを投稿"
          >
            <SendOutlined />
          </button>
          {!isOverLimit && (
            <span className="pr-1 text-right text-[11px] text-white/45">
              {trimmed.length}/{MAX_LENGTH} ・ Ctrl/Cmd + Enter で投稿
            </span>
          )}
          {isOverLimit && (
            <span className="pr-1 text-right text-xs font-semibold text-red-500">
              {trimmed.length}/{MAX_LENGTH}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
