declare module 'react-highlight-words' {
    import * as React from 'react';
  
    interface HighlighterProps {
      autoEscape?: boolean;
      caseSensitive?: boolean;
      sanitize?: (text: string) => string;
      searchWords: string[];
      textToHighlight: string;
      highlightClassName?: string;
      activeClassName?: string;
      highlightStyle?: React.CSSProperties;
      unhighlightStyle?: React.CSSProperties;
      highlightTag?: string | React.ComponentType;
      findChunks?: (options: {
        autoEscape: boolean;
        caseSensitive: boolean;
        sanitize: (text: string) => string;
        searchWords: string[];
        textToHighlight: string;
      }) => { start: number; end: number }[];
    }
  
    const Highlighter: React.FC<HighlighterProps>;
    export default Highlighter;
  }