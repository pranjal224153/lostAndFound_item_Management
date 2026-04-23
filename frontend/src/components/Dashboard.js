import React, { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    itemName: "",
    description: "",
    type: "Lost",
    location: "",
    date: "",
    contactInfo: ""
  });

  const token = localStorage.getItem("token");

  const fetchItems = async () => {
    try {
      const res = await API.get("/items");
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ADD ITEM
  const addItem = async () => {
    try {
      await API.post("/items", form, {
        headers: { Authorization: token }
      });

      alert("Item Added!");

      setForm({
        itemName: "",
        description: "",
        type: "Lost",
        location: "",
        date: "",
        contactInfo: ""
      });

      fetchItems();
    } catch (err) {
      alert("Error adding item");
    }
  };

  // DELETE ITEM
  const deleteItem = async (id) => {
    try {
      await API.delete(`/items/${id}`, {
        headers: { Authorization: token }
      });
      fetchItems();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // UPDATE ITEM (simple prompt)
  const updateItem = async (id) => {
    const newName = prompt("Enter new item name");
    if (!newName) return;

    try {
      await API.put(
        `/items/${id}`,
        { itemName: newName },
        { headers: { Authorization: token } }
      );
      fetchItems();
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Dashboard</h2>

      {/* ADD ITEM FORM */}
      <div style={styles.card}>
        <h3>Add Item</h3>

        <input
          style={styles.input}
          placeholder="Item Name"
          value={form.itemName}
          onChange={(e) => setForm({ ...form, itemName: e.target.value })}
        />

        <input
          style={styles.input}
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          style={styles.input}
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option>Lost</option>
          <option>Found</option>
        </select>

        <input
          style={styles.input}
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <input
          style={styles.input}
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          style={styles.input}
          placeholder="Contact Info"
          value={form.contactInfo}
          onChange={(e) =>
            setForm({ ...form, contactInfo: e.target.value })
          }
        />

        <button style={styles.button} onClick={addItem}>
          Add Item
        </button>
      </div>

      {/* ITEM LIST */}
      <div style={styles.card}>
        <h3>All Items</h3>

        {items.length === 0 ? (
          <p>No items found</p>
        ) : (
          items.map((item) => (
            <div key={item._id} style={styles.itemBox}>
              <h4>{item.itemName}</h4>
              <p>{item.description}</p>
              <p><b>Type:</b> {item.type}</p>
              <p><b>Location:</b> {item.location}</p>
              <p><b>Date:</b> {item.date?.substring(0, 10)}</p>
              <p><b>Contact:</b> {item.contactInfo}</p>

              <button
                style={{ ...styles.button, background: "#28a745", marginTop: "5px" }}
                onClick={() => updateItem(item._id)}
              >
                Update
              </button>

              <button
                style={{ ...styles.button, background: "#dc3545", marginTop: "5px" }}
                onClick={() => deleteItem(item._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* STYLES */
const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    fontFamily: "Arial"
  },
  heading: {
    textAlign: "center"
  },
  card: {
    background: "#f5f5f5",
    padding: "15px",
    margin: "15px 0",
    borderRadius: "8px"
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "5px 0"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },
  itemBox: {
    background: "#fff",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px"
  }
};