import SidebarNav from 'lib/components/SidebarNav';
import { Separator } from 'lib/components/ui/separator';

export const metadata = {
  title: 'Edit profile',
};

export default function ProfileLayout({ children, params: { slug } }) {
  const sidebarNavItems = [
    { title: 'Preview', href: `/${slug}` },
    { title: 'General', href: `/${slug}/general` },
    { title: 'Avatar', href: `/${slug}/avatar` },
    { title: 'Security', href: `/${slug}/security` },
    { title: 'Appearance', href: `/${slug}/appearance` },
  ];

  return (
    <div className="overflow-hidden my-8 rounded-[0.5rem]  sm:border bg-background sm:shadow">
      <div className="space-y-6 sm:p-10 sm:pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight capitalize">profile settings</h2>
          <p className="text-muted-foreground">Edit your profile settings and check seurity options.</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
