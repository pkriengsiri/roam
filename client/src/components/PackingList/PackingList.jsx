import React from "react";

const PackingList = () => {
  return (
    <div>
      <div class="columns">
        <div class="column is-4"></div>
        <div class="control">
          <input class="input" type="text" placeholder="Add Item" />
        </div>
        <div class="control">
          <button class="button is-primary">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default PackingList;
