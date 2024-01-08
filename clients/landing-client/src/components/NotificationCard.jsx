/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
function NotificationCard({ notification }) {
  return (
    <article className="flex bg-grey_hover w-[70%] h-fit overflow-hidden justify-center items-center gap-5 rounded-lg p-5">
      <img
        src={notification.image.secure_url}
        alt=""
        className="w-[55%] h-[35%]"
      />
      <aside className="flex flex-col items-start w-[60%] gap-4 text-white">
        <h1 className="text-3xl uppercase font-black">{notification.title}</h1>
        <h2 className="text-lg">{notification.description}</h2>
        <Button
          variant="primary"
          className="bg-red border-none hover:bg-red_hover text-lg font-bold p-3"
        >
          Ver más
        </Button>
      </aside>
    </article>
  );
}

export default NotificationCard;
