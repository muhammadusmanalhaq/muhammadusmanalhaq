export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <p className="footer-text">
          © 2026 Muhammad Usman Al Haq · Built with Next.js · Islamabad, Pakistan
        </p>
        <div className="footer-links">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=muhammadusmanalhaq@gmail.com" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="Email">
            Email
          </a>
          <a
            href="https://pk.linkedin.com/in/muhammad-usman-al-haq-05a321315"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/muhammadusmanalhaq"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            aria-label="GitHub"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
