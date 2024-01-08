/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import {
  FaChalkboardUser as Teacher,
  FaPencil as Edit,
  FaTrash as Delete,
} from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useTeacher } from '../context/TeacherContext.jsx';

function NotificationCard({ teacher }) {
  const { removeTeacher } = useTeacher();

  const navigate = useNavigate();

  return (
    <article className="flex flex-col h-[180px] w-[300px] shadow-md overflow-hidden rounded-2xl">
      <aside className="flex items-center gap-2 p-3 bg-card_grey_hover h-[60%]">
        <Teacher size={30} style={{ flexShrink: '0' }}></Teacher>
        <aside className="flex flex-col overflow-hidden">
          <h3 className="font-bold text-md overflow-hidden text-ellipsis">
            {`${teacher.name} ${teacher.paternalSurname} ${teacher.maternalSurname}`}
          </h3>
          <h4 className="text-sm overflow-hidden text-ellipsis">
            {teacher.emailAddress}
          </h4>
        </aside>
      </aside>
      <section className="flex flex-grow flex-shrink flex-auto content-between items-center gap-2 bg-white w-auto m-2">
        <Button
          variant="primary"
          type="submit"
          className="h-[5vh] bg-yellow border-none hover:bg-yellow_hover"
          onClick={() => navigate(`/teacher/${teacher.id}`)}
        >
          <Edit size={15}></Edit>
        </Button>
        <Button
          variant="primary"
          type="submit"
          className="h-[5vh] bg-red border-none hover:bg-red_hover"
          onClick={() => removeTeacher(teacher.id)}
        >
          <Delete size={15}></Delete>
        </Button>
      </section>
    </article>
  );
}

export default NotificationCard;
