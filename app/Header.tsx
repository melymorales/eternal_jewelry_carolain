"use client";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-[#6F8087] text-white">
            <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                <h1 className="text-xl tracking-widest font-semibold">
                    ETERNAL JEWELRY
                </h1>

                <button
                    className="md:hidden flex flex-col gap-1"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="w-6 h-0.5 bg-white"></span>
                    <span className="w-6 h-0.5 bg-white"></span>
                    <span className="w-6 h-0.5 bg-white"></span>
                </button>

                <nav className="hidden md:flex gap-9 text-base tracking-wide">
                    <a href="/">Inicio</a>
                    <a href="/collares">Collares</a>
                    <a href="/pulseras">Pulseras</a>
                    <a href="/aretes">Aretes</a>
                    <a href="/anillos">Anillos</a>
                    <a
                        href="/promociones"
                        className="bg-white/20 px-4 py-1 rounded-full"
                    >
                        Promociones
                    </a>
                </nav>
            </div>

            {isOpen && (
                <nav className="md:hidden flex flex-col gap-4 px-6 pb-6">
                    <a href="/">Inicio</a>
                    <a href="/collares">Collares</a>
                    <a href="/pulseras">Pulseras</a>
                    <a href="/aretes">Aretes</a>
                    <a href="/anillos">Anillos</a>
                    <a
                        href="/promociones"
                        className="bg-white/20 px-4 py-2 rounded-full text-center"
                    >
                        Promociones
                    </a>
                </nav>
            )}
        </header>
    );
}