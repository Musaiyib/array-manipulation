"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./page.module.css";

export default function Home() {
  const initial = ["A", "B", "C", "D"];
  const [items, setItems] = useState([...initial]);

  const handleChange = (e, index) => {
    e.preventDefault();
    const newItems = [...items];
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

  const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? "lightgreen" : "transparent",
    ...draggableStyle,
  });

  const reOrder = (list, currentIndex, destinationIndex) => {
    const result = [...list];
    const [reorderedItem] = result.splice(currentIndex, 1);
    result.splice(destinationIndex, 0, reorderedItem);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const updatedItems = reOrder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(updatedItems);
  };

  return (
    <main>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} className={styles.items}>
              <div className={styles.itemsContainer}>
                {items.map((item, index) => (
                  <Draggable
                    key={item + index}
                    draggableId={item + index}
                    index={index}
                    // className={styles.items}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        className={styles.item}
                      >
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleChange(e, index)}
                          className={styles.input}
                        />
                        <div
                          onClick={() => handleRemove(index)}
                          className={styles.itemLeft}
                        />
                        <div
                          onClick={() => handleAdd(index)}
                          className={styles.itemRight}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
              <button
                // type="button"
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
          )}
        </Droppable>
      </DragDropContext>
    </main>
  );
}
