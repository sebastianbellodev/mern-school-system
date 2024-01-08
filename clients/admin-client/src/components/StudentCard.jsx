/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import {
  FaGraduationCap as Student,
  FaPencil as Edit,
  FaTrash as Delete,
} from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../context/StudentContext.jsx';

function NotificationCard({ student }) {
  const { removeStudent } = useStudent();

  const navigate = useNavigate();

  return (
    <article className="flex flex-col h-[180px] w-[300px] shadow-md overflow-hidden rounded-2xl">
      <aside className="flex items-center gap-2 p-3 bg-card_grey_hover h-[60%]">
        <Student size={30} style={{ flexShrink: '0' }}></Student>
        <aside className="flex flex-col overflow-hidden">
          <h3 className="font-bold text-md overflow-hidden text-ellipsis">
            {`${student.name} ${student.paternalSurname} ${student.maternalSurname}`}
          </h3>
          <h4 className="text-sm overflow-hidden text-ellipsis">
            {() => {
              if (student.groups.length === 0) {
                return toString(student.groups[0].number);
              }
              return 'Sin grupo';
            }}
          </h4>
        </aside>
      </aside>
      <section className="flex flex-grow flex-shrink flex-auto content-between items-center gap-2 bg-white w-auto m-2">
        <Button
          variant="primary"
          type="submit"
          className="h-[5vh] bg-yellow border-none hover:bg-yellow_hover"
          onClick={() => navigate(`/student/${student.id}`)}
        >
          <Edit size={15}></Edit>
        </Button>
        <Button
          variant="primary"
          type="submit"
          className="h-[5vh] bg-red border-none hover:bg-red_hover"
          onClick={() => removeStudent(student.id)}
        >
          <Delete size={15}></Delete>
        </Button>
      </section>
    </article>
  );
}

export default NotificationCard;
