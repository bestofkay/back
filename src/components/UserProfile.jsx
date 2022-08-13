/* eslint-disable padded-blocks */
/* eslint-disable arrow-body-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-undef */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-tabs */
/* eslint-disable indent */
import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Button } from '.';
import { userProfileData } from '../data/dummy';
import avatar from '../data/avatar.jpg';
import './userprof.css';

const UserProfile = () => {
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('username');
		localStorage.removeItem('user_id');
		localStorage.removeItem('email');
		navigate('/login');
	  };

  const username = localStorage.getItem('username');  
  const emailID = localStorage.getItem('email');
  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {username.replace(/"/g, '')} </p>
          
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {emailID.replace(/"/g, '')} </p>
        </div>
      </div>
      <div className="mt-5">
	  <button
		type="button"
		borderRadius="10px"
		onClickCapture={logout}
		className="text-undefined p-3 w-undefined hover:drop-shadow-xl hover:bg-undefined btnNew"
		>
		Logout
		</button>
      </div>
    </div>

  );
};

export default UserProfile;
