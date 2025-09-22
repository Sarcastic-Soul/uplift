import { SignUp } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex min-h-screen">
      {/* Left Section: Image */}
      <div className="hidden lg:block relative w-1/2">
        <Image
          src="/rocks.jpg"
          alt="A peaceful and uplifting scene for mental wellness"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Right Section: Sign-up Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-background p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center justify-center mb-8">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-10 w-10 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Uplift</h1>
            </Link>
            <p className="text-muted-foreground mt-2 text-center">
              Create an account to start your journey to mental wellness.
            </p>
          </div>
          <div className="flex justify-center">
            <SignUp />
          </div>
        </div>
      </div>
    </div>
  );
}
