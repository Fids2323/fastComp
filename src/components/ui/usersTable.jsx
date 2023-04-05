import React from "react";
import Table, { TableBody, TableHeader } from "../common/table";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import Qualities from "./qualities";
import Profession from "./profession";

const UsersTable = ({
  users,
  handleFavorite,
  selectedSort,
  onSort
}) => {
  const columns = {
    name: { path: "name", name: "Имя" },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualities={user.qualities} />
    },
    profession: { name: "Профессия", component: (user) => <Profession id={user.profession} /> },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark
          userId={user._id}
          bookmark={user.bookmark}
          onFavourite={handleFavorite}
        />
      )
    }
  };
  return (
    <>
      <Table
        onSort={onSort}
        selectedSort={selectedSort}
        columns={columns}
        data={users}
        handleFavorite={handleFavorite}
      >
        <TableHeader
          onSort={onSort}
          selectedSort={selectedSort}
          columns={columns}
        />
        <TableBody
          columns={columns}
          data={users}
          handleFavorite={handleFavorite}
        />
      </Table>
    </>
  );
};
UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
};
export default UsersTable;
