import PropTypes from "prop-types"
import styled from "styled-components";
import Spinner from "../../ui/Spinner.jsx";
import { useUser } from "./useUser.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. Load the authentication state
  const { isLoading, isAuthenticated } = useUser();

  // 2. if there is NO authentication user, redirect to /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4. If there is a user, render the AppLayout
  if (isAuthenticated) return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.any
}

export default ProtectedRoute;
