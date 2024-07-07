import React, { useState, useEffect, useRef } from 'react';
import MessageIcon from "../SVG/MessageIcon";
import "../CustomCSS/Message.css";
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../API/axios';
import { getIdToken } from '../functions/getTokenPayload';
import { checkToken, getChats } from '../API/API';
import SendMessageIcon from '../SVG/SendMesssageIcon';
import GoBackIcon from '../SVG/GoBackIcon';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setClosing, setExpanded, setOpenMessages, setVisible } from '../Redux/Slices/MessageExpandedSlice';
import DeleteIcon from '@mui/icons-material/Delete';

const Messages = ({ userId , receiverId}) => {
   const [userProfiles, setUserProfiles] = useState([]);
   const [hasNewMessages, setHasNewMessages] = useState(false);
   const [latestMessages , setLatestMessages] = useState([]);
   const [message, setMessage] = useState('');
   const [messages, setMessages] = useState([]);
   const [userLogged, setUserLogged] = useState(false);
   const [receiver, setReceiver] = useState(null);
   const [isScreenLarge, setIsScreenLarge] = useState(window.matchMedia("(min-width: 1024px)").matches);

   const open = useSelector((state) => state.messageopen.expanded);
   const contentVisible = useSelector((state) => state.messageopen.contentVisible);
   const closing = useSelector((state) => state.messageopen.closing);
   const openMessages = useSelector((state) => state.messageopen.openMessages);

   const navigate = useNavigate();

   const dispatch = useDispatch();

   const bottomRef = useRef(null);

   useEffect(() => {
      if (receiverId) {
         setReceiver(receiverId);
         fetchMessages(receiverId);
         dispatch(setOpenMessages(false));
         dispatch(setExpanded(false));
      }
   }, [receiverId]);

   useEffect(() => {
      const mediaQuery = window.matchMedia("(min-width: 1024px)");
      const handleMediaChange = () => setIsScreenLarge(mediaQuery.matches);
  
      // Initial check
      handleMediaChange();
  
      // Add listener
      mediaQuery.addListener(handleMediaChange);
  
      // Clean up listener on unmount
      return () => {
        mediaQuery.removeListener(handleMediaChange);
      };
    }, []);
  
    useEffect(() => {
      if (!isScreenLarge) {
        if (open) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
        return () => {
          document.body.style.overflow = '';
        };
      }
    }, [open, isScreenLarge]);

   const token = localStorage.getItem('authorization');

   const getDetails = async () => {
      if (token) {
         try {
            const idtoken = getIdToken();
            let chats = await getChats(idtoken, token);
            checkFunc(idtoken, token);
            const userProfiles = chats.data.flatMap(chat => chat.users);
            const latestMessage = chats.data.flatMap(mes => mes.latestMessage)
            setUserProfiles(userProfiles);
            setLatestMessages(latestMessage);
         } catch (e) {
            console.error('Error:', e);
         }
      }
   }

   useEffect(() => {
      getDetails();
   }, []);

   useEffect(() => {
      if(!userLogged) {
         setHasNewMessages(true);
      } else {
         setHasNewMessages(false);
      }
   }, [userLogged]);


   useEffect(() => {
      if (openMessages && bottomRef.current) {
         bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      }
   }, [openMessages, messages]);

   const checkFunc = async (idtoken , token) => {
      const user = await checkToken(idtoken, token);
      setUserLogged(true);
   }

   const fetchMessages = async (otherUserId) => {
      try {
         const response = await axiosInstance.get(`/messages/${userId}/${otherUserId}`, {
            headers: {
               'authorization': `Bearer ${token}`,
            },
         });
         setMessages(response.data);
      } catch (error) {
         console.error('Error fetching messages:', error);
      }
   };

   const handleLogin = () => {
      navigate("/Login")
      dispatch(setOpenMessages(false));
      dispatch(setExpanded(false));
   }

   const sendMessage = async () => {
      if (message.trim() === '') return;

      try {
         const response = await axiosInstance.post('/messages/send', {
            sender: userId,
            receiver: receiver,
            message: message.trim(),
         }, {
            headers: {
               'authorization': `Bearer ${token}`,
               'Content-Type': 'application/json'
            }
         });

         setMessages([...messages, {
            sender: userId,
            receiver: receiver,
            message: message.trim(),
            timestamp: new Date(),
         }]);
         setMessage('');
      } catch (error) {
         console.error('Error sending message:', error);
      }
   };

   const handleCircleClick = () => {
      dispatch(setExpanded(true));
      setHasNewMessages(false);
      setTimeout(() => {
         dispatch(setVisible(true));
      }, 1000);
   };

   const handleToggleClick = (event) => {
      dispatch(setVisible(false));
      dispatch(setClosing(true));
      setTimeout(() => {
         dispatch(setClosing(false));
         dispatch(setExpanded(false));
         dispatch(setOpenMessages(false));
      }, 500);
   };

   const openChatWithUser = async (userId) => {
      setReceiver(userId);
      await fetchMessages(userId);
      handleCircleClick(); 
      dispatch(setOpenMessages(true));
   };


   return (
      <div className={`messageCircle ${open ? 'expanded' : ''} ${closing ? 'closing' : ''} z-50 fixed bottom-3 right-3 rounded-full flex justify-center items-center`}  onClick={handleCircleClick}>
         {!open && !closing && (
            <>
               <MessageIcon />
               {hasNewMessages && <div className="redDot"></div>}
            </>
         )}
         <div className={`contents ${open ? 'fadeIn' : 'fadeOut'}`}>
            {contentVisible && (
               <>
                  <div className=' h-full w-full'>
                     <button className="w-full rounded-t-3xl" style={{ height: "6%", backgroundColor: "rgb(155, 173, 255)"}} onClick={handleToggleClick}>
                        <CloseIcon fontSize="large" style={{ color: "#ffffff" }} />
                     </button>
                     <div className='w-full flex justify-center flex-col' style={{ height: "94%" }}>
                      {userLogged ? (
                        openMessages ? (
                         <div className=' w-full h-full relative overflow-y-auto overflow-x-hidden'>
                          <div className=' topBackBox h-11 w-full absolute flex items-center pl-1'>
                           <button className=' flex items-center justify-center' onClick={() => dispatch(setOpenMessages(false))}><GoBackIcon />Go back </button>
                          </div>
                           <div className=' cursor-default h-full w-full flex flex-col justify-end box-border'>
                              <div className=' overflow-y-auto flex-col p-2 mt-12'>
                              {messages.map((msg, index) => (
                                <div className="messageContainer" key={index}>
                                 <div className={`message ${msg.sender === userId ? 'sent' : 'received'}`}>
                                  <div className='usertext'><strong>{msg.sender === userId ? 'You' : 'Them'}</strong></div>
                                   {msg.message}
                                 </div>
                                </div>
                              ))}
                              <div ref={bottomRef}></div>
                              </div>
                            <div className='messageBox flex items-end rounded-b-xl'>
                            <input 
                              placeholder='message'
                              className=' messageBox h-12 w-full rounded-bl-2xl p-3 overflow-hidden'
                              type="text" 
                              value={message} 
                              onChange={(e) => setMessage(e.target.value)} 
                            />
                            <button className=' messageBox h-12 w-12 rounded-br-xl flex justify-center items-center' onClick={sendMessage}><SendMessageIcon /></button>
                            </div>
                           </div>
                         </div>
                     ) : (
                        <>
                         <div className=' cursor-default h-12 w-full text-white flex justify-center items-center text-3xl mb-2'>Messages</div>
                         <div id='userChatDisplayBox' className=' cursor-default h-full flex flex-col gap-1'>
                         {userProfiles.map((profile , index) => (
                          <div className=' gap-2 w-full flex items-center flex-col' key={profile._id}>
                           <div className=' messageBoxes h-20 flex relative'>
                             <div className='h-full w-1/4 flex justify-center items-center'>
                              <div className=' h-14 w-14 rounded-full flex overflow-hidden justify-center items-center'>
                               <img className='object-cover h-full w-full' src={profile.pfpURL} alt={`${profile.username}'s profile picture`} />
                              </div>
                             </div>
                            <div className='h-full w-3/4 flex flex-col text-xl overflow-hidden'>
                            <div className=' pt-2' style={{width: "85%", height: "60%"}}>
                             {profile.username}
                            </div>
                            <div className=' flex' style={{height: "40%", fontSize: "15px"}}>
                             <div className=' pr-1 font-bold pb-1'>Last: </div> {latestMessages[index]?.message || "No messages yet"}
                            </div>
                            </div>
                            <div className='z-30 w-full h-full absolute'>
                              <button className=' w-1/4 h-full' onClick={() => navigate(`/users/${profile.profileUser}`)}></button>
                              <button className=' w-3/4 h-full' onClick={() => openChatWithUser(profile.profileUser)}></button>
                            </div>
                           </div>
                          </div>
                         ))}
                         </div>
                        </>
                     )
                    ) : (
                      <div className='h-full w-full justify-center items-center flex z-50'>
                       <div onClick={handleLogin} className='btn-message z-50'>
                        <span >Log in</span>
                       </div>
                      </div>
                    )}
                   </div>
                  </div>
               </>
            )}
         </div>
      </div>
   );
}

export default Messages;
