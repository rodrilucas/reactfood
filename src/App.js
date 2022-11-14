import { Fragment, useState } from "react";

import Header from "./Layout/Header";
import Meals from "./Meals/Meals";
import Cart from "./Cart/Cart";

function App() {

  const [cartIsShow, setCartIsShow] = useState(false);

  const showCartHanlder = () => {
    setCartIsShow(true);
  };

  const hideCartHandler = () => {
    setCartIsShow(false);
  };

  return (
    <Fragment>
      {cartIsShow && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHanlder}/>
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
