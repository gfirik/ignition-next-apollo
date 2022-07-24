import "../styles/globals.css";
import { AuthProvider } from "../lib/auth&post";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />;
    </AuthProvider>
  );
}
