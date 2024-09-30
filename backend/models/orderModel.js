const knex = require("knex")(require("../knexfile").development);

async function createOrder(order) {
  const { date, id, items, time, totalPrice, user_id } = order;

  const itemsJson = JSON.stringify(items);

  return knex("orders").insert({
    date,
    id,
    items: itemsJson,
    time,
    totalPrice,
    user_id,
  });
}

async function getAllOrders(isLoggedIn, userId) {
  console.log("isLoggedIn:", isLoggedIn);
  console.log("userId:", userId);

  if (isLoggedIn) {
    // Fetch orders for logged-in users
    const orders = await knex("orders").where({ user_id: userId }).select("*");
    console.log("Fetched orders for logged-in user:", orders);
    return orders;
  } else {
    // Fetch orders for logged-in guests
    const orders = await knex("orders").where({ user_id: null }).select("*");
    console.log("Fetched orders for guests:", orders);
    return orders;
  }
}

async function getOrderById(id) {
  return await knex("orders").where({ id }).first();
}

module.exports = { createOrder, getAllOrders, getOrderById };
