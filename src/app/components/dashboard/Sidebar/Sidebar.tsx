import Image from 'next/image';
import Link from 'next/link';
import { getUserServerSession } from '@/auth/actions/auth-actions';
import { IoAirplaneOutline, IoPersonOutline } from 'react-icons/io5';
import { LogoutButton } from './LogoutButton';
import { SidebarItem } from './SidebarItem';

const menuItems = [
  {
    icon: <IoAirplaneOutline size={30} />,
    title: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: <IoAirplaneOutline size={30} />,
    title: 'Flights',
    path: '/dashboard/flights',
  },
  {
    icon: <IoPersonOutline size={30} />,
    title: 'Admin',
    path: '/dashboard/profile',
  },
];

export const Sidebar = async () => {
  const user = await getUserServerSession();

  const infoSession = {
    email: user?.email || 'No user',
    name: user?.name || 'No user',
    image: user?.image || '',
    roles: user?.roles || [],
  };

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r  transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4 flex justify-center">
          <Link href="/" title="home">
            <Image
              src="/aairline.png"
              width={150}
              height={150}
              alt="airline logo"
              priority
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={infoSession.image}
            width={50}
            height={50}
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            alt=""
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-black lg:block">
            {infoSession.name}
          </h5>
          <span className="hidden text-gray- lg:block capitalize">
            {infoSession.roles.join(', ')}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
};
