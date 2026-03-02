import { CloseOutlined, DeleteOutlined, SendOutlined } from "@ant-design/icons";
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

  const backdropClass = `absolute inset-0 z-[60] bg-black/50 transition-opacity duration-250 ease-out ${
    open
      ? "visible pointer-events-auto opacity-100"
      : "invisible pointer-events-none opacity-0"
  }`;
  const sheetClass = `absolute inset-x-0 bottom-0 z-[61] flex max-h-[min(72%,calc(100%-16px))] flex-col overflow-hidden rounded-t-[20px] border-t border-white/8 bg-[linear-gradient(180deg,rgba(22,22,28,0.97)_0%,rgba(14,14,18,0.97)_100%)] shadow-[0_-18px_48px_rgba(0,0,0,0.45)] [backdrop-filter:blur(20px)] [-webkit-backdrop-filter:blur(20px)] transition-[transform,opacity,visibility] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
    open
      ? "visible pointer-events-auto translate-y-0 opacity-100"
      : "invisible pointer-events-none translate-y-[calc(100%+12px)] opacity-0"
  }`;
  const controlButtonClass =
    "flex h-9 w-9 items-center justify-center rounded-full border-0 bg-white/8 text-sm text-white/80 transition-colors duration-200 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500/75 motion-reduce:transition-none";
  const textareaClass =
    "min-h-11 max-h-[132px] w-full resize-none rounded-[14px] border border-white/14 bg-white/9 px-3.5 py-[11px] text-sm leading-[1.45] text-white outline-none placeholder:text-white/42 transition-[border-color,background,box-shadow] duration-200 focus:border-orange-500/60 focus:bg-white/12 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.14)] [box-sizing:border-box] [field-sizing:content] [font-family:inherit] motion-reduce:transition-none";
  const submitButtonClass =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-0 bg-[linear-gradient(180deg,#fb923c_0%,#f97316_100%)] text-[17px] text-white shadow-[0_8px_18px_rgba(249,115,22,0.25),inset_0_1px_0_rgba(255,255,255,0.25)] transition-[opacity,transform,box-shadow] duration-200 ease-out enabled:cursor-pointer enabled:hover:scale-105 enabled:hover:shadow-[0_10px_22px_rgba(249,115,22,0.32),inset_0_1px_0_rgba(255,255,255,0.25)] enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/85 motion-reduce:transition-none";

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
          className="mx-auto mt-2.5 mb-0.5 h-1 w-[38px] shrink-0 rounded-[999px] bg-white/18"
          aria-hidden="true"
        />
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/8 px-4 pt-2.5 pb-3">
          <div className="flex min-w-0 items-baseline gap-2">
            <h4 className="m-0 text-base font-semibold text-white">コメント</h4>
            <p className="m-0 text-xs leading-none font-medium text-white/50">
              {commentsCount}件
            </p>
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
          className="flex-1 overflow-y-auto px-4 pt-3.5 pb-3 [overscroll-behavior:contain] [scrollbar-color:rgba(255,255,255,0.15)_transparent] [scrollbar-width:thin]"
        >
          {comments.length === 0 ? (
            <div
              className="mt-1 rounded-[14px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.015)_100%)] px-4 py-4 text-center"
              aria-live="polite"
            >
              <p className="m-0 text-sm leading-[1.4] font-semibold text-white/80">
                まだコメントはありません
              </p>
              <p className="mt-1.5 mb-0 text-[13px] leading-[1.5] text-white/50">
                最初のひとことを書いてみましょう。
              </p>
            </div>
          ) : (
            comments.map((c, index) => (
              <div
                key={c.id}
                className={`relative py-3 pr-10 ${
                  index > 0 ? "mt-1 border-t border-white/6" : ""
                }`}
              >
                <div className="mb-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                  <span className="text-[13px] font-semibold text-white/90">
                    {c.authorName}
                  </span>
                  <span className="text-xs text-white/45">
                    {formatTime(c.createdAt)}
                  </span>
                </div>
                <p className="m-0 text-sm leading-[1.55] text-white/90 [word-break:break-word] whitespace-pre-wrap">
                  {c.body}
                </p>
                {c.isMine && (
                  <button
                    type="button"
                    className="absolute top-2 -right-0.5 flex h-8 w-8 items-center justify-center rounded-full border-0 bg-white/2 text-[13px] text-white/42 transition-[color,background] duration-200 hover:bg-red-500/10 hover:text-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70 motion-reduce:transition-none"
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

        <div className="flex shrink-0 items-end gap-2.5 border-t border-white/8 bg-black/55 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] md:pb-3">
          <div className="relative flex-1">
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
            {isOverLimit && (
              <span className="mt-1.5 block pr-1 text-right text-xs font-semibold text-red-500">
                {trimmed.length}/{MAX_LENGTH}
              </span>
            )}
          </div>
          <button
            type="button"
            className={submitButtonClass}
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
