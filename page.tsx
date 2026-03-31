"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const totalProducts = products.length;
  const formattedTotal = useMemo(
    () =>
      products
        .reduce((acc, item) => acc + item.price, 0)
        .toLocaleString("es-MX", { style: "currency", currency: "MXN" }),
    [products]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedPrice = Number(price);

    if (!name.trim() || !description.trim() || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      return;
    }

    const newProduct: Product = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      price: parsedPrice
    };

    setProducts((prev) => [newProduct, ...prev]);
    setName("");
    setDescription("");
    setPrice("");
  };

  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b border-brand-softGray bg-brand-white/95 px-6 py-5 shadow-sm backdrop-blur-sm md:px-10">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Logo SchoolTask"
              width={72}
              height={72}
              className="rounded-full border-2 border-brand-sand object-cover"
            />
            <div>
              <h1 className="text-3xl font-extrabold text-brand-darkBrown">SchoolTask</h1>
              <p className="text-sm text-brand-gray">Tu agenda en orden, tu vida en orden.</p>
            </div>
          </div>
          <div className="rounded-lg border border-brand-sand bg-brand-cream px-4 py-2 text-sm text-brand-darkBrown">
            Panel de productos
          </div>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-6 py-8 md:grid-cols-2 md:px-10">
        <div className="rounded-2xl border border-brand-softGray bg-brand-white p-6 shadow-md">
          <h2 className="mb-1 text-2xl font-bold text-brand-darkBrown">Alta de producto</h2>
          <p className="mb-6 text-sm text-brand-gray">Completa los datos y agrega nuevos productos.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-brand-darkBrown">
                Producto
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ej. Cuaderno profesional"
                className="w-full rounded-lg border border-brand-softGray px-3 py-2 outline-none transition focus:border-brand-terracotta"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-medium text-brand-darkBrown"
              >
                Detalle o descripcion
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Ej. Cuaderno de 100 hojas para matematicas"
                rows={4}
                className="w-full rounded-lg border border-brand-softGray px-3 py-2 outline-none transition focus:border-brand-terracotta"
              />
            </div>

            <div>
              <label htmlFor="price" className="mb-1 block text-sm font-medium text-brand-darkBrown">
                Valor o precio
              </label>
              <input
                id="price"
                type="number"
                min={1}
                step="0.01"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="Ej. 120"
                className="w-full rounded-lg border border-brand-softGray px-3 py-2 outline-none transition focus:border-brand-terracotta"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-brand-terracotta px-4 py-3 text-sm font-semibold text-brand-white transition hover:brightness-95"
            >
              Agregar producto
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-brand-softGray bg-brand-white p-6 shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-brand-darkBrown">Productos dados de alta</h2>
            <span className="rounded-md bg-brand-sand px-3 py-1 text-xs font-semibold text-brand-darkBrown">
              {totalProducts} registrados
            </span>
          </div>

          <div className="mb-4 rounded-lg bg-brand-cream px-4 py-3 text-sm text-brand-darkBrown">
            Total acumulado: <strong>{formattedTotal}</strong>
          </div>

          {products.length === 0 ? (
            <div className="rounded-lg border border-dashed border-brand-softGray px-4 py-8 text-center text-brand-gray">
              Aun no hay productos registrados.
            </div>
          ) : (
            <ul className="space-y-3">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="rounded-xl border border-brand-sand bg-brand-white p-4 shadow-sm"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-brand-darkBrown">{product.name}</h3>
                    <span className="text-sm font-bold text-brand-terracotta">
                      {product.price.toLocaleString("es-MX", {
                        style: "currency",
                        currency: "MXN"
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-brand-gray">{product.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <footer className="mt-auto border-t border-brand-softGray bg-brand-darkBrown px-6 py-5 text-xs text-brand-white md:px-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2">
          <p className="font-semibold">Integrantes del proyecto:</p>
          <p>
            Munoz Garcia lann Jazhel 6CPGM
          </p>
        </div>
      </footer>
    </main>
  );
}
