import React from "react";
import EmptyState from "./components/EmptyState";

const NotFoundPage = () => {
  return (
    <EmptyState
      title="Not found"
      subtitle="Look like your page is not exits."
    />
  );
};

export default NotFoundPage;
