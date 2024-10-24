export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getSeeds } from '@/app/seeds/actions';
import { getUserServerSession } from '@/auth/actions/auth-actions';
import { ISeed } from '@/models';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rest ToDos',
  description: 'Listado de ToDos',
};

export default async function RestTodos() {
  const user = await getUserServerSession();
  if (!user) return null;

  const data = (await getSeeds()) as ISeed[];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {data.map((product) => (
        <div
          key={product._id}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="p-4">
            <span className="block text-gray-700 font-bold text-xl">
              {product.name}
            </span>
            <span className="block text-gray-500 text-sm">
              {product.collectionName}
            </span>
            <span className="block text-gray-500 text-sm">{product.color}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
