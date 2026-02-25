import "./globals.css";
import Header from "./Header";

export const metadata = {
  title: "Eternal Jewelry",
  description: "Joyas elegantes y atemporales",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Header />

        <main>
          {children}
        </main>

        <footer className="bg-[#6F8087] text-white">

          <div className="max-w-4xl mx-auto px-6 py-20 text-center">

            <h3 className="text-xl font-semibold tracking-wide mb-6">
              ETERNAL JEWELRY
            </h3>

            <p className="text-sm text-gray-200 leading-relaxed max-w-2xl mx-auto">
              Joyería en acero inoxidable, baños de oro y plata 925.
              Diseños elegantes y atemporales. Una experiencia que conecta
              con tu estilo.
            </p>

          </div>

          <div className="border-t border-white/20"></div>

          <div className="text-center text-sm text-gray-200 py-6">
            Hecho con <span className="text-pink-300">♥</span> por Eternal Jewelry © {new Date().getFullYear()}
          </div>

        </footer>


      </body>
    </html>
  );
}
