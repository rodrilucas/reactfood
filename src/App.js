import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {

  const [cartIsShow, setCartIsShow] = useState(false);

  const showCartHanlder = () => {
    setCartIsShow(true);
  };

  const hideCartHandler = () => {
    setCartIsShow(false);
  };

  return (
    <CartProvider>
      {cartIsShow && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHanlder}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
