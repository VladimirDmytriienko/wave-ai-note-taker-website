/** Join class names, dropping falsy entries. Small enough not to need a dependency. */
export const cn = (
  ...classes: Array<string | false | null | undefined>
): string => classes.filter(Boolean).join(" ");
