// next
import { Inter } from 'next/font/google'

// components
import Navbar from "./navbar";
import Footer from "./footer";

// hooks
import { useColorScheme } from "@/common/hooks";

// fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const AppLayout = ({ children }) => {
  // hooks
  const { colorScheme } = useColorScheme();

  return (
    <html
      lang="en"
      className={colorScheme}
      style={{ colorScheme: colorScheme }}
    >
      <body className={inter.className}>
        <main>
          <Navbar className="top-2" />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
};

export default AppLayout;
