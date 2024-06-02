"use client";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AutoCompleteMultiple from "./componenets/AutoCompleteMultiple";
import MrtTable from "./componenets/MrtTable";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { getAllStocks } from "./services/slices/stockSlice";
import _ from "lodash";

export default function Home() {
  const [showStocks, setShowStocks] = useState(false);
  const [brandsData, setBrandsData] = useState([]);
  const [typesData, setTypesData] = useState([]);
  const [data, setData] = useState([]);
  const [filterObj, setFilterObj] = useState({});
  const [tableOriginalData, setTableOriginalData] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    var user = localStorage.getItem("user");
    if (!user) router.push("/login");
    dispatch(getAllStocks()).then((res) => {
      setData(res.payload.data.body);
      setTableOriginalData(res.payload.data.body);
      const brands = _.uniq(res.payload.data.body.map((i) => i.BRAND)) || [];
      const types = _.uniq(res.payload.data.body.map((i) => i.TYPE)) || [];
      setBrandsData(brands);
      setTypesData(types);
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "BRAND",
        header: "Brand",
      },
      {
        accessorKey: "TYPE",
        header: "Type",
      },
      {
        accessorKey: "PACK",
        header: "Pack",
      },
      {
        accessorKey: "QUANTITY",
        header: "Available Quantity",
      },
      {
        accessorKey: "MRP",
        header: "MRP",
      },
      {
        accessorKey: "BUYING_PRICE",
        header: "Buying Price",
      },
    ],
    []
  );

  const onChange = (value, type) => {
    let obj = _.cloneDeep(filterObj);
    obj[type] = value;
    if (!obj[type].length) delete obj[type];
    let filteredData = _.filter(tableOriginalData, (o) =>
      _.every(obj, (value, key) => {
        if (Array.isArray(value)) {
          return value.includes(o[key]);
        } else {
          return o[key] === value;
        }
      })
    );
    setData(filteredData);
    setFilterObj(obj);
  };

  return (
    <Box className="mainApp">
      <Button
        color="success"
        variant="contained"
        sx={{ position: "absolute", bottom: 40, right: 50 }}
        onClick={() => setShowStocks(true)}
      >
        View Stocks
      </Button>
      {showStocks && (
        <Dialog open fullScreen>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Available Stocks
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setShowStocks(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Box sx={{ display: { xs: "block", md: "flex", lg: "flex" } }}>
              <AutoCompleteMultiple
                placeholder="Select Brands"
                options={brandsData}
                inputLabel="Brands..."
                onChange={(e, value) => onChange(value, "BRAND")}
              />
              <AutoCompleteMultiple
                placeholder="Select Types"
                options={typesData}
                inputLabel="Types..."
                onChange={(e, value) => onChange(value, "TYPE")}
              />
            </Box>
            <Box>
              <MrtTable columns={columns} data={data} />
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
}
