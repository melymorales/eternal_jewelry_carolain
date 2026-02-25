import { client } from "@/src/lib/contentful";
import Link from "next/link";

export default async function Anillos() {
  const products = await client.getEntries({
    content_type: "producto",
    "fields.categoriaProducto": "anillo",
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#6F8087] hover:text-[#D4AF37] transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
          </svg> Volver al inicio
        </Link>
      </div>
      {/* TÍTULO */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-light tracking-wide text-[#6F8087]">
          Anillos
        </h1>
        <div className="w-20 h-[2px] bg-[#6F8087]/40 mx-auto mt-4"></div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.items.map((product: any) => {
          const image = product.fields.imagenProducto?.[0];
          const imageUrl = image
            ? `https:${image.fields.file.url}`
            : null;

          return (
            <div
              key={product.sys.id}
              className="group bg-[#FDFCF9] border border-[#E8E3DC] rounded-3xl overflow-hidden shadow-sm hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
            >
              {imageUrl && (
                <div className="h-80 overflow-hidden relative">
                  <img
                    src={imageUrl}
                    alt={product.fields.nombreProducto}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>
              )}

              <div className="p-8 text-center">
                <h3 className="text-lg font-light text-[#5F7178] mb-3 tracking-wide">
                  {product.fields.nombreProducto}
                </h3>

                <p className="text-2xl font-light text-[#5F7178] mb-6">
                  ₡{product.fields.precioProducto}
                </p>

                <a
                  href={`https://wa.me/50685412692?text=${encodeURIComponent(
                    `Hola, quiero consultar si el producto "${product.fields.nombreProducto}" está disponible.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block bg-[#6F8087] hover:bg-[#5A6A70] text-white py-3 rounded-full transition tracking-wide"
                >
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}