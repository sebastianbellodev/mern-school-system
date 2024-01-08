/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';

function NotificationSlider({ notification }) {
  const [index, setIndex] = useState(0);
  console.log(notification);
  return (
    <main className="h-[100%]">
      <section className="absolute top-[50%] transform translate-x-[50%] left-[32px] text-5xl text-grey_hover z-50 cursor-pointer"></section>
      <section className="absolute top-[50%] transform translate-x-[50%] left-[32px] text-5xl text-grey_hover z-50 cursor-pointer"></section>
      <section
        className="w-screen h-screen border-8 bg-center bg-cover"
        style={{
          backgroundImage: `url(${notification[index].image.secure_url})`,
        }}
      ></section>
    </main>
  );
}

export default NotificationSlider;
