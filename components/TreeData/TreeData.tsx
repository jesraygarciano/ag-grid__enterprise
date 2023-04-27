import { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ServerSideRowModelModule } from "ag-grid-community";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  ColDef,
  GetDataPath,
  GridReadyEvent,
  IServerSideDatasource,
  IServerSideGetRowsParams,
} from "ag-grid-community";
import { getData } from "./data";

const TreeData = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "600px" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  // const [rowData, setRowData] = useState<any[]>(getData());
  // const [rowData, setRowData] = useState<any[]>(null);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "商材名" },
    { field: "ジャンル" },
    { field: "再生回数" },
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
    };
  }, []);

  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      headerName: "管理番号",
      minWidth: 300,
      cellRendererParams: {
        suppressCount: true,
      },
    };
  }, []);

  const getDataPath = useMemo<GetDataPath>(() => {
    return (data: any) => {
      if (Array.isArray(data.controlNumber)) {
        return data.controlNumber;
      } else {
        return [data.controlNumber];
      }
    };
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setQuickFilter(
      (document.getElementById("filter-text-box") as any).value
    );
  }, []);

  const serverSideDatasource: IServerSideDatasource = {
    getRows: (params: IServerSideGetRowsParams) => {
      // Add logic to fetch data from the server as required
      // For this example, we'll use the getData function
      const data = getData();
      params.api.setRowData(data);
    },
  };

  const onGridReady = useCallback((event: GridReadyEvent) => {
    event.api.setServerSideDatasource(serverSideDatasource);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: "5px" }}>
          <input
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={onFilterTextBoxChanged}
          />
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            // rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            treeData={true}
            animateRows={true}
            groupDefaultExpanded={-1}
            getDataPath={getDataPath}
            onGridReady={onGridReady}
            modules={[ServerSideRowModelModule]}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default TreeData;
