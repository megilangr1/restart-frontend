import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full min-w-full sm:min-w-sm sm:max-w-sm flex flex-col items-center justify-center px-4">
        <Link href={"/login"}>
          <div className="w-full flex flex-col gap-2 border rounded-lg px-8 py-4 shadow-lg">
            <Avatar className="size-28 sm:size-32 md:size-36 lg:size-40 mx-auto border-2 border-slate-400">
              <AvatarImage src="/img/logo.png" />
              <AvatarFallback>CH</AvatarFallback>
            </Avatar>
            <hr className="w-[50%] mx-auto border-t-2 my-2" />
            <h1 className="w-full text-xs md:text-sm lg:text-base text-center font-semibold">
              Aplikasi Pendataan Penduduk
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
}
