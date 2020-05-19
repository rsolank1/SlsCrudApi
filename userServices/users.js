'use strict';

module.exports.getUserList = async event => {
  console.log("users.getUserList called..");
  let result = {};
  try {
    const db = require('./db');
    result = await db.executeQuery("select * from user", []);
    return {
      statusCode: 200,
      body: JSON.stringify({ Response: result })
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ Response: "something went wrong..." })
    };
  }

};


module.exports.getUser = async (event, context, callback) => {
  console.log("users.getUserList called..");
  //  console.log(event);
  let response;
  if (event) {
    if (event.pathParameters && event.pathParameters.user_id) {
      console.log("Received id: " + event.pathParameters.user_id);
      let id = event.pathParameters.user_id;
      try {
        const db = require('./db');
        let result;
        result = await db.executeQuery("select * from user where uid = ?", id);
        console.log("response ..." + JSON.stringify(result));
        return {
          statusCode: 200,
          body: JSON.stringify({ Response: result })
        };

      } catch (err) {
        console.log(err);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'something went wrong...' })
        };

      }

    } else {
      console.log(" event.uid not found");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: ' required userid  not found .', requiredfields: "  id " })
      };
    }
  }
  else {
    console.log("event not found");
    return {
      statusCode: 400,
      body: JSON.stringify({ message: ' required userid  not found .', requiredfields: "  id " })
    };

  }

};


module.exports.createUser = async (event, context, callback) => {
  console.log("create-user called..");
  console.log(event);
  let response;
  if (event.body) {
    let body = JSON.parse(event.body);
    if (body.name && body.phone && body.email && body.pass) {

      let userobj = {
        uname: body.name,
        uemail: body.email,
        uphone: body.phone,
        upass: body.pass
      };

      try {
        const db = require('./db');
        let result = await db.executeQuery("insert into user SET ? ", userobj);
        if (result.affectedRows !== 0) {
          return {
            statusCode: 200,
            body: JSON.stringify({ message: ' user is successfully registered..', "result ": result })
          };
        }
      } catch (err) {
        console.log(err);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'something went wrong...' })
        };
      }

    } else {
      console.log("event.name && event.phone && event.email && event.pass not found");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "all required details not found ", "required-fields": " name, phone, email, pass" })
      };
    }
  }
  else {
    console.log("event not found");
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "all required details not found ", "required-fields": " name, phone, email, pass" })
    };

  }

};


module.exports.updateUser = async (event, context, callback) => {
  console.log("update-user called..");
  console.log(event);
  if (event.pathParameters && event.pathParameters.user_id) {
    console.log("Received id: " + event.pathParameters.user_id);
    let id = event.pathParameters.user_id;
    if (event.body) {
      let body = JSON.parse(event.body);
      if (body.name && body.phone && body.email && body.pass) {

        let userobj = {
          uname: body.name,
          uemail: body.email,
          uphone: body.phone,
          upass: body.pass
        };

        try {
          const db = require('./db');
          let result = await db.executeQuery("update user SET ? where uid = ? ", [userobj, id]);
          if (result.affectedRows !== 0) {
            return {
              statusCode: 200,
              body: JSON.stringify({ message: ' user is successfully updated..', "result ": result })
            };
          }
        } catch (err) {
          console.log(err);
          return {
            statusCode: 500,
            body: JSON.stringify({ message: 'something went wrong...' })
          };
        }

      } else {
        console.log("event.name && event.phone && event.email && event.pass not found");
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "all required details not found ", "required-fields": " name, phone, email, pass" })
        };
      }
    }
    else {
      console.log("event not found");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "all required details not found ", "required-fields": " name, phone, email, pass" })
      };
    }
  }
  else {
    console.log(" event.uid not found");
    return {
      statusCode: 400,
      body: JSON.stringify({ message: ' required userid  not found .', requiredfields: "  id " })
    };
  }


};


module.exports.deleteUser = async event => {
  let response;
  if (event) {
    if (event.pathParameters && event.pathParameters.user_id) {
      console.log("Received id: " + event.pathParameters.user_id);
      let id = event.pathParameters.user_id;
      try {
        const db = require('./db');
        let result;
        result = await db.executeQuery("delete from user where uid = ?", id);
        console.log("response ..." + JSON.stringify(result));
        if (result.affectedRows !== 0) {
          return {
            statusCode: 200,
            body: JSON.stringify({ message: ' user is successfully deleted..', "result ": result })
          };
        }

      } catch (err) {
        console.log(err);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'something went wrong...' })
        };

      }

    } else {
      console.log(" event.uid not found");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: ' required userid  not found .', requiredfields: "  id " })
      };
    }
  }
  else {
    console.log("event not found");
    return {
      statusCode: 400,
      body: JSON.stringify({ message: ' required userid  not found .', requiredfields: "  id " })
    };

  }
};
