import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../lib/auth&post";

export default function Navbar({ count }) {
  const { pathname } = useRouter();

  const { logOut, isLoggedIn } = useAuth();

  const handleLogout = async () => {
    await logOut();
  };

  return (
    <nav>
      <Link href="/">
        <a>
          <h3 className="nav-left">RedditLikePlatform for Ignition</h3>
        </a>
      </Link>
      {pathname === "/" ? (
        count && <p>Links: {count}</p>
      ) : pathname === "/login" ? (
        <h3>Login!</h3>
      ) : pathname === "/signup" ? (
        <h3>Signup!</h3>
      ) : (
        isLoggedIn() && <h3>Post!</h3>
      )}

      <div className="navbar-rigth">
        {isLoggedIn() ? (
          <Link href="/login">
            <a className="login-a" onClick={handleLogout}>
              Log Out
            </a>
          </Link>
        ) : (
          <>
            <a href="/login" className="login-a">
              Login
            </a>
            <a href="/signup" className="signup-a">
              Sign Up
            </a>
          </>
        )}
      </div>
    </nav>
  );
}
