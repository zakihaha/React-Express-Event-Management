import 'bootstrap/dist/css/bootstrap.min.css';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import SignIn from "./pages/signin";
import Dashboard from "./pages/dashboard";
import PageCategories from './pages/categories';
import CategoryCreate from './pages/categories/create';
import CategoryEdit from './pages/categories/edit';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/categories" element={<PageCategories />} />
				<Route path="/categories/create" element={<CategoryCreate />} />
				<Route path="/categories/edit/:id" element={<CategoryEdit />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
