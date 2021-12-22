import { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import type { RowData } from './create-row-data-stream';
import { createRowDataStream } from './create-row-data-stream';

export const Grid = (): JSX.Element => {
  const [{ rows, version }, setRowData] = useState<RowData>({
    rows: [],
    version: -1
  });

  useEffect(() => {
    const subscription = createRowDataStream(40, 2000).subscribe((data) => setRowData(data));
    return () => subscription.unsubscribe();
  }, [])

  return (
    <>
      <span>
        <strong>Data version:</strong> {version}
      </span>
      <AgGridReact className="ag-theme-alpine" rowData={rows}>
        <AgGridColumn field="id" />
        <AgGridColumn field="name" />
        <AgGridColumn field="dob" />
        <AgGridColumn field="random" />
      </AgGridReact>
    </>
  );
};
