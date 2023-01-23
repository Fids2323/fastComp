import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "./utils/paginate";
import Pagination from "./pagination";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";
import Search from "./search";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchStatus, setSearchStatus] = useState("");
    const pageSize = 8;
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        setUsers(newArray);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfession(data);
        });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSearchStatus("");
        setSelectedProf(item);
    };

    const handleSearchStatus = ({ target }) => {
        setSelectedProf(undefined);
        setSearchStatus(target.value);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filteredUsers = () => {
            if (selectedProf) {
                return users.filter((user) => user.profession._id === selectedProf._id);
            }
            if (searchStatus) {
                return users.filter((user) =>
                    user.name.toLowerCase().includes(searchStatus.toLowerCase())
                );
            }
            return users;
        };

        const count = filteredUsers().length;
        const sortedUsers = _.orderBy(filteredUsers(), [sortBy.path], [sortBy.order]);
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf(undefined);
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <Search
                        value= {searchStatus}
                        placeholder = 'Введите имя для поиска..'
                        onChange={handleSearchStatus}
                    />
                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};
UsersList.propTypes = {
    users: PropTypes.array
};

export default UsersList;
