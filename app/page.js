import { Button } from 'lib/components/ui/button';
import Link from 'next/link';
import { getDemoUser } from 'lib/db';
import { Mail, Play } from 'lucide-react';

export default async function App() {
  const user_id = await getDemoUser();

  return (
    <div className="flex h-screen max-w-[980px] flex-col items-start space-y-6 px-8 pt-8 md:pt-12 page-header pb-8">
      <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:leading-[1.1] hidden md:block">
        Claim your profile in Web3 space
      </h1>
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] md:hidden">
        Examples
      </h1>
      <span className="max-w-[750px] text-lg text-muted-foreground sm:text-xl" data-br=":R12r9hja:" data-brr="1">
        A simplistic online profile web app, developed with React, Next.js, Cloudflare Worker. Further augmented with
        Blockchain & AI.
      </span>
      <section className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
        <Link href={user_id}>
          <Button size="lg">
            <Play className="mr-2 h-4 w-4" />
            Play with demo
          </Button>
        </Link>
        <Link href="mailto:buweiliao@gmail.com">
          <Button size="lg" variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Contact author
          </Button>
        </Link>
      </section>
    </div>
  );
}
