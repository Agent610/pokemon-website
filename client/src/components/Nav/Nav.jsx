import "./Nav.css";

function Nav({ user, onSignOut, onSignIn }) {
  return (
    <nav className="nav-links">
      <a href="/">Home</a>
      {user ? (
        <>
          <span className="username">{user.username}</span>
          <button className="signout-button" onClick={onSignOut}>
            Sign Out
          </button>
        </>
      ) : (
        <button className="signin-button" onClick={onSignIn}>
          Sign In
        </button>
      )}
    </nav>
  );
}

export default Nav;
