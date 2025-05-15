import React, { useContext, useEffect, useState } from 'react';
import { IoIosInformationCircleOutline } from "react-icons/io";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import SlideShowHome from '../slideShow/SlideShowHome';
import SlideShowItem from '../slideShow/SlideShowItem';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ContextLocations } from '../../../context/LocationProvider';
import { ContextRegions } from '../../../context/RegionsProvider';
import { ContextCinemas } from '../../../context/CinemasProvider';
import { dayNow, filterListById, getNowShowingMovies, getOjectById, getUpcomingMovies} from '../../../utils/FunctionConvert';
import { ContextMovieScreens } from '../../../context/MovieScreenProvider';
import { ContextMovies } from '../../../context/MovieProvider';
import SlideShowBannerHome from '../slideShow/SlideShowBannerHome';
import { FaRegBookmark, FaTicket } from 'react-icons/fa6';
import { CiHeart } from 'react-icons/ci';
import SlideShowNews from '../slideShow/SlideShowNews';
import { Link, useNavigate } from 'react-router-dom';

const inner = { id_region: "", id_location: "", id_cinema: "", id_movie: "", id_movieScreen: "", showtime: "", }
function HomePage(props) {
  const { locations } = useContext(ContextLocations);
  const { regions } = useContext(ContextRegions);
  const { cinemas } = useContext(ContextCinemas);
  const [openNextScreen, setOpenNextScreen] = useState(true);
  const [searchItem, setSearchItem] = useState(inner);
  const { movieScreens } = useContext(ContextMovieScreens);
  const { movies } = useContext(ContextMovies);
  const [showMovie, setShowMovie] = useState([]);
  const navigation = useNavigate();
  const icons = [FaTicket, FaRegBookmark, CiHeart, IoIosInformationCircleOutline];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (name) => (event, newValue) => {
    setSearchItem((prevData) => ({
      ...prevData,
      [name]: newValue, // newValue chính là `value` của Option được chọn
    }));
  };

  const uniqueMovies = Array.from(
    new Map(showMovie.map(movie => [movie.id_movie, movie])).values()
  );

  const handleBooking = () => {
    navigation(`/moviescreening/${searchItem.id_cinema}`);
  }

  return (
    <div className="bg-gradient-to-r from-black via-gray-700 to-zinc-400 text-center">
      <SlideShowHome />
      <div className="m-auto my-4 w-[80%] px-4 grid md:grid-cols-4 grid-cols-2  gap-5">
        <Select
          color="warning"
          placeholder="Choose region"
          variant="soft"
          name='id_region'
          onChange={handleChange("id_region")}

        >
          {regions.map((region, index) => (
            <Option key={index} value={region.id} >{region?.name}</Option>
          ))}

        </Select>
        <Select
          color="warning"
          placeholder="Choose Location"
          variant="soft"
          name='id_location'
          onChange={handleChange("id_location")}
        >
          {filterListById(locations, searchItem.id_region, "id_region").map((location, index) => (
            <Option key={index} value={location.id}>
              {location?.name}
            </Option>
          ))}
        </Select>
        <Select
          color="warning"
          placeholder="Choose cinema"
          variant="soft"
          name='id_cinema'
          onChange={handleChange("id_cinema")}
        >
          {filterListById(cinemas, searchItem.id_location, "id_location").map((cinema, index) => (
            <Option key={index} value={cinema.id}>
              {cinema?.name}
            </Option>
          ))}
        </Select>
        <Select
          color="warning"
          placeholder="Choose movies"
          variant="soft"
          name="id_movie"
          onChange={handleBooking}
        >
          {movies.map(movie => {
            const hasShowToday = filterListById(movieScreens, movie.id, "id_movie").some(
              moviescreen =>
                moviescreen.id_cinema === searchItem.id_cinema
                && dayNow(moviescreen)
            );

            return hasShowToday && (
              <Option key={movie.id} value={movie.id}>
                {movie.name}
              </Option>
            );
          })}
        </Select>
      </div>
      <div className="bg-slate-800 h-[10px]"></div>
      <div className="mt-5 flex justify-center gap-5">
        <button onClick={() => { setShowMovie(getNowShowingMovies(movieScreens)); setOpenNextScreen(true) }} className={`p-2 text-white rounded-lg font-semibold transition-all duration-500 ease-linear hover:bg-orange-600 ${openNextScreen ? 'bg-yellow-800' : 'bg-yellow-500'}`}>Phim Đang Chiếu</button>
        <button onClick={() => { setShowMovie(getUpcomingMovies(movieScreens)); setOpenNextScreen(false) }} className={`p-2 text-white rounded-lg font-semibold transition-all duration-500 ease-linear hover:bg-orange-600 ${!openNextScreen ? 'bg-yellow-800' : 'bg-yellow-500'}`}>Phim Sắp Chiếu</button>
      </div>
      <div className="m-auto w-full px-5 py-4">
        <h2 className="text-white text-[30px] font-semibold mb-4">Danh Sách Phim</h2>
        <div className="grid md:grid-cols-5 grid-cols-2 gap-4">
          {uniqueMovies.map((movie, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
              <img
                className="w-full h-100 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                src={getOjectById(movies, movie.id_movie)?.imgUrl}
                alt={getOjectById(movies, movie.id_movie)?.name}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black bg-opacity-60 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                <div className="flex gap-3">
                  {icons.map((Icon, idx) =>
                    Icon === IoIosInformationCircleOutline ? (
                      <Link
                        to={`/movies/${movie.id_movie}`}
                        key={idx}
                        className="p-3 rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                      >
                        <Icon />
                      </Link>
                    ) : (
                      <div
                        key={idx}
                        className="p-3 rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                      >
                        <Icon />
                      </div>
                    )
                  )}
                </div>
                <span className="text-white text-lg font-semibold text-center">
                  {getOjectById(movies, movie.id_movie)?.name}
                </span>
                <span className="text-white text-sm">Thời lượng: {movie.duration} phút</span>
                <p className="text-gray-300 text-sm text-center line-clamp-3">
                  {getOjectById(movies, movie.id_movie)?.description}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
      <div className="mx-auto w-full px-5 py-4">
        <SlideShowItem />
      </div>
      <div className="mx-auto w-full px-5 py-4">
        <SlideShowBannerHome />
      </div>
      <div className="mx-auto w-full px-5 py-4">
        <SlideShowNews />
      </div>
    </div>
  );
}

export default HomePage;