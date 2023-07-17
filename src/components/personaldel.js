import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Personaldel = () => {
  const [data, setdata] = useState([]);
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [id, setid] = useState(0);
  const [edit, setedit] = useState(false);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setdata(res.data);
      })
      .catch((error) => {
        console.log("Error");
      });
  }, []);

  const handledata = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        name: name,
        username: username,
        email: email,
      })
      .then((res) => {
        // const datalist = [...data, res.data];
        // setdata(datalist);
        const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
        const newData = [...data, { ...res.data, id: newId }];
        setdata(newData);
        setname("");
        setusername("");
        setemail("");
      })
      .catch((Error) => {
        console.log("ERROR");
      });
  };

  const deletedata = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        const del = data.filter((e) => e.id !== id);
        setdata(del);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditData = () => {
    const ed = { id: id, name: name, username: username, email: email };
    axios
      .patch(`https://jsonplaceholder.typicode.com/users/${ed.id}`, ed)
      .then((res) => {
        const update = data.map((e) => {
          if (e.id === ed.id) {
            return { ...e, ...ed };
          }
          return e;
        });
        setdata(update);
        setname(name);
        setemail(email);
        setusername(username);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function updateedit(data) {
    setname(data.name);
    setusername(data.username);
    setemail(data.email);
    setedit(true);
  }

  return (
    <div class="in-put">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
      <input
        type="text"
        name="username"
        placeholder="username"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <button
        type="button"
        class="btn btn-danger"
        onClick={() => {
          if (edit) {
            handleEditData();
          } else {
            handledata();
          }
        }}
      >
        SUBMIT
      </button>

      <div class="tab-le">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>

              <th>UserName</th>

              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      updateedit(user);
                      setid(user.id);
                    }}
                    class="btn btn-primary"
                  >
                    EDIT
                  </button>

                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => deletedata(user.id)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Personaldel;
