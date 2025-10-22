// import { CarResponse } from "../types";  table 태그에서는 data.map() 때문에 필요하지만, x-data-grid 사용 이후로는 필요 없기 때문에 주석 처리 했습니다.
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCars, deleteCar } from "../api/carapi";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Snackbar, IconButton } from "@mui/material";
import { useState } from "react";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

function Carlist() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient(); // 이거 추가하니깐 삭제 후 새로고침 됨

  const { data, error, isSuccess } = useQuery({
    // useState는 구조분해를 [] 배열로 하는데 이건 {} 이걸로 함
    // useState를 따로 선언하지 않았음.
    queryKey: ["cars"],
    queryFn: getCars, // 여기서 나온 값을 밑에 row=data로 씀
  });

  const { mutate } = useMutation(deleteCar, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ["cars"] }); // 이부분은 useQuery()를 정의한 부분과 관련이 있습니다.     // 이거 추가하니깐 삭제 후 새로고침 됨(재렌더링) 여기서 setOpen을 true로
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const columns: GridColDef[] = [
    { field: "brand", headerName: "Brand", width: 200 },
    { field: "model", headerName: "Model", width: 200 },
    { field: "color", headerName: "Color", width: 200 },
    { field: "registrationNumber", headerName: "Reg.nr", width: 150 },
    { field: "modelYear", headerName: "Model Year", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    {
      field: "edit",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => <EditCar cardata={params.row} />,
    },
    {
      field: "delete",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            if (
              // 이게 참이면 삭제하면 되겠군요. (삭제할 때 확인창 띄우기)
              window.confirm(
                `${params.row.brand}의 ${params.row.model} 자동차를 삭제하시겠습니까?`
              )
            ) {
              mutate(params.row._links.self.href);
            }
          }}
        >
          <DeleteForeverRoundedIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  if (!isSuccess) {
    return <span>Loading... 🔮</span>;
  }

  if (error) {
    return <span>자동차들을 불러오는 데 실패했습니다. 😱</span>;
  } else {
    return (
      // <table>
      //   <tbody>
      //     {data.map((car: CarResponse) => (
      //       <tr key={car._links.self.href}>
      //         <td>{car.brand}</td>
      //         <td>{car.model}</td>
      //         <td>{car.color}</td>
      //         <td>{car.registrationNumber}</td>
      //         <td>{car.modelYear}</td>
      //         <td>{car.price}</td>
      //       </tr>
      //     ))}
      //   </tbody>
      // </table>
      <>
        <AddCar />
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row._links.self.href} // JSON 파일 확인해야함
          slots={{ toolbar: GridToolbar }}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="선택한 자동차 정보가 삭제되었습니다. ⭐"
        />
      </>
    );
  }
}

export default Carlist;
