import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    /* Fonts */
    --font-primary: 'Montserrat', sans-serif;
    --font-heading: 'Playfair Display', serif;
    
    /* Colors */
    --color-primary: #1A1A1A;
    --color-secondary: #DCA867;
    --color-bg: #FFFFFF;
    --color-bg-light: #F9F9F9;
    --color-text: #555555;
    --color-text-dark: #1A1A1A;
    --color-text-light: #888888;
    --color-gold: #DCA867;
    
    /* Shadows */
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 5px 15px rgba(0, 0, 0, 0.07);
    --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.1);
    
    /* Transitions */
    --transition: all 0.3s ease;
    
    /* Responsive units - mobile first */
    --container-padding: 15px;
    --content-width: 100%;
    --heading-scale: 1;
    --button-width: 100%;
    
    /* Z-indices */
    --z-drawer: 1000;
    --z-header: 100;
    --z-overlay: 50;
    --z-modal: 1500;
    
    /* Border radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 16px;
    
    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-xxl: 48px;
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 100%; /* 16px by default */
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--font-primary);
    color: var(--color-text);
    background-color: var(--color-bg);
    overflow-x: hidden;
    line-height: 1.6;
    min-height: 100vh;
    font-size: 1rem;
    text-rendering: optimizeSpeed;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    color: var(--color-text-dark);
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 0.5em;
  }
  
  h1 {
    font-size: calc(1.75rem * var(--heading-scale));
  }
  
  h2 {
    font-size: calc(1.5rem * var(--heading-scale));
  }
  
  h3 {
    font-size: calc(1.25rem * var(--heading-scale));
  }
  
  h4 {
    font-size: calc(1.125rem * var(--heading-scale));
  }
  
  h5, h6 {
    font-size: calc(1rem * var(--heading-scale));
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: var(--transition);
    position: relative;
  }
  
  a:hover, a:focus {
    color: var(--color-secondary);
    outline: none;
  }
  
  a:focus-visible {
    outline: 2px solid var(--color-secondary);
    outline-offset: 2px;
  }

  .container {
    width: 100%;
    max-width: var(--content-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }

  img, picture, video, canvas, svg {
    max-width: 100%;
    height: auto;
    display: block;
  }

  input, button, textarea, select {
    font: inherit;
  }

  button {
    font-family: var(--font-primary);
    cursor: pointer;
    border: none;
    background: none;
  }

  .btn {
    display: inline-block;
    padding: 12px 28px;
    border-radius: var(--radius-sm);
    font-weight: 500;
    text-align: center;
    transition: var(--transition);
    width: var(--button-width);
  }

  .btn-primary {
    background-color: var(--color-secondary);
    color: white;
    border: 1px solid var(--color-secondary);
    
    &:hover {
      background-color: transparent;
      color: var(--color-secondary);
    }
  }

  .btn-outlined {
    background-color: transparent;
    color: var(--color-secondary);
    border: 1px solid var(--color-secondary);
    
    &:hover {
      background-color: var(--color-secondary);
      color: white;
    }
  }

  .btn-secondary {
    background-color: var(--color-primary);
    color: white;
    border: 1px solid var(--color-primary);
    
    &:hover {
      opacity: 0.9;
    }
  }

  .text-secondary {
    color: var(--color-secondary);
  }
  
  /* Responsive tables */
  .responsive-table {
    width: 100%;
    overflow-x: auto;
  }
  
  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: var(--color-bg-light);
  }
  
  ::-webkit-scrollbar-thumb {
    background: var(--color-text-light);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-text);
  }
  
  /* Skip to content for accessibility */
  .skip-to-content {
    position: absolute;
    left: -9999px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
  
  .skip-to-content:focus {
    position: fixed;
    top: 0;
    left: 0;
    width: auto;
    height: auto;
    padding: 10px;
    background: var(--color-primary);
    color: white;
    z-index: 10000;
  }
  
  /* Utility classes */
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  /* Accessibility focus styles */
  *:focus-visible {
    outline: 2px solid var(--color-secondary);
    outline-offset: 2px;
  }
  
  /* Screen reader only */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  /* Media query helpers in JavaScript */
  body::after {
    content: "mobile";
    display: none;
  }
  
  @media (min-width: 576px) {
    :root {
      --container-padding: 20px;
      --heading-scale: 1.05;
      --button-width: auto;
    }
    
    body::after {
      content: "small";
    }
  }
  
  @media (min-width: 768px) {
    :root {
      --container-padding: 30px;
      --heading-scale: 1.1;
    }
    
    body::after {
      content: "medium";
    }
    
    .btn {
      min-width: 160px;
    }
  }
  
  @media (min-width: 992px) {
    :root {
      --container-padding: 40px;
      --content-width: 960px;
      --heading-scale: 1.15;
    }
    
    body::after {
      content: "large";
    }
  }
  
  @media (min-width: 1200px) {
    :root {
      --content-width: 1140px;
      --heading-scale: 1.2;
    }
    
    body::after {
      content: "xlarge";
    }
  }
  
  @media (min-width: 1400px) {
    :root {
      --content-width: 1320px;
    }
    
    body::after {
      content: "xxlarge";
    }
  }
`;

export default GlobalStyle; 