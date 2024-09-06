import Footer from "./Footer";
import Header from "./Header";
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    return (
        <div className='layout'>
          <Header />
            {children}
          <Footer/>
        </div>
  );
}

export default Layout;