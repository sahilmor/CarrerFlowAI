'use client';

import { PropsWithChildren } from "react";
import { NavigationBar } from "../ui-components/NavigationBar";
import Footer from "../ui-components/Footer";

const MainWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <main className="flex-grow mt-16">{/* Ensures space for the fixed navbar */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainWrapper;
