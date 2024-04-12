import { pool } from "../database/connection.js";

class CoffeeProductModel {

  static async getAllCoffeeProducts () {
    const { rows } = await pool.query('SELECT * FROM coffee_products');
    console.log(rows)
    return rows

  }

}


CoffeeProductModel.getAllCoffeeProducts()


