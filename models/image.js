////////////
// IMAGE MODEL TO HANDLE DATA
////////////
const squel = require('squel').useFlavour('mysql');
const uuid = require('uuid');
const moment = require('moment');

const db = require('../config/db.js');

// INITIALIZE TABLE
// This query starts when app starts before any requests
db.query(`create table if not exists images (
  id varchar(50),
  url varchar(100),
  title varchar(100),
  description varchar(500),
  createdAt timestamp
)`, err => {
  if (err) {
    console.log('TABLE CREATE ERROR: ', err);
  }
});

// READ ALL
exports.getAll = function() {
  return new Promise((resolve, reject) => {
    //SELECT * FROM Images
    let sql = squel.select().from('images').toString();
    // Pass SQL string into query
    db.query(sql, (err, images) => {
      if (err) {
        reject(err);
      } else {
        resolve(images);
      }
    });
  });
}

exports.create = function(newImage) { //newImage will be an object created by UI
  return new Promise((resolve, reject) => {
    let timestamp = moment().format('YYYY/MM/DD HH:mm:ss');

    let sql = squel.insert()
                    .into('images')
                    .setFields(newImage)
                    .set('id', uuid())
                    .set('createdAt', timestamp)
                    .toString();
    db.query(sql, err => { // INSERT INTO query will not return anything
      if (err) {
        reject (err);
      } else {
        resolve(); // No information requested, so can resolve without returning anything
      }
    });
  });
};
