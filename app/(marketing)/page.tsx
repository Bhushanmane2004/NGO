import { Button } from "@/components/ui/button";
import Header from "./_components/header";
import Heroes from "./_components/heroes";
import Footer from "./_components/footer";

export default function MaketingPage() { 
  return (
    <div className="min-h-screen flex flex-col  justify-center">
      <div className="flex flex-col items-center  md:justify-start text-center gap-y-8 pb-2 px-6 dark:bg-[#1f1f1f]" >
          <Header />
          <Heroes />
          <Footer />
      </div>
       
    </div>
  );
}
