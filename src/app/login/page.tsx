import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form className="p-6 md:p-8">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col items-center text-center gap-1">
                    <h1 className="text-lg font-bold">
                      Aplikasi Pendataan Penduduk
                    </h1>
                    <p className="text-[10px] sm:text-xs text-muted-foreground text-balance">
                      Silahkan Login Untuk Mengakses Aplikasi
                    </p>
                    <hr className="w-full mt-2" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        placeholder="********"
                      />
                    </div>
                    <hr className="w-full border-t-2 my-1" />
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                      <Link href={"/"}>
                        <span className="bg-card text-muted-foreground relative z-10 px-2 text-xs cursor-pointer">
                          Kembali Ke Halaman Utama
                        </span>
                      </Link>
                    </div>
                    <Link href={"/dashboard"}>
                      <Button
                        type="button"
                        className="w-full text-xs"
                        size={"sm"}
                      >
                        Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
              </form>
              <div className="bg-muted relative hidden md:block">
                <Image
                  src="/img/login-banner.jpg"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                  width={400}
                  height={400}
                  priority={true}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
