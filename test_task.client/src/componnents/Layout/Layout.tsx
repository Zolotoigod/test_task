import Footer from "./Footer";
import Header from "./Header";
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
        <div>
          <Header />
              <div>{children}</div>
          <Footer/>
        </div>
  );
}

export default Layout;