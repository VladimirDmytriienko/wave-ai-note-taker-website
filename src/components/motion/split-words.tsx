import { Fragment, type CSSProperties } from "react";

interface SplitWordsProps {
  /** Already-translated text. Split on spaces, so it suits space-separated scripts. */
  text: string;
  /** Delay before the first word, in ms. */
  delay?: number;
  /** Delay between words, in ms. */
  stagger?: number;
}

/**
 * Headline that rises in word by word from behind a mask.
 *
 * Pure CSS (see `.split-word` in globals.css), so it runs from the HTML with
 * no script. Real spaces stay between the words, so the heading reads and
 * copies as one normal sentence.
 */
export const SplitWords = ({ text, delay = 0, stagger = 70 }: SplitWordsProps) => {
  const words = text.split(" ");

  return words.map((word, index) => (
    <Fragment key={index}>
      <span className="split-word">
        <span
          className="split-word-inner"
          style={{ "--word-delay": `${delay + index * stagger}ms` } as CSSProperties}
        >
          {word}
        </span>
      </span>
      {index < words.length - 1 ? " " : null}
    </Fragment>
  ));
};
