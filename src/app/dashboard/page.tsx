import { columns } from './columns';
import { DataTable } from '../components';

export default async function Dashboard() {
  return (
    <>
      <DataTable
        columns={columns}
        requiredPagination={false}
        url={'../api/flight'}
        isAutoRefreshEnabled={true}
      />
    </>
  );
}
