import { useEffect, useState } from "react";
import { faCheck, faPlus, faPrint, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Container, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useGetOrdersQuery, useAddItemMutation, useUpdateItemMutation } from "../../slices/ordersApiSlice"
import Loader from "../../components/loader/Loader";
import OrderInfo from "../../components/orders/orderInfo";
import OrderSummary from "../../components/orders/orderSummary";
import AddProductPopup from "../../components/orders/add-products/AddProduct";
import ProductMissingModal from "../../components/orders/missingItemPopup";
import { setOrders } from "../../slices/orderSlice";

const Home = () => {
    const [show, setShow] = useState(false);
    const [showProductMissingModal, setShowProductMissingModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState("");
    const dispatch= useDispatch();
    const { data: orders, isLoading, refetch, error } = useGetOrdersQuery();
    const [addItem, { isLoading: loadingAddOrder }] = useAddItemMutation();
    const [updateItem, { isLoading: loadingUpdateOrder }] = useUpdateItemMutation()
    const handleCreateItem = async (item) => {
        await addItem(item);
        refetch();
    }
    const handleShow = () => setShow(true);

    const handleModalClose = () => setShow(false);

    const handleShowItemMissingModal = () => setShowProductMissingModal(true);

    const handleCloseItemMissingModal = () => setShowProductMissingModal(false);

    const handleApproval = async (index) => {
        const orderToUpdate = orders.find((order) => order.id === index);
        if (orderToUpdate) {
            let updatedItem = { ...orderToUpdate, status: "Approved" };
            await updateItem(updatedItem);
            refetch();
        }
    };

    const handleMissingItem = async (orderItem) => {
        setShowProductMissingModal(true);
        setSelectedProduct(orderItem);
    }

    const handleUserChoice = async (choice) => {
        const orderToUpdate = orders.find((order) => order.id === selectedProduct.id);
        if (orderToUpdate) {
            let updatedItem;
            if (choice) {
                updatedItem = { ...orderToUpdate, status: "Missing-Urgent" };
            }
            else {
                updatedItem = { ...orderToUpdate, status: "Missing" };
            }
            await updateItem(updatedItem);
            refetch()
        }
    }

    useEffect(() => {
        if (!isLoading && !error && orders) {
            console.log("Dispatch orders", orders)
          // Dispatch the setOrders action to store initial orders
          dispatch(setOrders(orders));
        }
      }, [dispatch, isLoading, error, orders]);

    //     const filteredOrders = orders.filter((order) =>
    //     order.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    //   );
    return (
        isLoading ? (<Loader />) : error ? (console.log(error)) : (
            <>
                <OrderInfo />
                <OrderSummary />
                <AddProductPopup
                    onCreate={handleCreateItem}
                    handleShow={handleShow}
                    isShow={show}
                    handleModalClose={handleModalClose}
                />
                <ProductMissingModal
                    handleShowItemMissingModal={handleShowItemMissingModal}
                    handleClose={handleCloseItemMissingModal}
                    isShow={showProductMissingModal}
                    product={selectedProduct}
                    onUserChoice={handleUserChoice}
                />
                <Container className="p-0 border p-5 shadow-sm rounded my-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="input-group rounded w-25 border-right-0 ">

                            <input
                                type="text"
                                className="form-control rounded-start "
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <span className="input-group-text bg-white border-left-0">
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                        </div>
                        <div className="w-50 d-flex justify-content-end align-items-center">
                            <Button variant="success" className="me-2 rounded-pill" onClick={handleShow}>
                                <FontAwesomeIcon icon={faPlus} /> Add Item
                            </Button>
                            <FontAwesomeIcon icon={faPrint} className="mx-5 pointer" size="xl" />
                        </div>
                    </div>

                    <Table responsive striped bordered hover className="table-sm">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Brand</th>
                                <th>price</th>
                                <th>Quantity</th>
                                <th>total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.length > 0 &&
                                orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.product_name}</td>
                                        <td>{order.brand}</td>
                                        <td>{order.price}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.total}</td>
                                        <td width={250}>
                                            <>
                                                <Badge bg={order.status === "Approved" ? "success" : order.status === "Missing" ? "warning" : order.status === "Missing-Urgent" ? "danger" : ""}>{order.status === "Approved" ? "Approved" : order.status === "Missing" ? "Missing" : order.status === "Missing-Urgent" ? "Missing-Urgent" : ""}</Badge>
                                                <div>
                                                    <FontAwesomeIcon icon={faCheck}
                                                        className={`${order.status === "Approved" ? 'text-success' : 'text-secondary'} p-2`}
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => handleApproval(order.id)}
                                                    />
                                                    <FontAwesomeIcon icon={faTimes}
                                                        className={`${order.status === "Missing" ? 'text-warning' : order.status === "Missing-Urgent" ? 'text-danger' : 'text-secondary'} p-2`}
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => handleMissingItem(order)}
                                                    />
                                                </div>
                                            </>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Container>
            </>
        )
    )
}

export default Home;