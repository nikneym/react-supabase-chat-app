import { FormEvent, ReactElement, useCallback, useRef } from "react";
import { ReactComponent as Send } from "../assets/send.svg";

interface Props {
  disabled?: boolean;
  onSubmit: (message: string) => void;
}

function Editor({ onSubmit, disabled = false }: Props): ReactElement<Props> {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitCb = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = formRef.current;
      if (!form) return;

      const text = formRef.current["text"] as HTMLInputElement;
      const str = text.value.trim();
      text.value = "";

      if (str !== "") {
        onSubmit(str);
      }

      inputRef.current?.focus();
    },
    [onSubmit]
  );

  return (
    <form
      ref={formRef}
      onSubmit={submitCb}
      onInvalid={(e) => e.preventDefault()}
    >
      <div className="flex items-center justify-center bg-slate-50 py-4 px-5 gap-x-3">
        <input
          className="w-full bg-slate-200 text-slate-900 text-md font-base shadow-inner outline-none px-3 py-2 rounded-lg placeholder-slate-400"
          type="text"
          name="text"
          autoComplete="off"
          placeholder="Your message..."
          ref={inputRef}
          required
          autoFocus
          disabled={disabled}
        />
        <button className="group" name="submit" disabled={disabled}>
          <Send className="w-6 text-slate-900 transition-all duration-100 transform-gpu rotate-0 group-hover:rotate-45" />
        </button>
      </div>
    </form>
  );
}

export default Editor;
