/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import {
  FaBell as Notification,
  FaPencil as Edit,
  FaTrash as Delete,
} from 'react-icons/fa6';
import { useNotification } from '../context/NotificationContext.jsx';
import { useNavigate } from 'react-router-dom';

function NotificationCard({ notification }) {
  const { removeNotification } = useNotification();

  const navigate = useNavigate();

  return (
    <article className="flex flex-col h-[180px] w-[300px] shadow-md overflow-hidden rounded-2xl">
      <aside className="flex items-center gap-2 p-3 bg-card_grey_hover h-[60%]">
        <Notification size={30} style={{ flexShrink: '0' }}></Notification>
        <aside className="flex flex-col overflow-hidden">
          <h3 className="font-bold text-md overflow-hidden text-ellipsis">
            {notification.title}
          </h3>
          <h4 className="text-sm overflow-hidden text-ellipsis">
            {String(notification.date).slice(0, 10)}
          </h4>
        </aside>
      </aside>
      <section className="flex flex-grow flex-shrink flex-auto content-between items-center gap-2 bg-white w-auto m-2">
        <Button
          variant="primary"
          type="submit"
          className="h-[5vh] bg-yellow border-none hover:bg-yellow_hover"
          onClick={() => navigate(`/notification/${notification.id}`)}
        >
          <Edit size={15}></Edit>
        </Button>
        <Button
          variant="primary"
          type="submit"
          className="h-[5vh] bg-red border-none hover:bg-red_hover"
          onClick={() => removeNotification(notification.id)}
        >
          <Delete size={15}></Delete>
        </Button>
        <h5 className="bg-grey text-white p-[3%] rounded-md ml-auto">
          {notification.type.name}
        </h5>
      </section>
    </article>
  );
}

export default NotificationCard;
