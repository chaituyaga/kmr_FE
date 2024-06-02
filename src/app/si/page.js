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
import { Close, Save } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  addStocks,
  addSupplier,
  getAllSuppliers,
} from "../services/slices/stockSlice";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import _ from "lodash";

const filter = createFilterOptions();

export default function FreeSoloCreateOptionDialog() {
  const [value, setValue] = useState(null);
  const [open, toggleOpen] = useState(false);
  const [suppliersData, setSuppliersData] = useState([]);
  const [dialogValue, setDialogValue] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [tableData, setTableData] = useState([]);
  const [invNumInp, setInvNumInp] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        accessorKey: "BRAND",
        header: "Brand",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.brand,
          helperText: validationErrors?.brand,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              brand: undefined,
            }),
        },
      },
      {
        accessorKey: "TYPE",
        header: "Type",
        editVariant: "select",
        editSelectOptions: [
          "Chitti Mutyalu",
          "Sona masoori",
          "Pusa",
          "Krishna Hamsa",
          "Triguna",
          "Keshava",
          "Swathi",
          "Vedagiri",
          "Maruteru Sannalu",
          "Cottondora Sannalu",
          "Bharani",
          "Deepti",
          "Srikakulam Sannalu",
          "Vasundhara",
          "Early Samba",
          "Surya",
          "Tholakari",
          "Godavari",
          "Shanthi",
          "Indra",
          "Sree Kurma",
          "Aarkalu",
          "Swarna",
          "Samba",
          "Sampada",
          "Amara",
          "Sri Dhruthi",
          "Tarangini",
          "Bheema",
          "Chandra",
          "Pushyami",
          "Prabhat",
          "Sujatha",
          "Maruteru Samba",
          "Maruteru Mahsuri",
          "Sravani",
          "Samba masuri",
          "Gidda masuri",
          "Vijaya masuri",
          "Tella Masuri",
          "Jeelakara Masuri",
          "Molagolukulu",
          "Jeelakara Sannalu",
        ],
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.type,
          helperText: validationErrors?.type,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              type: undefined,
            }),
        },
      },
      {
        accessorKey: "PACK",
        header: "Pack",
        editVariant: "select",
        editSelectOptions: ["25s", "50s"],
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.pack,
          helperText: validationErrors?.pack,
        },
      },
      {
        accessorKey: "QUANTITY",
        header: "Quantity",
        muiEditTextFieldProps: {
          type: "number",
          required: true,
          error: !!validationErrors?.quantity,
          helperText: validationErrors?.quantity,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              quantity: undefined,
            }),
        },
      },
      {
        accessorKey: "MRP",
        header: "MRP",
        muiEditTextFieldProps: {
          type: "number",
          required: true,
          error: !!validationErrors?.MRP,
          helperText: validationErrors?.MRP,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              MRP: undefined,
            }),
        },
      },
      {
        accessorKey: "BUYING_PRICE",
        header: "Price",
        muiEditTextFieldProps: {
          type: "number",
          required: true,
          error: !!validationErrors?.price,
          helperText: validationErrors?.price,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              price: undefined,
            }),
        },
      },
    ],
    [validationErrors]
  );

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = () => {
    dispatch(getAllSuppliers())
      .then((res) => {
        setSuppliersData(res.payload.data.body);
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
    dispatch(addSupplier(dialogValue)).then((res) => {
      fetchSuppliers();
      handleClose();
    });
  };
  const handleCreateRow = async ({ values, table }) => {
    let arr = _.cloneDeep(tableData);
    arr.push(values);
    setTableData(arr);
    table.setCreatingRow(null);
  };

  const handleSaveUser = async ({ values, table, row }) => {
    setTableData(() => {
      tableData[row.index] = row._valuesCache;
      return tableData;
    });
    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setTableData(() => {
        tableData[row.index] = "";
        return tableData.filter((i) => i);
      });
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: tableData,
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
    onCreatingRowCancel: () => setValidationErrors({}),
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
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
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
        disabled={!value || !invNumInp}
      >
        Create New Row
      </Button>
    ),
  });

  const handleSaveAndClose = () => {
    if (!tableData.length) {
      alert("No Data Entered");
    } else {
      let obj = {
        SUPPLIER_NAME: value,
        INVOICE_NUMBER: invNumInp,
        DATA: tableData,
      };
      dispatch(addStocks(obj)).then((res) => {
        router.push("/");
      });
    }
  };

  return (
    <Box>
      <Card sx={{ position: "relative", top: "60px" }}>
        <CardHeader title="Stock Inward" />
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
              options={suppliersData}
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
                <TextField {...params} label="Select Supplier" required />
              )}
            />
            <TextField
              id="outlined-basic"
              label="Invoice Number"
              variant="outlined"
              onChange={(e) => setInvNumInp(e.target.value)}
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
