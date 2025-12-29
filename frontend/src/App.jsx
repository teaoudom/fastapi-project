import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const API = `${import.meta.env.VITE_API_URL}/items`;

export default function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", price: "" });

  const loadItems = async () => {
    const res = await axios.get(API);
    setItems(res.data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const submit = async () => {
    if (!form.name || !form.price) return;

    if (form.id) {
      await axios.put(`${API}/${form.id}`, {
        name: form.name,
        price: Number(form.price),
      });
    } else {
      await axios.post(API, {
        name: form.name,
        price: Number(form.price),
      });
    }

    setForm({ id: null, name: "", price: "" });
    loadItems();
  };

  const edit = (item) => setForm(item);
  const remove = async (id) => {
    await axios.delete(`${API}/${id}`);
    loadItems();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",      // full screen this is testing
        display: "flex",
        justifyContent: "center", // horizontal center
        alignItems: "center",     // vertical center
        bgcolor: "#f0f0f0",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          width: { xs: "90%", sm: 500 },
        }}
      >
        {/* Input Form */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" align="center" gutterBottom>
            {form.id ? "Edit Item" : "Add Item"}
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={submit}>
            {form.id ? "Update" : "Create"}
          </Button>
        </Paper>

        {/* Table */}
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {items.map((i) => (
                <TableRow key={i.id}>
                  <TableCell align="center">{i.id}</TableCell>
                  <TableCell align="center">{i.name}</TableCell>
                  <TableCell align="center">{i.price}</TableCell>
                  <TableCell align="center">
                    <Button size="small" onClick={() => edit(i)}>
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => remove(i.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
}
