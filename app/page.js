import { Button } from 'lib/components/ui/button';
import Link from 'next/link';
import { getDemoUser } from 'lib/db';
import { Mail, Play, Info } from 'lucide-react';

export default async function App() {
  const user_id = await getDemoUser();

  return (
    <div className="flex h-screen max-w-[980px] flex-col items-start space-y-6 lg:px-8 pt-8 md:pt-12 page-header pb-8">
      <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:leading-[1.1]">
        Claim your profile in Web3 space
      </h1>
      <span className="max-w-[750px] text-lg text-muted-foreground sm:text-xl" data-br=":R12r9hja:" data-brr="1">
        A simplistic online profile web app, developed with React, Next.js, Cloudflare Worker. Further augmented with
        Blockchain & AI.
      </span>
      <section className="flex flex-col w-full space-y-4 sm:space-y-0 sm:space-x-4 pb-8 pt-4 sm:flex-row">
        <Button size="lg" className="w-full sm:w-auto">
          <Play className="mr-2 h-4 w-4" />
          <Link href={user_id}>Play with demo</Link>
        </Button>
        <Button size="lg" className="w-full sm:w-auto" variant="outline">
          <Mail className="mr-2 h-4 w-4" />
          <Link href="mailto:buweiliao@gmail.com">Contact author</Link>
        </Button>
      </section>
      {/* <div className="sm:w-1/3 text-xs text-muted-foreground leading-5 flex flex-row">
        <div>
          <Info className="mr-2 h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          Couldn&lsquo;t reach demo user? That&lsquo;s because you have changed the user_id of demo user! Try a hard
          refresh with <code className="text-xs bg-slate-50 rounded-sm px-1">Command + Shift + R</code>, or{' '}
          <code className="text-xs bg-slate-50 rounded-sm px-1">Ctrl + Shift + R</code> if you&lsquo;re on Windows.
        </div>
      </div> */}
    </div>
  );
}
