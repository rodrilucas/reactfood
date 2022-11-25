import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 8;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    address: true,
    city: true,
    postal: true,
  });

  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFiveChars(enteredPostal);

    setFormInputValidity({
      name: enteredNameIsValid,
      address: enteredAddressIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredAddressIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      city: enteredCity,
      postal: enteredPostal
    })
  };

  const classesControl = (inputType) => {
    if (!inputType) {
      return `${classes.control} ${classes.invalid}`;
    } else {
      return classes.control;
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classesControl(formInputValidity.name)}>
        <label htmlFor="name">Nome</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Por favor digite um nome válido!</p>}
      </div>
      <div className={classesControl(formInputValidity.address)}>
        <label htmlFor="endereco">Endereço</label>
        <input type="text" id="endereco" ref={addressInputRef} />
        {!formInputValidity.address && (
          <p>Por favor digite um endereço válido!</p>
        )}
      </div>
      <div className={classesControl(formInputValidity.postal)}>
        <label htmlFor="cep">Cep</label>
        <input type="address" id="cep" ref={postalInputRef} />
        {!formInputValidity.postal && <p>Por favor digite um cep válido!</p>}
      </div>
      <div className={classesControl(formInputValidity.city)}>
        <label htmlFor="cidade">Cidade</label>
        <input type="text" id="cidade" ref={cityInputRef} />
        {!formInputValidity.city && <p>Por favor digite uma cidade válida!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
