const { promises } = require("fs");

const db = require("../dbconnector/connection");

module.exports = {
  ir1: (name) => {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT
        (CASE WHEN ir1value.flag = 'false' THEN ir1value.date END) AS ir1date,
        (CASE WHEN ir2value.flag = 'false' THEN ir2value.date END) AS ir2date
      FROM ir1value
      INNER JOIN ir2value ON ir1value.date = ir2value.date
      WHERE ir1value.name = ? AND ir2value.name = ?`;

      db.query(query, [name, name], (err, result) => {
        if (err) {
          reject(err);
          console.log(err);
        } else if (result.length > 0) {
          console.log(result[0].ir1date);
          console.log(result[0].ir2date);
          resolve({ data:result[0].ir1date, datas:result[0].ir2date });
        } else {
          console.log("No data found.");
          let nulls="IN";
          console.log(nulls)
          resolve({data:nulls,data:nulls});
        }
      });
    });
  },
};
