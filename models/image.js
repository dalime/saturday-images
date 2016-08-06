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

exports.getOne = function(id) {
  return new Promise((resolve, reject) => {
    let sql = squel.select()
                    .from('images')
                    .where('id = ?', id)
                    .toString();

    db.query(sql, (err, images) => {
      let image = images[0];
      if (err) {
        reject(err);
      } else if (!image) {
        reject({error: 'Image not found.'});
      } else {
        resolve(image);
      }
    });
  })
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

exports.delete = function(id) {
  return new Promise((resolve, reject) => {
    let sql = squel.delete()
                    .from('images')
                    .where('id = ?', id)
                    .toString();

    db.query(sql, (err, result) => {
      if (result.affectedRows === 0) {
        reject({error: 'Image not found.'})
      } else if (err) {
        reject(err)
      } else {
        resolve();
      }
    });
  });
};

exports.update = function(id, updateObj) {
  return new Promise((resolve, reject) => {
    delete updateObj.id;
    delete updateObj.createdAt;
    let sql = squel.update()
                    .table('images')
                    .setFields(updateObj)
                    .where('id = ?', id)
                    .toString();

    db.query(sql, (err, status) => {
      if (status.affectedRows === 0) {
        reject({error: 'Image not found.'})
      } else if (err) {
        reject(err)
      } else {
        resolve();
      }
    });
  });
};
