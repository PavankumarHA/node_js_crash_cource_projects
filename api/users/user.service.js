const pool = require('../../config/database');

module.exports = {
    create: async (data, callback) =>{
        try {
       await pool.query(
            `insert into registration(first_name, last_name, gender, email, password, number)values(?, ?, ?, ?, ?, ?)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error, results, fields) => {
                if(error){
                return callback(error);
            }
            return callback(null, results);
    }
        );
    }catch(err){
        console.log("error in api " , err)
            res.send({status : 400 , data: "something went wrong"})
    }
    },

    getUsers: async callBack => {
        try {
            await  pool.query(
             `select id,first_name, last_name, gender, email, password, number from registration`,
          [],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
    }catch(err){
        console.log("error in api get data " , err)
            res.send({status : 400 , data: "something went wrong"})
    }
      },

      getUserByUserEmail: async (email, callback) =>{
        try {
          await  pool.query(
            `select * from registration where email = ?`,
            [email],
            (error, results, fields) =>{
                if(error){                          //if error then callback the eroor
                    callabck(error)
                }
                return callback(null, results[0])      // if don't have error first parameter null and 2nd parameter results
            }
        );
    }catch(err){
        console.log("error in api " , err)
            res.send({status : 400 , data: "something went wrong"})
    }
      },

getUserByUserId: async (id, callBack) => {
    try {
    await pool.query(
      `select id,first_name,last_name,gender,email,number from registration where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
}catch(err){
    console.log("error in api get data " , err)
        res.send({status : 400 , data: "something went wrong"})
}
  },

  UpdateUser: async (data, callBack) => {
    try {
        await pool.query(
      `update registration set first_name=?, last_name=?, gender=?, email=?, password=?, number=? where id = ?`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
}catch(err){
    console.log("error in api update data " , err)
        res.send({status : 400 , data: "something went wrong"})
}
  },

  DeleteUser: async (data, callBack) => {
    try {
        await pool.query(
          `delete from registration where id = ?`,
          [data.id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
    }catch(err){
        console.log("error in api delete data " , err)
            res.send({status : 400 , data: "something went wrong"})
    }
      }
    };
