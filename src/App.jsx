import { useEffect, useState } from "react";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import Pagination from "./components/Pagination";

const API_URL = "https://reqres.in/api/users";

// API fail aana use panna sample users (ReqRes format)
const MOCK_USERS = [
  {
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
  },
  {
    id: 2,
    email: "janet.weaver@reqres.in",
    first_name: "Janet",
    last_name: "Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg",
  },
  {
    id: 3,
    email: "emma.wong@reqres.in",
    first_name: "Emma",
    last_name: "Wong",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
  },
  {
    id: 4,
    email: "eve.holt@reqres.in",
    first_name: "Eve",
    last_name: "Holt",
    avatar: "https://reqres.in/img/faces/4-image.jpg",
  },
  {
    id: 5,
    email: "charles.morris@reqres.in",
    first_name: "Charles",
    last_name: "Morris",
    avatar: "https://reqres.in/img/faces/5-image.jpg",
  },
  {
    id: 6,
    email: "tracey.ramos@reqres.in",
    first_name: "Tracey",
    last_name: "Ramos",
    avatar: "https://reqres.in/img/faces/6-image.jpg",
  },
];

function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [error, setError] = useState("");
  const [usingMock, setUsingMock] = useState(false);

  // 🔹 List of users fetch
  const fetchUsers = async (pageNumber = 1) => {
    setLoading(true);
    setError("");

    try {
      // Live API try
      const res = await fetch(`${API_URL}?page=${pageNumber}`);

      if (!res.ok) {
        throw new Error("API status not OK");
      }

      const data = await res.json();
      const apiUsers = data.data || [];

      if (apiUsers.length === 0) {
        throw new Error("No users in API response");
      }

      setUsers(apiUsers);
      setTotalPages(data.total_pages || 1);
      setUsingMock(false);
    } catch (err) {
      console.error("Live API failed, using mock data:", err.message);

      // API fail aana – sample users
      setUsers(MOCK_USERS);
      setTotalPages(1);
      setUsingMock(true);
      setError("Live API reach aagala; sample users display pannrom 🙂");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Single user details
  const fetchUserDetails = async (id) => {
    // Mock mode la na API call thevai illa
    if (usingMock) {
      const found = MOCK_USERS.find((u) => u.id === id) || null;
      setSelectedUser(found);
      return;
    }

    try {
      setLoadingUser(true);
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error("Failed to fetch user details");
      const data = await res.json();
      setSelectedUser(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleUserClick = (user) => {
    setSelectedUser(user); // immediate UI
    fetchUserDetails(user.id);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setSelectedUser(null);
    setPage(newPage);
  };

  return (
    <div className="app-root">
      <div className="app-header">
        <h1 className="app-title">ReqRes User Explorer</h1>
        <p className="app-subtitle">
          Colorful & interactive user list with pagination and details 💫
        </p>
      </div>

      <div className="app-layout">
        <div className="card glass-panel">
          <div className="card-header">
            <h2>Users</h2>
            {loading && <span className="pill pill-loading">Loading...</span>}
            {!loading && (
              <span className="pill">
                {usingMock ? "Sample data" : "Live API"}
              </span>
            )}
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <UserList
            users={users}
            onUserClick={handleUserClick}
            selectedUser={selectedUser}
            loading={loading}
          />

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        <div className="details-wrapper">
          <div className="card glass-panel details-card">
            <div className="card-header">
              <h2>User Details</h2>
              {loadingUser && (
                <span className="pill pill-loading">Fetching details…</span>
              )}
            </div>

            <UserDetails user={selectedUser} />
          </div>
        </div>
      </div>

      <footer className="app-footer">
        <span>
          Built with ❤ using React + Vite + ReqRes API (with fallback)
        </span>
      </footer>
    </div>
  );
}

export default App;