'use strict';
const pool = require('./pool');

class Interface {
  constructor(table) {
    this.table = table;
  }

  read(queue_id, barber_id, client_id) {
    //get one queue for one barber
    if (queue_id) {
      return pool.query(`SELECT * FROM ${this.table} WHERE id=$1,;`, [queue_id]);
    } else if (barber_id) {
      //get all queues for one barber

      // barber_id: 1,
      // client_id: 2,
      // estimated_time: '30',
      // phone_num: '056232450',
      // price: 67,
      // profile_pic: '/images/profilePics/male.jpg',
      // service_id: 4,
      // service_name: 'gjjjjjjjjjjjjjjjjjjjj',
      // time: '11:10',
      // user_name: 'mahmoud Al Akhdar',
      // working_hours: '08:00 AM - 7:00 PM',

      const sql = `SELECT barber.working_hours,${this.table}.id,${this.table}.barber_id, ${this.table}.time, client.profile_pic, client.user_name, client.phone_num,services.service_name, services.price, services.estimated_time,services.id as service_id,client.id as client_id
      FROM ${this.table}
      INNER JOIN client ON client.id=${this.table}.client_id 
      INNER JOIN services ON services.id=${this.table}.service_id 
      INNER JOIN barber ON barber.id=${this.table}.barber_id 
      
      WHERE ${this.table}.barber_id =$1;`;

      // `SELECT * FROM ${this.table} WHERE barber_id =$1;`
      return pool.query(sql, [barber_id]);
    } else if (client_id) {
      //get all queues for one client
      return pool.query(`SELECT * FROM ${this.table} WHERE client_id = $1,;`, [client_id]);
    } else {
      //get all queues for all barbers for all clients
      return pool.query(`SELECT * FROM ${this.table};`);
    }
  }

  delete(queue_id, barber_id, client_id) {
    if (queue_id) {
      //delete one queue for one barber
      return pool.query(`DELETE FROM ${this.table} WHERE id=$1 RETURNING *;`, [queue_id]);
    } else if (barber_id) {
      //delete all queues for one barber

      return pool.query(`DELETE FROM ${this.table} WHERE barber_id=$1 RETURNING *;`, [barber_id]);
    } else if (client_id) {
      //delete all queues for one client
      return pool.query(`DELETE FROM ${this.table} WHERE client_id=$1 RETURNING *;`, [client_id]);
    }
  }
}

module.exports = Interface;
