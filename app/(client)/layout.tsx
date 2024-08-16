// app/(client)/layout.tsx
import { CartProvider } from "../components/CartContext";
import Footer from "../components/footer";
import Header from "../components/header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <CartProvider>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </CartProvider>
    </div>
  );
}
