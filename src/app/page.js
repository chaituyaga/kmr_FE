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
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showStocks, setShowStocks] = useState(false);
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    var user = localStorage.getItem("user");
    if (!user) router.push("/login");
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "sno",
        header: "S. No.",
      },
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
        accessorKey: "packsQuantity",
        header: "Packs Quantity",
      },
      {
        accessorKey: "freeQty",
        header: "Free Quantity",
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

  return (
    <main>
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
                options={[]}
                inputLabel="Brands..."
              />
              <AutoCompleteMultiple
                placeholder="Select Types"
                options={[]}
                inputLabel="Types..."
              />
            </Box>
            <Box>
              <MrtTable columns={columns} data={data} />
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}
