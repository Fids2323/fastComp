import React, { useState, useEffect } from "react";
import api from "../../../api/index";
import Pagination from "../../common/pagination";
import RenderPhrase from "../../ui/searchStatus";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import SearchBar from "../../common/searchBar";
import { useUsers } from "../../../hooks/useUsers";
import { useProfession } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const usersListPage = () => {
    const { users } = useUsers();
    const { currentUser } = useAuth();
    const { professions } = useProfession();
    const [selectedProf, setSelectedProf] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchStatus, setSearchStatus] = useState("");

    const pageSize = 8;

    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleDelete = (userId) => {
        const updatedUsers = users.filter((user) => {
            return user._id !== userId;
        });
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    };

    async function handleFavorite(userId) {
        const prevState = await api.users
            .getById(userId)
            .then((user) => user.bookmark);
        api.users.update(userId, { bookmark: !prevState });

        api.users.fetchAll().then((usersData) => console.log(usersData));
    }
    const handleProfessionSelect = (item) => {
        setSearchStatus("");
        setSelectedProf(item);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleSearchStatus = (event) => {
        setSelectedProf(undefined);
        setSearchStatus(event.target.value);
    };

    if (users) {
        function filterUsers(data) {
            const filteredUsers = selectedProf
                ? data.filter(
                      (user) => user.profession._id === selectedProf._id
                  )
                : searchStatus
                ? data.filter((user) =>
                      user.name
                          .toLowerCase()
                          .includes(searchStatus.toLowerCase())
                  )
                : data;
            return filteredUsers.filter((u) => u._id !== currentUser._id);
        }
        const filteredUsers = filterUsers(users);

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearfilter = () => {
            setSelectedProf(undefined);
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div
                        className="d-flex flex-column flex-shrink-0 p-3"
                        style={{ marginTop: "50px", marginRight: "40px" }}
                    >
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearfilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column" style={{ width: "100%" }}>
                    <h1>
                        <RenderPhrase number={count} />
                    </h1>
                    <SearchBar
                        value={searchStatus}
                        placeholder="Введите имя для поиска"
                        onChange={handleSearchStatus}
                    />
                    {users.length > 0 && (
                        <UsersTable
                            users={usersCrop}
                            handleDelete={handleDelete}
                            handleFavorite={handleFavorite}
                            onSort={handleSort}
                            selectedSort={sortBy}
                        />
                    )}
                    <div className="div d-flex justify-content-center">
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
    return "Загрузка...";
};

export default usersListPage;
