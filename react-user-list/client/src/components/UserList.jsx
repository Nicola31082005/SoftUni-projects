import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import UserListItem from "./UserListItem";
import userService from "../services/userService";
import UserCreate from "./UserCreate";
import UserInfo from "./UserInfo";
import DeleteUser from "./DeleteUser";
import Pagination from "./Pagination";

export default function UserList() {

    const [users, setUsers] = useState([]);
    const [showCreate, setShowCreate] = useState(null);
    const [showInfo, setShowInfo] = useState(undefined); // Save userId in the showInfo state
    const [showDelete, setShowDelete] = useState(undefined); // Save userId in the showDelete state
    const [showEdit, setShowEdit] = useState(undefined); // Save userId in the showEdit state
    const [showDisplayUsers, setShowDisplayUsers] = useState([]) // Save users for the pagination
    const [currentPage, setCurrentPage] = useState(1); // Track the current Page
    const [usersPerPage, setUsersPerPage] = useState(0) // Save the current users per page


    useEffect(() => {
        userService.getAll().then((result) => {
            setUsers(result);
            setShowDisplayUsers(result.slice(0, 5)); // Update displayed users after fetching
        });

        setUsersPerPage(5);
    }, []);


    const createUserClickHandler = (userId) => {
        setShowCreate(true)
        setShowEdit(undefined)
    }

    const closeUserClickHandler = () => {
        setShowCreate(null)
        setShowEdit(undefined);
    }

    const saveUserClickHandler = async (e) => {
        // Stop default refresh
        e.preventDefault();

        const formData = new FormData(e.target.parentElement.parentElement);
        const userData = Object.fromEntries(formData.entries());

        // Create new user on the server
        const newUser = await userService.addUser(userData);

        // Update local state
        setUsers(users => [...users, newUser]);

        // Close the modal
        setShowCreate(false);

    }

    const userInfoClickHandler = (userId) => {
        setShowInfo(userId)
    }

    const userInfoCloseClickHandler = () => {
        setShowInfo(undefined)
    }

    const deleteUserClickHandler = (userId) => {
        setShowDelete(userId);
    }

    const deleteUserCloseClickHandler = () => {
        setShowDelete(undefined);
    }

    const deleteUserHandler = async () => {
        const userId = showDelete;

        // Delete user in the server
        const result = await userService.deleteUser(userId);

        // Delete user in the UI
        setUsers((users) => users.filter(user => user._id !== userId))

        // Close the modal
        setShowDelete(undefined);

    }

    const editUserClickHandler = (userId) => {
        setShowEdit(userId);
        setShowCreate(true);
    }

    const userEditHandler = async (e) => {
        e.preventDefault();

        const userId = showEdit;

        const formData = new FormData(e.target.parentElement.parentElement);
        const newUserData = Object.fromEntries(formData.entries());

        // Make an edit to the server
        const updatedUser = await userService.update(userId, newUserData);

        // Make an edit to the UI
        setUsers(state => state.map(user => user._id === userId ? updatedUser : user))

        // CLose the modal
        setShowCreate(null);
        setShowEdit(undefined);
    }

    const modifyDisplayUsers = (value) => {
        const usersPerPage = Number(value);
        setUsersPerPage(usersPerPage);



        const startIndex = (currentPage - 1) * usersPerPage;
        const endIndex = startIndex + usersPerPage;

        const modifiedUsers = users.slice(startIndex, endIndex)

        setShowDisplayUsers(modifiedUsers)
    }

    const goToNextPage = () => {
        const totalPages = Math.ceil(users.length / usersPerPage)

        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Ensure it doesn't go below 1

    };

    const goToFirstPage = () => {
        setCurrentPage(1);
    }

    const goToLastPage = () => {
        const totalPages = Math.ceil(users.length / usersPerPage)
        setCurrentPage(totalPages)
    }



    return (
        <section className="card users-container">

            <SearchBar />

            {showCreate && (
                <UserCreate
                    userId={showEdit}
                    onClose={closeUserClickHandler}
                    onSave={saveUserClickHandler}
                    onEdit={userEditHandler}
                />
            )}

            {showInfo && (
                <UserInfo
                    userId={showInfo}
                    onClose={userInfoCloseClickHandler}
                />
            )}

            {showDelete && (
                <DeleteUser
                    userId={showDelete}
                    onClose={deleteUserCloseClickHandler}
                    onClick={deleteUserHandler}
                />
            )}


            <div className="table-wrapper">

                <div id="overlays">
                    {/* <!-- Overlap components  -->

            <!-- <div className="loading-shade"> -->
            <!-- Loading spinner  -->
            <!-- <div className="spinner"></div> -->
            <!--
              No users added yet  -->

            <!-- <div className="table-overlap">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="triangle-exclamation"
                      className="svg-inline--fa fa-triangle-exclamation Table_icon__+HHgn"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"
                      ></path>
                    </svg>
                    <h2>There is no users yet.</h2>
                  </div> -->

            <!-- No content overlap component  -->

            <!-- <div className="table-overlap">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="triangle-exclamation"
                      className="svg-inline--fa fa-triangle-exclamation Table_icon__+HHgn"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"
                      ></path>
                    </svg>
                    <h2>Sorry, we couldn't find what you're looking for.</h2>
                  </div> -->

            <!-- On error overlap component  -->

            <!-- <div className="table-overlap">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="triangle-exclamation"
                      className="svg-inline--fa fa-triangle-exclamation Table_icon__+HHgn"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"
                      ></path>
                    </svg>
                    <h2>Failed to fetch</h2>
                  </div> -->
            <!-- </div> --> */}
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Image
                            </th>
                            <th>
                                First name<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Last name<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Email<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Phone<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Created
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showDisplayUsers.map(
                            (user) => <UserListItem
                                {...user}
                                key={user._id}
                                onInfoClick={userInfoClickHandler}
                                onDeleteClick={deleteUserClickHandler}
                                onEditClick={editUserClickHandler}
                            />
                        )}
                    </tbody>
                </table>
            </div>

            {/* <!-- New user button  --> */}
            <button onClick={createUserClickHandler} className="btn-add btn">Add new user</button>

            {/* Pagination */}
            <Pagination
                modifyDisplayUsers={modifyDisplayUsers}
                currentPage={currentPage}
                nextPage={goToNextPage}
                previousPage={goToPreviousPage}
                firstPage={goToFirstPage}
                lastPage={goToLastPage}
                totalPages={Math.ceil(users.length / usersPerPage)}
            />

        </section>
    )
}