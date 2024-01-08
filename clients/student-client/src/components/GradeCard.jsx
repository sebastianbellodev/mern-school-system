/* eslint-disable react/prop-types */
import { FaGraduationCap as Cap } from 'react-icons/fa6';

function CourseCard({ grade }) {
  return (
    <article className="flex flex-col h-[180px] w-[300px] shadow-md overflow-hidden rounded-2xl">
      <aside className="flex items-center gap-2 p-3 bg-card_grey_hover h-[60%]">
        <Cap size={30} style={{ flexShrink: '0' }}></Cap>
        <aside className="flex flex-col overflow-hidden">
          <h3 className="font-bold text-md overflow-hidden text-ellipsis">
            {grade.subject.name}
          </h3>
        </aside>
      </aside>
      <section className="flex flex-grow flex-shrink flex-auto content-between items-center gap-2 bg-white w-auto m-2">
        <h5 className="bg-green-400 text-white p-[3%] rounded-md ml-auto">
          {grade.number}
        </h5>
      </section>
    </article>
  );
}

export default CourseCard;
