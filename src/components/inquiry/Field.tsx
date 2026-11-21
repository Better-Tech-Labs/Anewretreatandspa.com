import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

/**
 * Labelled form controls for the inquiry form. Text is 16px so iOS doesn't zoom
 * on focus, and errors are tied to the control for screen readers.
 */

const LABEL = "text-[11px] tracking-[0.2em] uppercase text-muted block mb-2";
// No `text-dark` here (color inherits from body): globals.css turns any
// `.text-dark[class*="border-b"]` into an animated link underline and makes the
// real border transparent, which hid these underlines on desktop.
const CONTROL =
  "w-full bg-transparent text-base placeholder:text-muted/60 focus:outline-none focus:border-accent transition-colors";

interface Described {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
}

function describedBy({ id, hint, error }: Described): string | undefined {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

function FieldShell({ id, label, hint, error, optional, children }: Described & { children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
        {optional && <span className="normal-case tracking-normal text-muted/70"> (optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-red-700 text-xs mt-2">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-muted text-xs mt-2">{hint}</p>
      ) : null}
    </div>
  );
}

type FieldProps = Described & Omit<InputHTMLAttributes<HTMLInputElement>, "id">;

export function Field({ id, label, hint, error, optional, ...input }: FieldProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy({ id, label, hint, error })}
        className={`${CONTROL} block min-h-12 border-b py-3 ${error ? "border-red-700" : "border-border"}`}
        {...input}
      />
    </FieldShell>
  );
}

type MessageFieldProps = Described & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id">;

export function MessageField({ id, label, hint, error, optional, ...textarea }: MessageFieldProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional}>
      <textarea
        id={id}
        aria-describedby={describedBy({ id, label, hint, error })}
        className={`${CONTROL} border border-border p-3 resize-none`}
        {...textarea}
      />
    </FieldShell>
  );
}

type SelectFieldProps = Described & Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> & {
  options: readonly { value: string; label: string }[];
};

export function SelectField({ id, label, hint, error, optional, options, ...select }: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional}>
      <select
        id={id}
        aria-describedby={describedBy({ id, label, hint, error })}
        className={`${CONTROL} block min-h-12 border-b border-border py-3 rounded-none cursor-pointer`}
        {...select}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </FieldShell>
  );
}
