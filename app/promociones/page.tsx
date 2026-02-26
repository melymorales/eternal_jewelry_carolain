export const revalidate = 60;
import { client } from "@/src/lib/contentful";
import Link from "next/link";

export default async function Promociones() {
  const products = await client.getEntries({
    content_type: "producto",
    "fields.promocion": true,
    include: 2,
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
          Promociones
        </h1>
        <div className="w-20 h-[2px] bg-[#6F8087]/40 mx-auto mt-4"></div>
      </div>

      {products.items.length === 0 && (
        <p className="text-center text-gray-400">
          No hay promociones disponibles.
        </p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.items.map((product: any) => {
          const image = product.fields.imagenProducto?.[0];

          const imageUrl =
            image?.fields?.file?.url
              ? `https:${image.fields.file.url}`
              : null;

          return (
            <div
              key={product.sys.id}
              className="group bg-[#FDFCF9] border border-[#E8E3DC] rounded-3xl overflow-hidden shadow-sm hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 relative"
            >
              {/* Badge Promoción */}
              <div className="absolute top-4 left-4 bg-[#D4AF37] text-white text-xs px-4 py-1 rounded-full shadow-md tracking-wide z-10">
                Promoción
              </div>

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

                {/* Precio normal */}
                <p className="text-sm text-[#5F7178]/50 line-through">
                  ₡{product.fields.precioProducto}
                </p>

                {/* Precio promocional */}
                <p className="text-3xl font-light text-[#D4AF37] mb-2">
                  ₡{product.fields.precioPromocional}
                </p>

                {/* Ahorro */}
                <p className="text-sm text-green-600 mb-6">
                  Ahorras ₡
                  {product.fields.precioProducto -
                    product.fields.precioPromocional}
                </p>

                {/* Botón WhatsApp */}
                <a
                  href={`https://wa.me/50685412692?text=${encodeURIComponent(
                    `Hola, quiero aprovechar la promoción del producto "${product.fields.nombreProducto}", aún está disponible?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block bg-[#D4AF37] hover:bg-[#c69c2f] text-white py-3 rounded-full transition tracking-wide"
                >
                  Consultar promoción
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}