import LoginForm from "@/components/pages/auth/LoginForm";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function Page() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <LoginForm />

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
