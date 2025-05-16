// app/layout.js
import "./globals.css";
export const metadata = {
  title: 'ALOC',
  description: 'Allocation optimale de ressources',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
