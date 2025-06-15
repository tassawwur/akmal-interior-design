// This file ensures proper routing in Vercel
// It redirects to the React app's entry point

export default function Home() {
  return null;
}

// This ensures that the page is pre-rendered
export async function getServerSideProps() {
  return {
    props: {},
  };
} 