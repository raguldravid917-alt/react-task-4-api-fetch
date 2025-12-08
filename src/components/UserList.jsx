import UserCard from "./UserCard";

function UserList({ users, onUserClick, selectedUser, loading }) {
  if (loading) {
    return (
      <div className="skeleton-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="skeleton-card" />
        ))}
      </div>
    );
  }

  if (!users.length) {
    return <p className="empty-text">No users found 🥲</p>;
  }

  return (
    <div className="user-grid">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          isSelected={selectedUser?.id === user.id}
          onClick={() => onUserClick(user)}
        />
      ))}
    </div>
  );
}

export default UserList;
