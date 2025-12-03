'use client';

import Image from 'next/image';
import {
  Home as HomeIcon,
  MessageSquare,
  BarChart3,
  MonitorSmartphone,
  Filter,
  Zap,
  Clapperboard,
  LibraryBig,
  Settings as SettingsIcon,
} from 'lucide-react';

interface SidebarLink {
  label: string;
  icon: React.ElementType;
  active?: boolean;
}

interface AppSidebarProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function AppSidebar({ open, onOpen, onClose }: AppSidebarProps) {
  // Sidebar links
  const primaryLinks: SidebarLink[] = [
    { label: 'Home', icon: HomeIcon, active: true },
    { label: 'Responses', icon: MessageSquare },
    { label: 'Analytics', icon: BarChart3 },
  ];
  const secondaryLinks: SidebarLink[] = [
    { label: 'Landing Pages', icon: MonitorSmartphone },
    { label: 'Funnels', icon: Filter },
    { label: 'Automations', icon: Zap },
    { label: 'Clips', icon: Clapperboard },
    { label: 'My Library', icon: LibraryBig },
    { label: 'Settings', icon: SettingsIcon },
  ];

  const renderLinks = (links: SidebarLink[]) => (
    <div className="space-y-2">
      {links.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            className={`
              flex items-center gap-3 px-4 py-2 text-sm w-full rounded-full
              transition
              ${
                item.active
                  ? 'bg-primarymuted text-primary font-semibold'
                  : 'text-primary hover:bg-gray-100'
              }
            `}
          >
            <Icon size={18} />
            {item.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* ------------ MOBILE MENU BUTTON ------------ */}
      <button
        onClick={onOpen}
        className={`md:hidden absolute top-4 right-4 z-30 bg-white p-4 aspect-square rounded-full flex items-center justify-center border transition-opacity duration-200 ${
          open ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Image
          src="/images/profile.svg"
          alt="Menu"
          width={15}
          height={15}
        />
      </button>
      {/* ------------ DESKTOP ------------ */}
      <div className="w-[200px] hidden md:flex flex-col bg-white rounded-r-lg p-4 gap-4">
        <div className='flex gap-2 items-center'>
          <div className='h-12 aspect-square bg-primary/15 rounded-full bg-primarymuted flex items-center justify-center font-bold text-primary'>
            LR
          </div>
          <p className='text-primary text-base/5'>
            Laura<br />
            Roberts
          </p>
        </div>
        <div className='flex-1'>
          {renderLinks(primaryLinks)}
        </div>
        <div>
          {renderLinks(secondaryLinks)}
        </div>
        <div className='px-4'>
          <Image
            src="/images/logo.svg"
            alt="Lawbrokr"
            width={97}
            height={19}
          />
        </div>
      </div>
      {/* ------------ MOBILE ------------ */}
      <div
        className={`
          fixed inset-y-0 left-0 w-[200px] bg-white z-40 transform
          transition-transform duration-300
          flex flex-col justify-between
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:hidden
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl"
        >
          ✕
        </button>
        <div className="p-4 space-y-6 flex-1 flex">
          <div className='flex-1 flex flex-col gap-4'>
            <div className='flex gap-2 items-center'>
              <div className='h-12 aspect-square bg-primary/15 rounded-full bg-primarymuted flex items-center justify-center font-bold text-primary'>
                LR
              </div>
              <p className='text-primary text-base/5'>
                Laura<br />
                Roberts
              </p>
            </div>
            <div className='flex-1'>
              {renderLinks(primaryLinks)}
            </div>
            <div>
              {renderLinks(secondaryLinks)}
            </div>
            <div className='px-4'>
              <Image
                src="/images/logo.svg"
                alt="Lawbrokr"
                width={97}
                height={19}
              />
            </div>
          </div>
        </div>
      </div>
      {/* ------------ BACKDROP ------------ */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
        />
      )}
    </>
  );
}
