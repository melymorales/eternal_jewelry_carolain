import { client } from "../src/lib/contentful";

async function getProductsByCategory(category: string) {
  const response = await client.getEntries({
    content_type: "producto",
    "fields.categoriaProducto": category,
    order: "-sys.createdAt",
    limit: 3,
  } as any);
  return response.items;
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-4xl font-light tracking-widest text-[#5F7178]">
        {title}
      </h2>
      <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-4"></div>
    </div>
  );
}

function ProductGrid({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6 ">
      {products.map((product: any) => {
        const image = product.fields.imagenProducto?.[0];
        const imageUrl = image
          ? `https:${image.fields.file.url}`
          : null;

        return (
          <div
            key={product.sys.id}
            className="group bg-white border border-[#E8E3DC] rounded-3xl overflow-hidden shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-500"
          >
            <div className="relative overflow-hidden">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={product.fields.nombreProducto}
                  className="h-80 w-full object-cover group-hover:scale-110 transition duration-700"
                />
              )}

              {product.fields.promocion && (
                <div className="absolute top-4 left-4 bg-[#D4AF37] text-white text-xs px-4 py-1 rounded-full shadow-md font-medium tracking-wide">
                  Oferta
                </div>
              )}
            </div>

            <div className="p-8 text-center">
              <h3 className="text-lg font-light text-[#5F7178] mb-4 tracking-wide">
                {product.fields.nombreProducto}
              </h3>

              {product.fields.promocion ? (
                <div className="flex flex-col items-center gap-1">
                  <p className="text-sm line-through text-[#5F7178]/50">
                    ₡{product.fields.precioProducto}
                  </p>
                  <p className="text-2xl text-[#D4AF37] font-light tracking-wide">
                    ₡{product.fields.precioPromocional}
                  </p>
                </div>
              ) : (
                <p className="text-2xl text-[#5F7178] font-light tracking-wide">
                  ₡{product.fields.precioProducto}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ViewMoreButton({ link }: { link: string }) {
  return (
    <div className="text-center mt-8">
      <a
        href={link}
        className="inline-block px-10 py-4 border border-[#5F7178] text-[#5F7178] rounded-full tracking-widest text-sm hover:bg-[#5F7178] hover:text-white transition duration-300"
      >
        VER MÁS
      </a>
    </div>
  );
}

export default async function Home() {

  const collares = await getProductsByCategory("collar");
  const pulseras = await getProductsByCategory("pulsera");
  const anillos = await getProductsByCategory("anillo");
  const aretes = await getProductsByCategory("arete");
  return (
    <>
      {/* HERO */}
      <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">

        {/* Imagen */}
        <img
          src="/hero.png"
          alt="Eternal Jewelry"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay más elegante */}
        <div className="absolute inset-0 bg-[#6F8087]/55"></div>

        {/* Contenido */}
        <div className="relative z-10 px-6 max-w-4xl">

          <h1 className="text-7xl md:text-8xl font-light tracking-[0.25em] text-white">
            ETERNAL
          </h1>

          <h2 className="text-2xl tracking-[0.5em] text-white mt-4">
            JEWELRY
          </h2>

          <p className="mt-12 text-white/90 text-xl font-light">
            Joyería en acero inoxidable y plata S925
          </p>

          <p className="mt-3 text-white/90 text-xl font-light">
            Pulseras permanentes
          </p>

          <div className="mt-16">
            <a
              href="#collares"
              className="px-12 py-4 bg-[#E8DCCF] text-[#5F7178] rounded-2xl tracking-widest text-sm hover:bg-[#d9c9b9] transition duration-300 shadow-lg"
            >
              DESCUBRIR COLECCIÓN
            </a>
          </div>

        </div>
      </section>

      {/* SECCIÓN CATEGORÍAS (LA PARTE QUE TE GUSTA PERO MEJORADA) */}
      <section id="categorias" className="text-center py-20 bg-[#F8F6F3]">

        <h3 className="text-3xl font-light text-[#6F8087] mb-4">
          Categorías
        </h3>

        <div className="w-16 h-[2px] bg-[#6F8087]/40 mx-auto mb-15"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-15">

          {[
            { name: "Collares", link: "#collares" },
            { name: "Pulseras", link: "#pulseras" },
            { name: "Aretes", link: "#aretes" },
            { name: "Anillos", link: "#anillos" },
          ].map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="group bg-white rounded-3xl shadow-sm hover:shadow-lg transition p-12 border border-gray-100"
            >
              <h4 className="text-xl font-medium text-[#6F8087] group-hover:tracking-wider transition">
                {item.name}
              </h4>

              <div className="mt-6 h-[2px] w-0 bg-[#6F8087] group-hover:w-full transition-all duration-500 mx-auto"></div>
            </a>
          ))}

        </div>

      </section>

      {/* SECCIÓN SOBRE NOSOTROS */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-5xl mx-auto px-6">

          <h2 className="text-5xl font-light mb-12 text-[#5F7178]">
            Sobre Nosotros
          </h2>

          <div className="text-lg text-[#5F7178] leading-relaxed space-y-15">
            <p>
              Eternal Jewelry es más que una joyería, es una experiencia que conecta
              elegancia y permanencia. Trabajamos con acero inoxidable de alta calidad,
              baños de oro y plata S925 para crear piezas únicas que perduren en el tiempo.
            </p>

            <p>
              Nuestras pulseras permanentes son una experiencia única donde cada pieza
              se convierte en parte de tu historia.
            </p>

            <p className="font-medium">
              Te invitamos a descubrir la elegancia eterna.
            </p>
          </div>
        </div>
      </section>

      {/* COLLARES */}
      <section id="collares" className="py-12 bg-[#F8F6F3]">
        <SectionTitle title="Collares" />
        <ProductGrid products={collares} />
        <ViewMoreButton link="/collares" />
      </section>

      {/* PULSERAS */}
      <section id="pulseras" className="py-12 bg-white">
        <SectionTitle title="Pulseras" />
        <ProductGrid products={pulseras} />
        <ViewMoreButton link="/pulseras" />
      </section>

      {/* ANILLOS */}
      <section id="anillos" className="py-12 bg-[#F8F6F3]">
        <SectionTitle title="Anillos" />
        <ProductGrid products={anillos} />
        <ViewMoreButton link="/anillos" />
      </section>

      {/* ARETES */}
      <section id="aretes" className="py-12 bg-white">
        <SectionTitle title="Aretes" />
        <ProductGrid products={aretes} />
        <ViewMoreButton link="/aretes" />
      </section>

      {/* SECCIÓN UBICACIÓN */}
      <section className="py-12 bg-[#F8F6F3] text-center">
        <div className="mb-12">
          <div className="text-5xl text-gray-300 mb-6">📍</div>
          <h2 className="text-4xl font-light tracking-wide">
            Ubicación
          </h2>
        </div>

        {/* MAPA UBICACIÓN */}
        <div className="rounded-3xl overflow-hidden shadow-lg mx-auto max-w-4xl mb-12">
          <iframe
            src="https://www.google.com/maps?q=9.907552,-83.6755614&z=17&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>

        <div className="text-gray-600 text-lg space-y-2">
          <a
            href="https://www.google.com/maps/place/Provincia+de+Cartago,+Turrialba,+Coyol/@9.907552,-83.6755614,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-[#D4AF37] transition"
          >
            Provincia de Cartago, Turrialba, Coyol
          </a>

          <p className="text-base">
            Horario: Lunes a Sábado, 10:00 AM - 7:00 PM
          </p>
        </div>
      </section>


      {/* SECCIÓN CONTACTO */}
      <section className="py-20 bg-[#FFFFFF] text-center">

        <h2 className="text-4xl font-light tracking-wide mb-16 text-[#5F7178]">
          Contáctanos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">

          {/* Instagram */}
          <div className="bg-[#D8E0E7] rounded-2xl shadow-sm p-10 hover:shadow-lg transition">
            <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
              </svg>
            </div>
            <h3 className="text-xl mb-2 text-[#5F7178]">Instagram</h3>
            <a
              href="https://www.instagram.com/_eternal_jewelry?igsh=MTVyemp5Z21xajZraA=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5F7178]/70 hover:text-[#D4AF37] transition"
            >
              _eternal_jewelry
            </a>
          </div>

          {/* Teléfono */}
          <div className="bg-[#D8E0E7] rounded-2xl shadow-sm p-10 hover:shadow-lg transition">
            <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
              </svg>
            </div>
            <h3 className="text-xl mb-2 text-[#5F7178]">WhatsApp</h3>
            <a
              href="https://wa.me/50685412692"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5F7178]/70 hover:text-[#D4AF37] transition"
            >
              +506 8541 2692
            </a>
          </div>

          {/* Email */}
          <div className="bg-[#D8E0E7] rounded-2xl shadow-sm p-10 hover:shadow-lg transition">
            <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-outbound-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5" />
              </svg>
            </div>
            <h3 className="text-xl mb-2 text-[#5F7178]">Teléfono</h3>
            <a
              href="tel:+50685412692"
              className="text-[#5F7178]/70 hover:text-[#D4AF37] transition"
            >
              +506 8541 2692
            </a>
          </div>

        </div>
      </section>

    </>
  );
}

