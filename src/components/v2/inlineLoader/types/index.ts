export interface InlineLoaderProps {
  /**
   * The current state of the inline loader.
   */
  status: 'loading' | 'success' | 'error';
  /**
   * The optional text label displayed next to the icon.
   */
  text?: string | undefined;
  /**
   * Additional CSS classes.
   */
  className?: string | undefined;
}
