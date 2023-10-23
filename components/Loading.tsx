import React from "react";

export default function Loading() {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ">
      <h1 className="mb-6 text-center text-lg font-bold">Loading..</h1>
      <div className="flex space-x-2 justify-center items-center dark:invert">
        <div className="h-8 w-8 bg-custom-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-custom-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-custom-secondary rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}
