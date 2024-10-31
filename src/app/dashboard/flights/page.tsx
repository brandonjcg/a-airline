import { columns } from './columns';
import { DataTable } from '../../components';

export default async function Flights() {
  return (
    <>
      <DataTable
        columns={columns}
        url={'../api/flight'}
        query={{ isMainTable: false }}
        requiredPagination={true}
      />
    </>
  );
}
