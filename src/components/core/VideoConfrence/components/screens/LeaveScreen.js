import { useNavigate } from "react-router-dom";
import IconBtn from "../../../../common/IconBtn";

export function LeaveScreen({ setIsMeetingLeft }) {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-800 h-screen flex flex-col flex-1 items-center justify-center">
      <h1 className=" text-primaryDark text-4xl">You left the meeting!</h1>
      <div className="mt-12 flex flex-col md:flex-row ">
        <IconBtn onclick={() => navigate('/dashboard/my-profile')} className={' w-fit ml-16'}>
          Dashboard
        </IconBtn>
        <button
          className="`w-full bg-purple-350 text-primaryDark hover:text-primaryDark3 underline px-16 py-3 rounded-lg text-sm"
          onClick={() => {
            setIsMeetingLeft(false);
          }}
        >
          Rejoin the Meeting
        </button>
      </div>
    </div>
  );
}
