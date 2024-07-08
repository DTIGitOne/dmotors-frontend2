import React, { useEffect, useState } from 'react';
import MenuBar from "../Components/MenuBar";
import { getUser, sendImage, sendImageAdmin } from "../API/API";
import LoaderIcon from "../SVG/LoaderIcon";
import CardCar from "../Components/CardCar";
import { getIdToken, getRoleToken } from "../functions/getTokenPayload";
import Messages from "../Components/Messages";
import '../CustomCSS/Profile.css';
import { useDispatch } from "react-redux";
import { setExpanded, setOpenMessages, setVisible } from "../Redux/Slices/MessageExpandedSlice";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Slider from "react-slick";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useNavigate, useParams } from "react-router-dom";

const User = () => {
  const [file, setFile] = useState();
  const [bio, setBio] = useState();
  const [bioBefore , setBioBefore] = useState();
  const [user, setUser] = useState(null); 
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usersAccount, setUsersAccount] = useState(false);
  const [changingBio, setChangingBio] = useState(false);
  const token = localStorage.getItem('authorization');
  const [ isAdmin , setIsAdmin] = useState(false);
  const [ Admin, setAdmin] = useState(false);
  const { id } = useParams();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const settings = {
    dots: false,
    infinite: cars.length > 1,
    speed: 400,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3500,
    autoplay: true,
  };
   
  const idtoken = getIdToken();

  useEffect(() => {
    const adminRole = getRoleToken();

    if (adminRole === "ADMIN" && isAdmin === false && idtoken !== id) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, []);

  const editingBio = (e) => {
    setChangingBio(true);
    setBio(e.target.value);
  }

  const submitBefore = () => {
    setChangingBio(false);
    submit();
  }

  const closeSubmit = () => {
    setChangingBio(false);
    setBio(bioBefore);
  }

  useEffect(() => {
    getUserData();
  }, [id]);

  const submit = async () => {
    if(Admin === true) {
      const formData = new FormData();
      formData.append("image", file);
      if (bio !== "undefined" && bio !== undefined && bio !== "") {
        formData.append("bio", bio);
      }
      await sendImageAdmin(formData, token , id);
      await getUserData();
    } else {
      const formData = new FormData();
      formData.append("image", file);
      if (bio !== "undefined" && bio !== undefined && bio !== "") {
        formData.append("bio", bio);
      }
      await sendImage(formData, token , id);
      await getUserData();
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      getUserData();
    } catch (e) {
      console.log(e);
    } 
  }, []);

  const handleCreate = () => {
    navigate(`/Create/${id}`);
  }

  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await getUser(id);
      setUser(response.data);
      setBio(response.data.bio);
      setBioBefore(response.data.bio);
      setCars(response.data.listings);

      if (id === idtoken) {
        setUsersAccount(true);
      } else {
        setUsersAccount(false);
      }
      if (response.data.role === "ADMIN") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateChat = async () => {
    try {
      dispatch(setExpanded(true));
      dispatch(setVisible(true));
      dispatch(setOpenMessages(true));
    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(() => {
    submit();
  }, [file]);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className=" bg-slate-100 h-auto flex justify-center">
      {loading ? (
        <div className="h-screen w-screen flex justify-center items-center"><LoaderIcon /></div>
      ) : (
        <>
          <MenuBar />
          <div className="h-16"></div>
          <div id='profileBox' className="w-full">
            <div id='userDetilsBoxProfile' className="bg-slate-100 flex flex-col" style={{ height: "450px" }}>
              <div className="h-1/3 mt-16 w-full flex">
                <div className=" relative flex justify-center items-center w-36 ml-6 h-full">
                  <div className=" relative h-36 w-36 rounded-full object-cover overflow-hidden" style={{ border: "2px solid #534D56" }}>
                    {user && <img className=" object-cover w-full h-full" src={user.pfp} alt="Profile Picture" />}
                    {usersAccount || Admin ? (
                      <form onSubmit={submit}>
                        <input id="file" className=" cursor-pointer editBackdrop z-50 absolute " onChange={e => setFile(e.target.files[0])} type="file" name="image" accept="image/*" />
                      </form>
                    ) : (
                      <></>
                    )}
                  </div>
                  {usersAccount || Admin ? (
                    <div id='edtIconProfile' className=" flex justify-center items-center h-8 w-8 rounded-full absolute z-50 right-3 bottom-3" style={{backgroundColor: "#1070FF"}}><ModeEditIcon style={{color: "#ffffff"}}/></div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="ml-6 flex items-center w-full h-full text-3xl font-medium">
                  <div className="h-36 w-full">
                    {isAdmin ? (
                      <div style={{fontSize: "13px", height: "25px"}}>Admin</div>
                    ) : (
                      <></>
                    )}
                    {user && <p style={{ color: "#534D56" }}>{user.username}</p>}
                    {usersAccount ? (<div></div>) : (<button className=" msgButton" onClick={handleCreateChat}>Message</button>)}
                  </div>
                </div>
              </div>
              <div className="h-1/2 w-full p-5" style={{ borderBottom: "0.1px solid #1070FF" }}>
                <div className="font-semibold">
                  {changingBio ? (
                    <div className="flex justify-between font-light pl-1 pr-2">
                      <button className="text-blue-500" onClick={submitBefore}>Confirm</button>
                      <button className="text-red-500" onClick={closeSubmit}>Cancel</button>
                    </div>
                  ) : (
                    usersAccount || Admin ? "Edit Info:" : "Info:"
                  )}
                </div>
                <div className="w-full h-full font-light" style={{ wordWrap: "break-word" }}>
                  {usersAccount || Admin ? (
                    <form className=" w-full mt-2" style={{ height: "85%"}}>
                      <textarea maxLength={190} value={bio} name="bio" className=" bg-slate-100 h-full w-full" onChange={(e) => editingBio(e)}></textarea>
                    </form>
                  ) : (
                    <div>{user && user.bio ? bio : "No info provided"}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-slate-100 w-full flex gap-10 flex-col items-center">
              {usersAccount ? (
                <button onClick={handleCreate} className="p-5 text-white rounded-2xl flex justify-center items-center gap-3" style={{width: "90%", backgroundColor: "#1070FF"}}>
                  <div>Create Listing</div> 
                  <DirectionsCarIcon fontSize="medium" />
                </button>
              ) : (null)}
              <p className="text-4xl font-semibold">Listings</p>
              <div className=" relative mt-4 h-2/5 w-full">
                {windowWidth >= 1024 ? (
                  <div className=' w-full flex justify-center'>
                     <div id='monitorBoxLitsings' className="flex flex-wrap justify-center gap-4">
                    {cars.length > 0 ? (
                      cars.map((car) => (
                        <CardCar
                          key={car.id} 
                          brand={car.Brand}
                          model={car.Model}
                          image={car.CarImages[0]} 
                          date={car.Year}
                          power={car.Performance}
                          gearbox={car.TransmitionType}
                          mileage={car.Mileage}
                          fuel={car.Fuel}
                          price={car.Price}
                          id={car._id} 
                        />
                      ))
                    ) : (
                      <div className=" h-full text-center text-2xl">No listings</div>
                    )}
                  </div>
                  </div>
                ) : (
                  <Slider {...settings}>
                    {cars.length > 0 ? (
                      cars.map((car) => (
                        <CardCar
                          key={car.id} 
                          brand={car.Brand}
                          model={car.Model}
                          image={car.CarImages[0]} 
                          date={car.Year}
                          power={car.Performance}
                          gearbox={car.TransmitionType}
                          mileage={car.Mileage}
                          fuel={car.Fuel}
                          price={car.Price}
                          id={car._id}
                        />
                      ))
                    ) : (
                      <div className=" text-center text-2xl">No listings</div>
                    )}
                  </Slider>
                )}
              </div>
            </div>
            <Messages userId={idtoken} receiverId={id} />
          </div>
        </>
      )}
    </div>
  );
}

export default User;
