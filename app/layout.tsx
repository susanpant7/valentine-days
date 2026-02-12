import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ margin: 0, padding: 0, overflow: "hidden" }}>
      <body style={{ margin: 0, padding: 0, background: "linear-gradient(135deg, #47091a, #7a0b3f)" }}>
        {/* Heart Layer */}
        <div style={heartWrapperStyle}>
          <span className="beating-heart">❤️</span>
          <span className="beating-heart" style={{ animationDelay: "1s" }}>❤️</span>
          <span className="beating-heart" style={{ animationDelay: "2s" }}>❤️</span>
        </div>

        {/* Page Content */}
        {children}

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes heartPulse {
            0%, 100% { transform: scale(1); opacity: 0.1; }
            50% { transform: scale(1.2); opacity: 0.25; }
          }
          .beating-heart {
            position: absolute;
            font-size: 50vw;
            animation: heartPulse 4s infinite ease-in-out;
            filter: blur(10px);
            opacity: 0.15;
          }
        `}} />
      </body>
    </html>
  );
}

const heartWrapperStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  pointerEvents: "none",
};
