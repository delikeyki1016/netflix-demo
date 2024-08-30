import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Homepage from "./pages/Homepage/Homepage";
import Movies from "./pages/Movies/Movies";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import NotFound from "./pages/NotFound/NotFound";

// 루트페이지 /
// 영화 전체 리스트 페이지 /movies
// 영화 디테일 페이지 /movies/:id

function App() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                {/* index는 path="/"와 같음  */}
                <Route index element={<Homepage />} />
                {/* /movies 를 공통으로 쓰는 url일 경우 다시 묶을 수 있음 */}
                <Route path="movies">
                    <Route index element={<Movies />} />
                    <Route path=":id" element={<MovieDetail />} />
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
