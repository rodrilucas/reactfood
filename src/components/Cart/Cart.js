import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import React from "react";

const Cart = (props) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmitting, setDidSubmit] = useState(false);
  const [httpError, setHttpError] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = `R$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckingOut(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_FIRE_BASE}`, {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
    } catch (e) {
      setIsSubmitting(false);
      setHttpError(e.message);
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Fechar
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Pedido
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Preço total:</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckingOut && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckingOut && modalActions}
    </React.Fragment>
  );

  const submmitingError = <p>{httpError}</p>;
  const isSubmmitingModalContent = <p>Enviando pedido...</p>;
  const didSubmittingModalContent = (
    <React.Fragment>
      <p>Pedido enviado com sucesso!</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Fechar
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClick={props.onClose}>
      {!isSubmitting && !didSubmitting && cartModalContent}
      {isSubmitting && isSubmmitingModalContent}
      {!isSubmitting && didSubmitting && didSubmittingModalContent}
      {!isSubmitting && httpError && submmitingError}
    </Modal>
  );
};

export default Cart;
