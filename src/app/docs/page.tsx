export default function DocsPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Documentation</h1>
      <p>Welcome to the ScanMySites documentation page.</p>

      <section style={{ marginTop: "2rem" }}>
        <h2>About This App</h2>
        <p>
          ScanMySites helps you analyze websites, check performance, and review
          important technical details. This documentation page will expand as
          new features are added.
        </p>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Getting Started</h2>
        <ul>
          <li>Enter a website URL into the scanner</li>
          <li>Review the generated report</li>
          <li>Use the insights to improve your site</li>
        </ul>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>More Coming Soon</h2>
        <p>
          Additional documentation sections will be added as development
          continues.
        </p>
      </section>
    </main>
  );
}

