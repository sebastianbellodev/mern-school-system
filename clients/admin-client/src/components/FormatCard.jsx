/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import {
  FaFile as File,
  FaPencil as Edit,
  FaTrash as Delete,
} from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useFormat } from '../context/FormatContext.jsx';

function FormatCard({ format }) {
  const { removeFormat } = useFormat();

  const navigate = useNavigate();

  return (
    <article className="flex h-[100px] w-[450px] overflow-hidden rounded-2xl">
      <aside className="flex items-center gap-4 p-3 ">
        <div className="flex justify-center items-center shadow-xl rounded-md  h-[90%] w-[50%]">
          <File size={40} style={{ flexShrink: '0' }}></File>
        </div>
        <aside className="flex flex-col overflow-hidden flex-grow flex-shrink flex-auto">
          <h3 className="font-bold text-md overflow-hidden text-ellipsis">
            {format.title}
          </h3>
        </aside>
      </aside>
      <section className="flex flex-grow flex-shrink flex-auto content-between items-center gap-3 bg-white w-auto m-2">
        <Button
          variant="primary"
          type="submit"
          className="h-[60%] bg-yellow border-none hover:bg-yellow_hover"
          onClick={() => navigate(`/format/${format.id}`)}
        >
          <Edit size={25}></Edit>
        </Button>
        <Button
          variant="primary"
          type="submit"
          className="h-[60%] bg-red border-none hover:bg-red_hover"
          onClick={() => removeFormat(format.id)}
        >
          <Delete size={25}></Delete>
        </Button>
      </section>
    </article>
  );
}

export default FormatCard;
