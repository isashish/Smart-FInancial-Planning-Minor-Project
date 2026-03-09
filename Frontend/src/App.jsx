import { ThemeProvider } from './context/ThemeContext';
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from './components/SignIn';
import AppInner from './components/AppInner';

export default function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/"
        element={
          localStorage.getItem('token')
            ? <ThemeProvider><AppInner /></ThemeProvider>
            : <Navigate to="/signin" replace />
        }
      />
    </Routes>
  );
}