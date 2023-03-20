import { datas } from './Data';
import Link from 'next/link';

const SidebarData = ({ toggle }) => {
  return (
    <div>
      {datas.map((link, index) => {
        return (
          <Link
            key={index}
            href={link.path}
            className={`${
              toggle ? 'last:w-[3.6rem]' : 'last:w-[17rem]'
            } sidebar last:absolute left-4 bottom-4`}
          >
            <div className="mr-8 text-[1.7rem] text-brown">{link.icon}</div>
            <div
              className={`${
                toggle ? 'opacity-0' : ''
              } text-[1rem] text-brown whitespace-pre`}
            >
              {link.text}
            </div>
          </Link>
        );
      })}
    </div>
  );
  // return (
  //   <>
  //     <Links
  //       href="/BabyProfile"
  //       className={`${
  //         toggle ? 'last:w-[3.6rem]' : 'last:w-[17rem]'
  //       } sidebar last:absolute left-4 bottom-4`}
  //     >
  //       <div className="mr-8 text-[1.7rem] text-brown">
  //         <RxDashboard />
  //       </div>
  //       <div
  //         className={`${
  //           toggle ? 'opacity-0' : ''
  //         } text-[1rem] text-brown whitespace-pre`}
  //       >
  //         Baby Profile
  //       </div>
  //     </Links>
  //     <Links
  //       href="/BabyActivity"
  //       className={`${
  //         toggle ? 'last:w-[3.6rem]' : 'last:w-[17rem]'
  //       } sidebar last:absolute left-4 bottom-4`}
  //     >
  //       <div className="mr-8 text-[1.7rem] text-brown">
  //         <RxDashboard />
  //       </div>
  //       <div
  //         className={`${
  //           toggle ? 'opacity-0' : ''
  //         } text-[1rem] text-brown whitespace-pre`}
  //       >
  //         Past Activity
  //       </div>
  //     </Links>
  //     <Links
  //       href="/BabyDailies"
  //       className={`${
  //         toggle ? 'last:w-[3.6rem]' : 'last:w-[17rem]'
  //       } sidebar last:absolute left-4 bottom-4`}
  //     >
  //       <div className="mr-8 text-[1.7rem] text-brown">
  //         <RxDashboard />
  //       </div>
  //       <div
  //         className={`${
  //           toggle ? 'opacity-0' : ''
  //         } text-[1rem] text-brown whitespace-pre`}
  //       >
  //         Daily Activity
  //       </div>
  //     </Links>
  //     <Links
  //       href="/GrowthChart"
  //       className={`${
  //         toggle ? 'last:w-[3.6rem]' : 'last:w-[17rem]'
  //       } sidebar last:absolute left-4 bottom-4`}
  //     >
  //       <div className="mr-8 text-[1.7rem] text-brown">
  //         <RxDashboard />
  //       </div>
  //       <div
  //         className={`${
  //           toggle ? 'opacity-0' : ''
  //         } text-[1rem] text-brown whitespace-pre`}
  //       >
  //         Growth Chart
  //       </div>
  //     </Links>
  //     <div
  //       className={`${
  //         toggle ? 'w-[3.6rem]' : 'w-[17rem]'
  //       } sidebar absolute left-4 bottom-4`}
  //     >
  //       <div className="mr-8 text-[1.7rem] text-brown">
  //         <RxDashboard />
  //       </div>
  //       <div
  //         className={`${
  //           toggle ? 'opacity-0' : ''
  //         } text-[1rem] text-brown whitespace-pre`}
  //       >
  //         Switch Baby
  //       </div>
  //     </div>
  //   </>
  // );
};

export default SidebarData;
