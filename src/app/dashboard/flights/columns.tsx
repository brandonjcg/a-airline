'use client';

import { ColumnDef } from '@tanstack/react-table';
import { IFlight } from '@/models/Flight';
import { ISeed, IUser } from '@/models';
import { formatDate } from '../../common';

export const columns: ColumnDef<IFlight>[] = [
  {
    accessorKey: 'originCode',
    header: 'Origin code',
  },
  {
    accessorKey: 'departureTime',
    header: 'Departure time',
    cell: ({ getValue }) => formatDate(getValue()),
  },
  {
    accessorKey: 'destinationCode',
    header: 'Destination code',
  },
  {
    accessorKey: 'arrivalTime',
    header: 'Arrival time',
    cell: ({ getValue }) => formatDate(getValue()),
  },
  {
    accessorKey: 'codeFlight',
    header: 'Flight code',
  },
  {
    accessorKey: 'gate',
    header: 'Gate',
  },
  {
    accessorKey: 'pilots',
    header: 'Pilots',
    cell: ({ getValue }) => {
      const pilots = getValue() as IUser[];
      if (!pilots.length) return 'John Smith';

      return pilots.map((pilot) => pilot.name).join(', ');
    },
  },
  {
    accessorKey: 'status',
    header: 'Rating',
    cell: ({ getValue }) => {
      const row = getValue() as ISeed;
      return (
        <div className="" style={{ backgroundColor: row.color! }}>
          <span className="ms-3">{row.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      // const flight = row.original as IFlightsAdmin;
      // const isEditable = flight.isDeleteable;

      return (
        <button
          onClick={() => {
            // TODO: delete
            alert(`Deleting... ${row.original._id}`);
          }}
          className="btn btn-danger"
        >
          Delete
        </button>
      );
    },
  },
];
