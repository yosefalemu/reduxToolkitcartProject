import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import CartContainer from "./components/cartContainer";
import { calculateTotal, getCartItems } from "./features/cart/cartSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);
  useEffect(() => {
    dispatch(getCartItems());
  }, []);
  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
