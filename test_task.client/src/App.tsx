import './App.css';
import Layout from './componnents/Layout/Layout';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import Employees from './pages/Employees';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Employees />,
    },
    {
        path: "/create",
        element: <AddPage />,
    },
    {
        path: "/edit",
        element: <EditPage />,
    },
]);

function App() {

    return (
        <Layout>
            <RouterProvider router={router} />
        </Layout>
    );
}

export default App;