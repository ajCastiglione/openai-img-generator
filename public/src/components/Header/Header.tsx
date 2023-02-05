import "./Header.scss";

function Header() {
  return (
    <header>
      <div className="navbar">
        <div className="logo">
          <h2>OpenAI Image Genrator</h2>
        </div>
        <div className="nav-links">
          <ul>
            <li>
              <a href="https://beta.openai.com/docs" target="_blank">
                OpenAI API Docs
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
