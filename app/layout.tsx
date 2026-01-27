import { Nunito, Buda } from "next/font/google";
import "./globals.css";
const buda = Buda({
  variable: "--font-buda",
  subsets: ["latin"],
  weight: "300",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${buda.variable} ${nunito.variable} antialiased`}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
