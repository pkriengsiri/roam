import React from "react";

const PackingList = () => {
  return (
    <div>
      <ul>
        <label class="checkbox">
          <input type="checkbox" />
          Sunscreeen
        </label>
        <label class="checkbox">
          <input type="checkbox" />
          Snorkels
        </label>
        <label class="checkbox">
          <input type="checkbox" />
          Life Vests
        </label>
      </ul>
    </div>
  );
};

export default PackingList;
