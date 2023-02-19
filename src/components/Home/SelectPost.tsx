import React from "react";

type SelectPostType = {
  onSendSort: (name: string) => void;
};

export const SelectPost = (props: SelectPostType) => {
  const { onSendSort } = props;
  return (
    <div>
      <select
        className="form-control mb-3"
        onChange={(e) => onSendSort(e.target.value)}
      >
        <option value="default">Sort Default</option>
        <option value="name">Sort from more Name to less</option>
        <option value="nameAsc">Sort from less Name to more</option>
        <option value="email">Sort from more Email to less</option>
        <option value="emailAsc">Sort from less Email to more</option>
        <option value="date">Sort from more Date to less</option>
        <option value="dateAsc">Sort from less Date to more</option>
      </select>
    </div>
  );
};
