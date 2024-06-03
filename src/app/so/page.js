"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Close, Print, Save } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import {
  addCustomer,
  getAllCustomers,
  getAllStocks,
  updateStocks,
} from "../services/slices/stockSlice";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import _ from "lodash";
import DeleteIcon from "@mui/icons-material/Delete";

const filter = createFilterOptions();

export default function FreeSoloCreateOptionDialog() {
  const [value, setValue] = useState(null);
  const [open, toggleOpen] = useState(false);
  const [ddsData, setDDsData] = useState({});
  const [data, setData] = useState([]);
  const [qty, setQty] = useState("");
  const [mrp, setMRP] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [customersData, setCustomersData] = useState([]);
  const [dialogValue, setDialogValue] = useState("");
  const [stocksData, setStocksData] = useState([]);
  const [fObj, setFObj] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCustomers();
    fetchStocksData();
  }, []);

  const fetchStocksData = () => {
    dispatch(getAllStocks()).then((res) => {
      let results = res.payload.data.body;
      setStocksData(results);
      let brands = _.uniq(results.map((i) => i.BRAND));
      let types = _.uniq(results.map((i) => i.TYPE));
      let packs = _.uniq(results.map((i) => i.PACK));
      setDDsData({
        BRAND: brands,
        TYPE: types,
        PACK: packs,
      });
    });
  };

  const fetchCustomers = () => {
    dispatch(getAllCustomers())
      .then((res) => {
        setCustomersData(res.payload.data.body);
      })
      .catch((err) => {});
  };

  const handleClose = () => {
    setDialogValue("");
    toggleOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue(dialogValue);
    dispatch(addCustomer(dialogValue)).then((res) => {
      fetchCustomers();
      handleClose();
    });
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setData(() => {
        data[row.index] = "";
        return data.filter((i) => i);
      });
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "TYPE",
        header: "Type",
        editVariant: "select",
        editSelectOptions: ddsData["TYPE"],
        muiEditTextFieldProps: {
          required: true,
          onChange: (e) => {
            handleDataSelection(e.target.value, "TYPE");
          },
        },
      },
      {
        accessorKey: "BRAND",
        header: "Brand",
        editVariant: "select",
        editSelectOptions: ddsData["BRAND"],
        muiEditTextFieldProps: {
          required: true,
          onChange: (e) => {
            handleDataSelection(e.target.value, "BRAND");
          },
        },
      },
      {
        accessorKey: "PACK",
        header: "Pack",
        editVariant: "select",
        editSelectOptions: ddsData["PACK"],
        muiEditTextFieldProps: {
          select: true,
          onChange: (e) => {
            handleDataSelection(e.target.value, "PACK");
          },
        },
      },
      {
        accessorKey: "QUANTITY",
        header: "Quantity",
        muiEditTextFieldProps: {
          type: "number",
          required: true,
          placeholder: ddsData["qty"],
        },
      },
      {
        accessorKey: "MRP",
        header: "MRP",
        muiEditTextFieldProps: {
          type: "number",
          required: true,
          placeholder: `MRP - ${ddsData["mrp"]} BUY PRICE - ${ddsData["buyPrice"]}`,
        },
      },
    ],
    [ddsData]
  );

  const handleSaveUser = async ({ values, table, row }) => {
    // setTableData(() => {
    //   tableData[row.index] = row._valuesCache;
    //   return tableData;
    // });
    table.setEditingRow(null);
  };

  const handleCreateRow = async ({ values, table }) => {
    let arr = _.cloneDeep(data);
    arr.push(values);
    setData(arr);
    table.setCreatingRow(null);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    enablePagination: false,
    enableColumnFilters: false,
    enableDensityToggle: false,
    state: {
      density: "compact",
    },
    enableFullScreenToggle: false,
    enableGlobalFilter: false,
    enableHiding: false,
    enableColumnActions: false,
    getRowId: (row) => row.id,
    muiTableContainerProps: {
      sx: {
        minHeight: "44vh",
      },
    },
    onCreatingRowCancel: () => {
      let obj = _.cloneDeep(ddsData);
      delete obj["mrp"];
      delete obj["qty"];
      delete obj["buyPrice"];
      setDDsData(obj);
    },
    onCreatingRowSave: handleCreateRow,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New Row</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
        disabled={!value}
      >
        Create New Row
      </Button>
    ),
  });

  const handleDataSelection = (value, type) => {
    let obj = _.cloneDeep(ddsData);
    let filterObj = _.cloneDeep(fObj);
    if (type === "TYPE") {
      let brands = _.uniq(
        stocksData.filter((i) => i.TYPE === value).map((o) => o.BRAND)
      );
      obj["BRAND"] = brands;
      filterObj["TYPE"] = value;
    }
    if (type === "BRAND") {
      let packs = _.uniq(
        stocksData
          .filter((i) => i.BRAND === value && i.TYPE === filterObj["TYPE"])
          .map((o) => o.PACK)
      );
      obj["PACK"] = packs;
      filterObj["BRAND"] = value;
    }
    if (type === "PACK") {
      let resData = stocksData
        .filter(
          (i) =>
            i.BRAND === filterObj["BRAND"] &&
            i.TYPE === filterObj["TYPE"] &&
            i.PACK === value
        )
        .map((o) => o);
      let qty = 0;
      resData.forEach((i) => (qty = qty + Number(i.QUANTITY)));
      obj["qty"] = qty;
      obj["mrp"] = resData[0].MRP;
      obj["buyPrice"] = resData[0].BUYING_PRICE;
    }
    setFObj(filterObj);
    setDDsData(obj);
  };

  const handleSaveAndClose = () => {
    if (!data.length) {
      alert("No Data Entered");
    } else {
      const grpdData = _.chain(stocksData)
        .groupBy("SUPPLIER_NAME")
        .map((i) => ({
          SUPPLIER_NAME: i[0].SUPPLIER_NAME,
          INVOICE_NUMBER: i[0].INVOICE_NUMBER,
          DATA: i.map(({ order, ...o }) => o),
        }))
        .value();
      let BEARR = [];

      grpdData.forEach((i) => {
        i.DATA.forEach((o) => {
          data.forEach((e) => {
            if (
              e.BRAND === o.BRAND &&
              e.TYPE === o.TYPE &&
              e.PACK === o.PACK &&
              e.QUANTITY <= o.QUANTITY
            ) {
              o.QUANTITY = (Number(o.QUANTITY) - Number(e.QUANTITY)).toString();
              BEARR.push(i);
            }
          });
        });
        i.DATA = i.DATA.filter((o) => o.QUANTITY != 0);
      });

      BEARR.forEach((i) => {
        grpdData.forEach((o) => {
          if (o.INVOICE_NUMBER === i.INVOICE_NUMBER) i.DATA = o.DATA;
          i.DATA.forEach((e) => {
            delete e.SUPPLIER_NAME;
            delete e.INVOICE_NUMBER;
          });
        });
      });
      dispatch(updateStocks(BEARR)).then((res) => {
        router.push("/");
      });
    }
  };

  return (
    <Box>
      <Card sx={{ position: "relative", top: "60px" }}>
        <CardHeader title="Stock Outward" />
        <CardContent>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                if (
                  typeof newValue === "string" &&
                  newValue.startsWith("Add")
                ) {
                  setTimeout(() => {
                    toggleOpen(true);
                    setDialogValue(
                      newValue.replace("Add", "").replace(/"/g, "").trim()
                    );
                  });
                } else setValue(newValue);
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== "") {
                  filtered.push(`Add "${params.inputValue}"`);
                }

                return filtered;
              }}
              id="free-solo-dialog-demo"
              options={customersData}
              getOptionLabel={(option) => {
                if (typeof option === "string") {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              renderOption={(props, option) => <li {...props}>{option}</li>}
              sx={{ width: 300 }}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Select Customer" required />
              )}
            />
          </Box>
          <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
              <DialogTitle>Add a new Supplier</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Did you miss any supplier in our list? Please, add it!
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  value={dialogValue}
                  onChange={(event) => setDialogValue(event.target.value)}
                  label="Supplier Name"
                  type="text"
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add</Button>
              </DialogActions>
            </form>
          </Dialog>
          <MaterialReactTable table={table} />
          <Box>
            <BottomNavigation showLabels>
              {/* <BottomNavigationAction
                label="Save & Print"
                icon={<Print />}
                onClick={handleSaveAndClose}
              /> */}
              <BottomNavigationAction
                label="Save & Close"
                icon={<Save />}
                onClick={handleSaveAndClose}
              />
              <BottomNavigationAction
                label="Close"
                icon={<Close />}
                onClick={() => router.push("/")}
              />
            </BottomNavigation>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
