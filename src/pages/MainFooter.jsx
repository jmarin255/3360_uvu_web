import React from "react";

const MainFooter = () => {
  return (
    <footer>
      <nav className="navbar navbar-expand-lg bg-dark text-light fixed-bottom">
        <div className="container-fluid">
          <p>&copy; {new Date().getFullYear()} My Website</p>
        </div>
      </nav>
    </footer>
  );
};

export default MainFooter;