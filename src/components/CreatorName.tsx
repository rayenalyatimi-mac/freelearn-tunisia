import { Caveat } from "next/font/google";

const signature = Caveat({ subsets: ["latin"], weight: ["600"] });

export default function CreatorName() {
  return (
    <span className={`${signature.className} text-xl`}>
      Mouhamed Rayen Alyatimi
    </span>
  );
}