import type { Metadata } from "next";
import "../globals.css";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { ClerkProvider} from "@clerk/nextjs";
import TopBar from "../components/Alert";
import { ThemeProvider } from "@/app/components/theme-provider"




export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Bandage Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
    <ClerkProvider dynamic>
    <html lang="en">
      <body>
     <ThemeProvider
    attribute="class"
  
   enableSystem
     disableTransitionOnChange
   > 
        <TopBar/>
        <Navbar/>
         <Sidebar/>

        {children}
        </ThemeProvider>
      </body>
      
    </html>
    </ClerkProvider>
    
  );
}
