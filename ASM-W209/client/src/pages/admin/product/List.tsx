import {
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDialog from "src/components/ConfirmDialog";
import { FlashDelete } from "src/components/Flash";
import { useLoading } from "src/contexts/loading";
import { Product } from "src/types/Product";
import Pagination from "@mui/material/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminProductList() {
  const { setLoading } = useLoading();
  const [showFlash, setShowFlash] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of products per page

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Error: ${error.response?.data?.message || error.message}`);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleConfirm = (id: string) => {
    setConfirm(true);
    setIdDelete(id);
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/products/" + idDelete);
      //////show lash
      // setShowFlash(true);
      // setTimeout(() => {
      //   setShowFlash(false);
      // }, 2000);
      toast.success("Successfully deleted product");
      getAllProduct();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Error: ${error.response?.data?.message || error.message}`);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  // Calculate the range of products to display based on current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <>
      <ToastContainer />
      {/* <FlashDelete isShow={showFlash} /> */}

      <Stack gap={2} sx={{ padding: "20px" }}>
        <Typography variant="h3" textAlign="center">
          PRODUCT LIST
        </Typography>
        <Link to="/admin/product/add">
          <Button variant="contained">PRODUCT ADD</Button>
        </Link>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>TITLE</TableCell>
                <TableCell align="right">PRICE</TableCell>
                <TableCell align="right">DESC</TableCell>
                <TableCell align="right">IMAGE</TableCell>
                <TableCell align="right">CATEGORY</TableCell>
                <TableCell align="right">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentProducts.map((product, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.title}
                  </TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                  <TableCell align="right">{product.description}</TableCell>
                  <TableCell align="right">
                    <img src={product.image} width={100} alt="" />
                  </TableCell>
                  <TableCell align="right">{product.category.name}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" gap={3} justifyContent="center">
                      <Link to={`/admin/product/edit/${product._id}`}>
                        <Button variant="contained" sx={{ bgcolor: "blue" }}>
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "red" }}
                        onClick={() => handleConfirm(product._id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={Math.ceil(products.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
          sx={{ marginTop: "20px", alignSelf: "center" }}
        />
      </Stack>
      <ConfirmDialog
        confirm={confirm}
        onConfirm={setConfirm}
        onDelete={handleDelete}
      />
    </>
  );
}

export default AdminProductList;
