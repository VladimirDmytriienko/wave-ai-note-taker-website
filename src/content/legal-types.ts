/**
 * Shape of the legal documents.
 *
 * Content is data, not JSX: a non-developer can edit `src/content/<locale>/`
 * without touching a component, and the same renderer lays out every document.
 *
 * `todo` blocks are for facts nobody on the project can invent — a company
 * name, a jurisdiction, a support address. They render as a visible marker so
 * an unfinished document cannot quietly go live reading as settled law.
 */

export type LegalBlock =
  | { readonly type: "paragraph"; readonly text: string }
  | { readonly type: "list"; readonly items: readonly string[] }
  | { readonly type: "todo"; readonly text: string };

export interface LegalSection {
  /** Anchor id. */
  readonly id: string;
  readonly heading: string;
  readonly blocks: readonly LegalBlock[];
}

export interface LegalDocument {
  readonly title: string;
  /** Short description used for the page metadata. */
  readonly description: string;
  /** ISO date, rendered in the reader's locale. */
  readonly updated: string;
  readonly intro: readonly string[];
  readonly sections: readonly LegalSection[];
  /** Shows a banner saying the document is not final. Remove after review. */
  readonly reviewRequired?: true;
}
