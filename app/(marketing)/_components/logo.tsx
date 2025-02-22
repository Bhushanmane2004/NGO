import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

function logo() {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/foodshare.png"
        alt="Logo"
        height="40"
        width="40"
        className="dark:hidden "
      />
      <Image
        src="/lg.svg"
        alt="Logo"
        height="40"
        width="40"
        className="hidden dark:block"
      />
      <p className={cn("font-semibold")}>FoodShare</p>
    </div>
  );
}

export default logo;
