import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Comida deliciosa, entregamos até você</h2>
      <p>
        Escolha a sua refeição preferida da nossa vasta seleção de refeições disponíveis e desfrute de um delicioso almoço ou jantar em casa.
      </p>
      <p>
        Todas as nossas refeições são preparadas com ingredientes de alta qualidade, just-in-time e, claro, por chefs experientes!
      </p>
    </section>
  );
};

export default MealsSummary;