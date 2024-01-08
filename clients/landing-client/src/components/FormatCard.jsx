/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import { FaFile as File } from 'react-icons/fa6';

function FormatCard({ format }) {
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
          className="h-[60%] bg-grey border-none hover:bg-grey_hover"
          onClick={() => window.open(format.file.secure_url, '_blank')}
        >
          Abrir
        </Button>
      </section>
    </article>
  );
}

export default FormatCard;
