'use client';

import React, { useState } from "react";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Menu,
  Sparkles,
  ArrowRight,
  Flame,
} from "lucide-react";

// Sample Products (Streetwear + Anime Aesthetic)
const PRODUCTS = [
  {
    id: 1,
    name: "Cyber Neon Samurai Oversized Tee",
    japaneseTitle: "サイバー侍",
    price: 35,
    tag: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 2,
    name: "Akira Graphic Heavyweight Hoodie",
    japaneseTitle: "アキラネオ",
    price: 68,
    tag: "DROP 01",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
    sizes: ["M", "L", "XL"],
  },
  {
    id: 3,
    name: "Tokyo Underworld Cargo Joggers",
    japaneseTitle: "東京裏社会",
    price: 55,
    tag: "LIMITED",
    image:
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=800",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "Mecha Wing Vintage Washed Cap",
    japaneseTitle: "メカキャップ",
    price: 28,
    tag: "NEW",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800",
    sizes: ["ONE SIZE"],
  },
];

export default function ZenjiStorefront() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState({
    1: "L",
    2: "XL",
    3: "M",
    4: "ONE SIZE",
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cart Handlers
  const addToCart = (product) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    const cartId = `${product.id}-${size}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartId === cartId);
      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, quantity: 1, cartId }];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (cartId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-red-500 selection:text-white">
      {/* Top Banner */}
      <div className="bg-red-600 text-white text-xs font-bold tracking-widest text-center py-1.5 px-4 flex items-center justify-center gap-2">
        <Flame className="w-3.5 h-3.5 fill-current" />
        <span>DROP 01 IS NOW LIVE — FREE WORLDWIDE SHIPPING OVER $100</span>
      </div>

      {/* Branded Header */}
      <header className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2 group">
              <span className="text-2xl font-black tracking-tighter text-white group-hover:text-red-500 transition-colors uppercase">
                ZENJI<span className="text-red-500">.</span>
              </span>
              <span className="text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded tracking-widest uppercase font-mono">
                禅児
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
              <a href="#shop" className="hover:text-white transition-colors">
                New Arrivals
              </a>
              <a href="#shop" className="hover:text-white transition-colors">
                Apparel
              </a>
              <a href="#shop" className="hover:text-white transition-colors">
                Accessories
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-neutral-300 hover:text-white transition-colors rounded-lg bg-neutral-900 border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-neutral-950">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-neutral-950 to-neutral-950 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-800/50 text-red-400 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Cyberpunk x Anime Streetwear
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-none">
              Wear The <span className="text-red-500">Culture</span>. <br />
              Define The <span className="underline decoration-red-500">Future</span>.
            </h1>

            <p className="text-neutral-400 text-base sm:text-lg max-w-xl">
              Limited-run anime aesthetic clothing crafted with heavyweight premium fabrics. Designed in Tokyo vibe, built for street comfort.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#shop"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3.5 rounded-lg transition-all shadow-lg shadow-red-600/20 active:scale-95"
              >
                EXPLORE COLLECTION <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 relative group">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800"
                alt="Zenji Apparel Hero"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-mono text-red-400">LOOKBOOK 2026</span>
                <p className="text-lg font-bold text-white uppercase">Neo Tokyo Cyber Series</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-neutral-800 pb-6">
          <div>
            <span className="text-xs font-mono text-red-500 tracking-widest uppercase">OFFICIAL CATALOG</span>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">FEATURED DROPS</h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-xs">
            High-grade materials with custom high-density Japanese typography prints.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-neutral-700 transition-all"
            >
              <div>
                {/* Image Box */}
                <div className="relative aspect-square overflow-hidden bg-neutral-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-white text-[10px] font-bold px-2 py-1 rounded tracking-wider">
                    {product.tag}
                  </span>
                  <span className="absolute top-3 right-3 text-2xl font-black text-neutral-500/30 select-none">
                    {product.japaneseTitle}
                  </span>
                </div>

                {/* Details */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-white text-base leading-snug group-hover:text-red-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-lg font-extrabold text-neutral-200 mt-1">${product.price}</p>
                  </div>

                  {/* Size Selector */}
                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1.5">
                      Select Size
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() =>
                            setSelectedSizes((prev) => ({ ...prev, [product.id]: size }))
                          }
                          className={`text-xs font-semibold px-2.5 py-1 rounded border transition-all ${
                            (selectedSizes[product.id] || product.sizes[0]) === size
                              ? "bg-red-600 border-red-500 text-white"
                              : "bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-neutral-800 hover:bg-red-600 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" /> ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Slide-over Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 text-white p-6 flex flex-col justify-between shadow-2xl">
              {/* Cart Header */}
              <div>
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-red-500" />
                    <h2 className="text-lg font-bold uppercase tracking-wider">YOUR CART</h2>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-neutral-400 hover:text-white p-1"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Cart Items List */}
                <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500">
                      <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p className="text-sm font-medium">Your cart is empty.</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.cartId}
                        className="flex items-center gap-4 bg-neutral-950 p-3 rounded-lg border border-neutral-800"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded bg-neutral-900"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold truncate text-white">{item.name}</h4>
                          <p className="text-xs text-neutral-400 mt-0.5">
                            Size: <span className="text-red-400 font-semibold">{item.selectedSize}</span>
                          </p>
                          <p className="text-sm font-extrabold text-white mt-1">${item.price}</p>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded p-1">
                          <button
                            onClick={() => updateQuantity(item.cartId, -1)}
                            className="p-1 hover:text-red-400 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold px-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartId, 1)}
                            className="p-1 hover:text-red-400 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Cart Footer / Subtotal */}
              <div className="border-t border-neutral-800 pt-4 space-y-4">
                <div className="flex justify-between items-center text-base font-bold">
                  <span className="text-neutral-400">SUBTOTAL</span>
                  <span className="text-xl text-white">${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-[11px] text-neutral-500">Shipping and taxes calculated at checkout.</p>
                <button
                  disabled={cart.length === 0}
                  className="w-full bg-red-600 hover:bg-red-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-white font-bold py-3.5 rounded-lg transition-colors uppercase tracking-wider text-sm shadow-lg shadow-red-600/20"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-800 bg-neutral-950 py-10 text-neutral-500 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <p className="font-bold text-neutral-300 tracking-widest uppercase">
            ZENJI STREETWEAR © 2026 — ALL RIGHTS RESERVED
          </p>
          <p>Inspired by Japanese cyberpunk, anime street fashion, and heavy aesthetics.</p>
        </div>
      </footer>
    </div>
  );
}


// "use client";

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import {
//   ShoppingBag,
//   X,
//   Plus,
//   Minus,
//   Menu,
//   Sparkles,
//   ArrowRight,
//   Flame,
//   Trash2,
// } from "lucide-react";

// const PRODUCTS = [
//   {
//     id: 1,
//     name: "Cyber Neon Samurai Oversized Tee",
//     japaneseTitle: "サイバー侍",
//     price: 35,
//     tag: "BESTSELLER",
//     defaultSize: "L",
//     image:
//       "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//   },
//   {
//     id: 2,
//     name: "Neo Tokyo Heavyweight Hoodie",
//     japaneseTitle: "ネオ東京",
//     price: 68,
//     tag: "DROP 01",
//     defaultSize: "XL",
//     image:
//       "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
//     sizes: ["M", "L", "XL"],
//   },
//   {
//     id: 3,
//     name: "Tokyo Underworld Cargo Joggers",
//     japaneseTitle: "東京裏社会",
//     price: 55,
//     tag: "LIMITED",
//     defaultSize: "M",
//     image:
//       "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=800",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     id: 4,
//     name: "Mecha Wing Vintage Washed Cap",
//     japaneseTitle: "メカキャップ",
//     price: 28,
//     tag: "NEW",
//     defaultSize: "ONE SIZE",
//     image:
//       "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800",
//     sizes: ["ONE SIZE"],
//   },
// ];

// const NAV_LINKS = [
//   { label: "Shop", href: "#shop" },
//   { label: "Lookbook", href: "#lookbook" },
// ];

// const money = (n) => `$${n.toFixed(2)}`;

// const FOCUS =
//   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950";

// // Falls back to a kanji tile if the remote image fails to load.
// function SafeImage({ src, alt, glyph, className }) {
//   const [failed, setFailed] = useState(false);
//   if (failed) {
//     return (
//       <div
//         role="img"
//         aria-label={alt}
//         className={`grid place-items-center bg-neutral-800 font-black text-neutral-500 ${className}`}
//       >
//         {glyph}
//       </div>
//     );
//   }
//   return (
//     <img
//       src={src}
//       alt={alt}
//       loading="lazy"
//       onError={() => setFailed(true)}
//       className={className}
//     />
//   );
// }

// function ProductCard({ product, onAdd }) {
//   const [size, setSize] = useState(product.defaultSize);

//   return (
//     <article className="group flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition-colors hover:border-neutral-700">
//       <div>
//         <div className="relative aspect-square overflow-hidden bg-neutral-950">
//           <SafeImage
//             src={product.image}
//             alt={product.name}
//             glyph={product.japaneseTitle.charAt(0)}
//             className="h-full w-full object-cover text-6xl motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
//           />
//           <span className="absolute left-3 top-3 rounded border border-neutral-800 bg-neutral-950/80 px-2 py-1 text-[10px] font-bold tracking-wider text-white backdrop-blur-md">
//             {product.tag}
//           </span>
//           <span
//             aria-hidden="true"
//             className="absolute right-3 top-3 select-none text-2xl font-black text-neutral-500/30"
//           >
//             {product.japaneseTitle}
//           </span>
//         </div>

//         <div className="space-y-3 p-4">
//           <div>
//             <h3 className="text-base font-bold leading-snug text-white">{product.name}</h3>
//             <p className="mt-1 text-lg font-extrabold text-neutral-200">{money(product.price)}</p>
//           </div>

//           <fieldset>
//             <legend className="mb-1.5 font-mono text-[11px] uppercase text-neutral-400">
//               Select size
//             </legend>
//             <div className="flex flex-wrap gap-2">
//               {product.sizes.map((s) => (
//                 <button
//                   key={s}
//                   type="button"
//                   aria-pressed={size === s}
//                   onClick={() => setSize(s)}
//                   className={`h-11 min-w-11 rounded border px-3 text-xs font-semibold transition-colors ${FOCUS} ${
//                     size === s
//                       ? "border-red-500 bg-red-600 text-white"
//                       : "border-neutral-700 bg-neutral-800 text-neutral-300 hover:text-white"
//                   }`}
//                 >
//                   {s}
//                 </button>
//               ))}
//             </div>
//           </fieldset>
//         </div>
//       </div>

//       <div className="p-4 pt-0">
//         <button
//           onClick={() => onAdd(product, size)}
//           className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-neutral-800 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-600 ${FOCUS}`}
//         >
//           <ShoppingBag className="h-4 w-4" aria-hidden="true" /> ADD TO CART
//         </button>
//       </div>
//     </article>
//   );
// }

// function CartDrawer({ open, onClose, cart, subtotal, onChange, onRemove }) {
//   const panelRef = useRef(null);
//   const closeRef = useRef(null);

//   // While open: lock page scroll, close on Esc, trap Tab inside the drawer.
//   // On close: give focus back to whatever opened it.
//   useEffect(() => {
//     if (!open) return;
//     const trigger = document.activeElement;
//     const prevOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     closeRef.current?.focus();

//     const onKeyDown = (e) => {
//       if (e.key === "Escape") return onClose();
//       if (e.key !== "Tab") return;
//       const focusable = panelRef.current.querySelectorAll("button:not([disabled])");
//       const first = focusable[0];
//       const last = focusable[focusable.length - 1];
//       if (e.shiftKey && document.activeElement === first) {
//         e.preventDefault();
//         last.focus();
//       } else if (!e.shiftKey && document.activeElement === last) {
//         e.preventDefault();
//         first.focus();
//       }
//     };

//     document.addEventListener("keydown", onKeyDown);
//     return () => {
//       document.removeEventListener("keydown", onKeyDown);
//       document.body.style.overflow = prevOverflow;
//       trigger?.focus?.();
//     };
//   }, [open, onClose]);

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50">
//       <div
//         className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
//         onClick={onClose}
//         aria-hidden="true"
//       />

//       <div
//         ref={panelRef}
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="cart-title"
//         className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-neutral-800 bg-neutral-900 text-white shadow-2xl"
//       >
//         <div className="flex items-center justify-between border-b border-neutral-800 p-6 pb-4">
//           <div className="flex items-center gap-2">
//             <ShoppingBag className="h-5 w-5 text-red-500" aria-hidden="true" />
//             <h2 id="cart-title" className="text-lg font-bold uppercase tracking-wider">
//               Your cart
//             </h2>
//           </div>
//           <button
//             ref={closeRef}
//             onClick={onClose}
//             aria-label="Close cart"
//             className={`grid h-11 w-11 place-items-center rounded text-neutral-300 hover:text-white ${FOCUS}`}
//           >
//             <X className="h-6 w-6" aria-hidden="true" />
//           </button>
//         </div>

//         <ul className="flex-1 space-y-4 overflow-y-auto p-6">
//           {cart.length === 0 && (
//             <li className="py-12 text-center text-neutral-400">
//               <ShoppingBag className="mx-auto mb-3 h-12 w-12 opacity-30" aria-hidden="true" />
//               <p className="text-sm font-medium">Your cart is empty.</p>
//             </li>
//           )}

//           {cart.map((item) => (
//             <li
//               key={item.cartId}
//               className="flex items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-950 p-3"
//             >
//               <SafeImage
//                 src={item.image}
//                 alt={item.name}
//                 glyph={item.japaneseTitle.charAt(0)}
//                 className="h-16 w-16 shrink-0 rounded object-cover text-2xl"
//               />

//               <div className="min-w-0 flex-1">
//                 <h3 className="truncate text-xs font-bold text-white">{item.name}</h3>
//                 <p className="mt-0.5 text-xs text-neutral-400">
//                   Size: <span className="font-semibold text-red-400">{item.selectedSize}</span>
//                 </p>
//                 <p className="mt-1 text-sm font-extrabold">{money(item.price)}</p>
//               </div>

//               <div className="flex flex-col items-end gap-1">
//                 <div className="flex items-center rounded border border-neutral-800 bg-neutral-900">
//                   <button
//                     onClick={() => onChange(item.cartId, -1)}
//                     aria-label={`Decrease quantity of ${item.name}`}
//                     className={`grid h-11 w-9 place-items-center hover:text-red-400 ${FOCUS}`}
//                   >
//                     <Minus className="h-3.5 w-3.5" aria-hidden="true" />
//                   </button>
//                   <span className="min-w-6 text-center text-xs font-bold" aria-live="polite">
//                     {item.quantity}
//                   </span>
//                   <button
//                     onClick={() => onChange(item.cartId, 1)}
//                     aria-label={`Increase quantity of ${item.name}`}
//                     className={`grid h-11 w-9 place-items-center hover:text-red-400 ${FOCUS}`}
//                   >
//                     <Plus className="h-3.5 w-3.5" aria-hidden="true" />
//                   </button>
//                 </div>
//                 <button
//                   onClick={() => onRemove(item.cartId)}
//                   aria-label={`Remove ${item.name} size ${item.selectedSize} from cart`}
//                   className={`flex h-9 items-center gap-1 px-1 text-xs text-neutral-400 hover:text-red-400 ${FOCUS}`}
//                 >
//                   <Trash2 className="h-3.5 w-3.5" aria-hidden="true" /> Remove
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>

//         <div className="space-y-3 border-t border-neutral-800 p-6 pt-4">
//           <div className="flex items-center justify-between font-bold">
//             <span className="text-neutral-400">SUBTOTAL</span>
//             <span className="text-xl">{money(subtotal)}</span>
//           </div>
//           <button
//             disabled={cart.length === 0}
//             onClick={() => alert("Demo only — no payment is taken.")}
//             className={`min-h-12 w-full rounded-lg bg-red-600 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-red-600/20 transition-colors hover:bg-red-500 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:shadow-none ${FOCUS}`}
//           >
//             Checkout (demo)
//           </button>
//           <p className="text-[11px] text-neutral-400">
//             Demo store — no payment is taken and nothing is shipped.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ZenjiStorefront() {
//   const [cart, setCart] = useState([]);
//   const [cartOpen, setCartOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const closeCart = useCallback(() => setCartOpen(false), []);

//   const count = cart.reduce((sum, item) => sum + item.quantity, 0);
//   const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const addToCart = (product, size) => {
//     const cartId = `${product.id}-${size}`;
//     setCart((prev) =>
//       prev.some((i) => i.cartId === cartId)
//         ? prev.map((i) => (i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i))
//         : [...prev, { ...product, selectedSize: size, quantity: 1, cartId }]
//     );
//     setCartOpen(true);
//   };

//   const changeQuantity = (cartId, delta) =>
//     setCart((prev) =>
//       prev
//         .map((i) => (i.cartId === cartId ? { ...i, quantity: i.quantity + delta } : i))
//         .filter((i) => i.quantity > 0)
//     );

//   const removeItem = (cartId) => setCart((prev) => prev.filter((i) => i.cartId !== cartId));

//   return (
//     <div className="min-h-screen bg-neutral-950 font-sans text-neutral-100 selection:bg-red-500 selection:text-white">
      
//        <a href="#shop"
//         className="absolute -top-16 left-2 z-[60] rounded bg-white px-3 py-2 font-semibold text-black focus:top-2"
//       >
//         Skip to products
//       </a>

//       <div className="flex items-center justify-center gap-2 bg-red-600 px-4 py-1.5 text-center text-xs font-bold tracking-widest text-white">
//         <Flame className="h-3.5 w-3.5 shrink-0 fill-current" aria-hidden="true" />
//         <span>DROP 01 IS NOW LIVE — FREE WORLDWIDE SHIPPING OVER $100</span>
//       </div>

//       <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
//         <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center gap-8">
//             <a href="#" className={`group flex items-center gap-2 ${FOCUS}`} aria-label="ZENJI home">
//               <span className="text-2xl font-black uppercase tracking-tighter text-white transition-colors group-hover:text-red-500">
//                 ZENJI<span className="text-red-500">.</span>
//               </span>
//               <span
//                 aria-hidden="true"
//                 className="rounded bg-neutral-800 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-neutral-400"
//               >
//                 禅児
//               </span>
//             </a>

//             <nav aria-label="Main" className="hidden items-center gap-6 text-sm font-medium text-neutral-400 md:flex">
//               {NAV_LINKS.map((l) => (
//                 <a key={l.href} href={l.href} className={`transition-colors hover:text-white ${FOCUS}`}>
//                   {l.label}
//                 </a>
//               ))}
//             </nav>
//           </div>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setCartOpen(true)}
//               aria-haspopup="dialog"
//               aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
//               className={`relative grid h-11 w-11 place-items-center rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 transition-colors hover:text-white ${FOCUS}`}
//             >
//               <ShoppingBag className="h-5 w-5" aria-hidden="true" />
//               {count > 0 && (
//                 <span
//                   aria-hidden="true"
//                   className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full border-2 border-neutral-950 bg-red-600 text-[10px] font-bold text-white"
//                 >
//                   {count}
//                 </span>
//               )}
//             </button>

//             <button
//               onClick={() => setMenuOpen((o) => !o)}
//               aria-expanded={menuOpen}
//               aria-controls="mobile-menu"
//               aria-label="Toggle menu"
//               className={`grid h-11 w-11 place-items-center rounded-lg text-neutral-300 hover:text-white md:hidden ${FOCUS}`}
//             >
//               {menuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
//             </button>
//           </div>
//         </div>

//         {menuOpen && (
//           <nav id="mobile-menu" aria-label="Mobile" className="border-t border-neutral-800 md:hidden">
//             <ul className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
//               {NAV_LINKS.map((l) => (
//                 <li key={l.href}>
                  
//                   <a  href={l.href}
//                     onClick={() => setMenuOpen(false)}
//                     className={`block py-3 text-sm font-medium text-neutral-300 hover:text-white ${FOCUS}`}
//                   >
//                     {l.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </header>

//       <main>
//         <section id="lookbook" className="relative overflow-hidden border-b border-neutral-800">
//           <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-neutral-950 to-neutral-950" />

//           <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-28">
//             <div className="space-y-6 lg:col-span-7">
//               <div className="inline-flex items-center gap-2 rounded-full border border-red-800/50 bg-red-950/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-400">
//                 <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Cyberpunk x Anime Streetwear
//               </div>

//               <h1 className="text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-6xl">
//                 Wear the <span className="text-red-500">culture</span>. <br />
//                 Define the <span className="underline decoration-red-500">future</span>.
//               </h1>

//               <p className="max-w-xl text-base text-neutral-300 sm:text-lg">
//                 Limited-run anime aesthetic clothing crafted with heavyweight premium fabrics.
//                 Designed with a Tokyo vibe, built for street comfort.
//               </p>

//               <a
//                 href="#shop"
//                 className={`inline-flex min-h-12 items-center gap-2 rounded-lg bg-red-600 px-8 py-3.5 font-bold text-white shadow-lg shadow-red-600/20 transition-colors hover:bg-red-500 motion-safe:active:scale-95 ${FOCUS}`}
//               >
//                 SHOP THE DROP <ArrowRight className="h-4 w-4" aria-hidden="true" />
//               </a>
//             </div>

//             <div className="lg:col-span-5">
//               <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
//                 <SafeImage
//                   src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800"
//                   alt="Model wearing streetwear from the ZENJI Neo Tokyo series"
//                   glyph="禅"
//                   className="h-full w-full object-cover text-8xl motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
//                 <div className="absolute bottom-6 left-6 right-6">
//                   <span className="font-mono text-xs text-red-400">LOOKBOOK 2026</span>
//                   <p className="text-lg font-bold uppercase text-white">Neo Tokyo Cyber Series</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section id="shop" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
//           <div className="mb-12 flex flex-col justify-between gap-4 border-b border-neutral-800 pb-6 md:flex-row md:items-end">
//             <div>
//               <span className="font-mono text-xs uppercase tracking-widest text-red-500">Demo catalog</span>
//               <h2 className="text-3xl font-black uppercase tracking-tight text-white">Featured drops</h2>
//             </div>
//             <p className="max-w-xs text-sm text-neutral-400">
//               Heavyweight materials with high-density Japanese typography prints.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//             {PRODUCTS.map((p) => (
//               <ProductCard key={p.id} product={p} onAdd={addToCart} />
//             ))}
//           </div>
//         </section>
//       </main>

//       <footer className="border-t border-neutral-800 bg-neutral-950 py-10 text-center text-xs text-neutral-400">
//         <div className="mx-auto max-w-7xl space-y-3 px-4">
//           <p className="font-bold uppercase tracking-widest text-neutral-300">
//             ZENJI streetwear demo © 2026
//           </p>
//           <p>
//             Concept storefront with mock products — no real payments. Inspired by Japanese
//             cyberpunk and anime street fashion.
//           </p>
//         </div>
//       </footer>

//       <CartDrawer
//         open={cartOpen}
//         onClose={closeCart}
//         cart={cart}
//         subtotal={subtotal}
//         onChange={changeQuantity}
//         onRemove={removeItem}
//       />
//     </div>
//   );
// }