import React from "react";
import Dashboard from "@/components/layout/Dashboard";
import ListTableFavorite from "@/components/List/ListTableFavorite";

function listsFavorites() {
  return (
    <Dashboard>
      <h1 className='text-3xl font-semibold mb-5'>List Favorite</h1>
      <ListTableFavorite></ListTableFavorite>
    </Dashboard>
  );
}

export default listsFavorites;
