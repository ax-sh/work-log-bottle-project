const ProfileWrapper = (i) => {
  const { image, isAdmin, name, onClick } = i;
  return (
    <div className="profile-wrapper">
      <img src={image} alt="image" />
      <span>{isAdmin ? "admin" : "user"}</span>
      <button onClick={() => onClick(i)}>Login as {name}</button>
    </div>
  );
};

export default ProfileWrapper;
