import { SignUp } from "@clerk/nextjs";
 import { lusitana } from '../ui/fonts';

export default function SignUpPage() {



    return (
      <main className="flex min-h-screen flex-col p-6">
 <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-600 p-4 md:h-32">
        <div className="w-32 text-white md:w-40">

              <h1 className={`${lusitana.className} mb-4 text-4xl md:text-4xl`}>DealFlow</h1>
        </div>
            </div>
            <div className="items-center justify-center flex mt-28 b">
            <SignUp redirectUrl={"/dashboard"} routing="virtual" signInUrl="/sign-in" />
            </div>
            
        </main>
    
    );

}
