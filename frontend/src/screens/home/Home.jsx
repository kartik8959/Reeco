import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faPrint, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Badge, Button, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";

import {
    useGetOrdersQuery,
    useAddItemMutation,
    useUpdateItemMutation,
} from "../../slices/ordersApiSlice";
import Loader from "../../components/loader/Loader";
import OrderInfo from "../../components/orders/orderInfo";
import OrderSummary from "../../components/orders/orderSummary";
import AddProductPopup from "../../components/orders/AddProduct";
import ProductMissingModal from "../../components/orders/missingItemPopup";
import { setOrders } from "../../slices/orderSlice";
import EditOrderModal from "../../components/orders/EditOrderItem";

const Home = () => {
    // State variables
    const [show, setShow] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showProductMissingModal, setShowProductMissingModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState();

    const dispatch = useDispatch();

    // Fetch orders using RTK query
    const { data: orders, isLoading, refetch, error } = useGetOrdersQuery();

    // Mutation functions for adding and updating items
    const [ addItem ] = useAddItemMutation();
    const [ updateItem ] = useUpdateItemMutation();

    const handleCreateItem = async (item) => {
        await addItem(item);
        refetch();
    };

    const handleShow = () => setShow(true);
    const handleModalClose = () => setShow(false);
    const handleShowItemMissingModal = () => setShowProductMissingModal(true);
    const handleCloseItemMissingModal = () => setShowProductMissingModal(false);
    const handleShowEditPopup = () => setShowEditPopup(true);
    const handleCloseEditPopup = () => setShowEditPopup(false);

    const handleApproval = async (index) => {
        const orderToUpdate = orders.find((order) => order.id === index);
        if (orderToUpdate) {
            let updatedItem = { ...orderToUpdate, status: "Approved" };
            await updateItem(updatedItem);
            refetch();
        }
    };

    // Handle user choice for missing item
    const handleUserChoice = async (choice) => {
        const orderToUpdate = orders.find((order) => order.id === selectedProduct.id);
        if (orderToUpdate) {
            let updatedItem;
            if (choice) {
                updatedItem = { ...orderToUpdate, status: "Missing-Urgent" };
            } else {
                updatedItem = { ...orderToUpdate, status: "Missing" };
            }
            await updateItem(updatedItem);
            refetch();
        }
    };

    // Handle missing item
    const handleMissingItem = (orderItem) => {
        setShowProductMissingModal(true);
        setSelectedProduct(orderItem);
    };

    // Handle editing an item
    const handleEditItem = (selectedOrder) => {
        setSelectedProduct(selectedOrder);
        handleShowEditPopup();
    };

    // Handle submitting edited item
    const handleSubmitEditItem = async (item) => {
        await updateItem(item);
        refetch();
    };

    const getBadgeInfo = (status) => {
        switch (status) {
            case "Approved":
                return { variant: "success", text: "Approved" };
            case "Missing":
                return { variant: "warning", text: "Missing" };
            case "Missing-Urgent":
                return { variant: "danger", text: "Missing-Urgent" };
            default:
                return { variant: "", text: "" };
        }
    };

    // Dispatch orders to Redux store
    useEffect(() => {
        if (!isLoading && !error && orders) {
            dispatch(setOrders(orders));
        }
    }, [dispatch, isLoading, error, orders]);

    const filteredData = () => {
        if (searchQuery === '') {
            return orders;
        } else {
            return orders.filter((order) =>
                order.product_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
    };

    return (
        isLoading ? (
            <Loader />
        ) : error ? (
            console.log(error)
        ) : (
            <>
                <OrderInfo />
                <OrderSummary />
                <AddProductPopup
                    onCreate={handleCreateItem}
                    handleShow={handleShow}
                    isShow={show}
                    handleModalClose={handleModalClose}
                />
                <EditOrderModal
                    isShow={showEditPopup}
                    handleClose={handleCloseEditPopup}
                    order={selectedProduct}
                    handleSubmitEditItem={handleSubmitEditItem}
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
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            { filteredData().map((order) => (
                                <tr key={order.id}>
                                    <td>
                                        <Row className="d-flex align-items-center mt-2">
                                            <Col md={4}>
                                                <img src={order.image} className="img-fluid mr-2 rounded w-75" alt={order.product_name} style={{ maxWidth: '60px', maxHeight: '60px' }} />
                                            </Col>
                                            <Col md={6}>
                                                <span>{order.product_name}</span>
                                            </Col>
                                        </Row>
                                    </td>
                                    <td>{order.brand}</td>
                                    <td>{order.price}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.total}</td>
                                    <td width={250}>
                                        <>
                                            <Badge bg={getBadgeInfo(order.status).variant}>
                                                {getBadgeInfo(order.status).text}
                                            </Badge>                     
                                             <div className="d-flex align-items-center justify-content-center">
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className={`${order.status === "Approved" ? 'text-success' : 'text-secondary'} p-2`}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleApproval(order.id)}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faTimes}
                                                    className={`${order.status === "Missing" ? 'text-warning' : order.status === "Missing-Urgent" ? 'text-danger' : 'text-secondary'} p-2`}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleMissingItem(order)}
                                                />
                                                <Button variant="link" className="p-2" onClick={() => handleEditItem(order)}>Edit</Button>
                                            </div>
                                        </>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            </>
        )
    );
};

export default Home;
