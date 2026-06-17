
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Civitas Link - Rio Claro - RJ',
  description: 'Portal interativo de autoatendimento da Prefeitura Municipal de Rio Claro - RJ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
