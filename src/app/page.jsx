"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const initial = ["A", "B", "C", "D"];
  const [items, setItems] = useState([...initial]);

  const handleChange = (e, index) => {
    e.preventDefault();
    const newItems = [...items];
    // const val = e.target.value;
    // newItems.splice(index, 1, val);
    newItems[index] = e.target.value;
    setItems(newItems);
  };

  const handleAdd = (i) => {
    const newItems = [...items];
    newItems.splice(i + 1, 0, "_");
    setItems(newItems);
  };
  const handleRemove = (i) => {
    const newItems = [...items];
    newItems.splice(i, 1);
    setItems(newItems);
  };
  return (
    <main className={styles.main}>
      <div className={styles.items}>
        <div className={styles.itemsContainer}>
          {items.map((item, index) => (
            <div key={item + index} className={styles.item}>
              <input
                type="text"
                className={styles.input}
                value={item}
                style={{
                  border:
                    (item === "_") | (item === "") ? "1px solid #fff" : "none",
                }}
                onChange={(e) => handleChange(e, index)}
              />
              <div
                className={styles.itemLeft}
                onClick={() => handleRemove(index)}
              />
              <div
                className={styles.itemRight}
                onClick={() => handleAdd(index)}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          className={styles.btn}
          onClick={() => setItems(initial)}
        >
          Reset
        </button>
        {items.length !== 0 && (
          <div className={styles.display}>
            `{items.join(", ").toUpperCase()}`
          </div>
        )}
      </div>
    </main>
  );
}
