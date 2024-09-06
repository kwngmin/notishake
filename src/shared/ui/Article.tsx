"use client";
import { useState } from "react";
// import { SimpleNote } from "@/model/note";
// import RoundIcon from "./ui/icons/RoundIcon";
// import InputText from "./InputText";
// import Seperator from "./ui/Seperator";
// import SmallTextIconButton from "./SmallTextIconButton";
// import ModalPortal from "./ui/ModalPortal";
// import PostModal from "./PostModal";
// import CommentsDetail from "./NoteDetail";
// import translateDate from "@/util/translateDate";
import { useRouter } from "next/navigation";
import Dot from "./Dot";
import { getDate } from "../utils/date";
import moment from "moment";
import "moment/locale/ko";

type Props = {
  note: any;
};

const buttons = [
  {
    icon: "move_to_inbox",
    text: "구독",
  },
  {
    icon: "block",
    text: "차단",
  },
];

export default function Note({ note }: Props) {
  const {
    id,
    title,
    things,
    username,
    createdAt,
    updatedAt,
    userId,
    // likes,
    // comments,
    // createdAt,
    // comments,
    // comment,
    // commentAt,
  } = note;
  const [openInput, setOpenInput] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  //   const handleClick = () => {
  //     router.push(`/notes/${id}`);
  //   };
  moment().format("ko");

  // 연속된 줄바꿈을 하나로 치환
  const sanitizedText = (text: string) => {
    return text.replace(/(\r\n|\n|\r){2,}/g, "\n");
  };

  return (
    <article className="border-b last:border-none border-neutral-200 py-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="leading-snug font-semibold text-black/80 grow break-keep flex items-center gap-2 text-sm">
          {username ?? "이름 없는 친구"}
          <div className="flex items-center gap-1 text-slate-400 text-sm select-none tracking-tight font-normal">
            <span className="material-symbols-rounded flex size-5 items-center justify-center text-xl font-medium">
              edit
            </span>
            메모
          </div>
        </h2>
        <span className="material-symbols-rounded flex size-5 items-center justify-center text-xl">
          more_horiz
        </span>
        {/* <div className="flex items-center gap-6 px-2">
          <div className="flex items-center gap-3">
            {buttons.map((button) => (
              <button
                key={button.icon}
                className="h-8 flex items-center gap-1 font-medium rounded text-slate-400 text-sm select-none tracking-tight"
              >
                <span
                  className={`material-symbols-rounded flex size-5 items-center justify-center  ${
                    button.icon === "move_to_inbox"
                      ? "text-xl"
                      : "text-lg scale-95"
                  }`}
                >
                  {button.icon}
                </span>
                {button.text}
              </button>
            ))}
          </div>
        </div> */}
      </div>
      <div>
        {sanitizedText(things)
          .split(/\r\n|\n/)
          .map((line: string, index: number) => (
            <p key={index} className="leading-relaxed break-keep lg:pr-9">
              {line}
              <br />
            </p>
          ))}
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-4">
          {/* <span className="material-symbols-outlined flex size-5 items-center justify-center text-xl scale-125 font-light">
            bookmark
          </span> */}
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined material-fill flex size-5 items-center justify-center text-xl text-neutral-300">
              favorite
            </span>
            {/* <RoundIcon name="favorite" /> */}
            <span
              className="font-semibold text-black/70 text-sm" //
            >
              12
              {/* {likes} */}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {/* <span className="material-symbols-rounded flex size-5 items-center justify-center text-xl text-black/70">
              subdirectory_arrow_right
            </span> */}
            <span className=" text-black/70 text-sm text-neutral-500 border border-neutral-300 rounded-full px-3 py-0.5">
              댓글
              <span className="font-semibold ml-1">12</span>개
            </span>
          </div>
          {/* <div className="flex items-center gap-1">
            <span className="material-symbols-rounded flex size-5 items-center justify-center text-xl text-black/70">
              chat_bubble
            </span>
            <span className="font-semibold text-black/70 text-sm">12</span>
          </div> */}
        </div>
        <time className="text-neutral-400 text-sm flex items-center tracking-tight font-normal">
          {moment(createdAt).locale("ko").fromNow()}
          {/* <Dot />
          {moment(createdAt).format("L")} */}
        </time>
      </div>

      {/* <div className="flex flex-col gap-1">
        {comment !== null && (
          <div className="flex gap-2">
            <span className="text-slate-500 font-medium shrink-0 md:text-sm">
              {translateDate(commentAt)}
            </span>
            <span className="text-ellipsis overflow-hidden whitespace-nowrap md:text-sm">
              {comment.comment}
            </span>
          </div>
        )}
        <div className="flex gap-1 items-center">
          <span className="flex items-center w-fit py-2 pr-2 text-slate-600 select-none font-medium text-sm">
            댓글
            <span className="font-medium text-slate-600 text-sm ml-1">
              {comments}
            </span>
          </span>
          {comments !== 0 && (
            <>
              <Seperator />
              <SmallTextIconButton
                func={() => setOpenModal(true)}
                icon="comment"
                // icon='forum'
                // icon='tooltip'
                text="전체 보기"
              />
            </>
          )}
          <Seperator />
          {!openInput ? (
            <SmallTextIconButton
              func={() => setOpenInput(true)}
              icon="sentiment_satisfied"
              text="댓글 쓰기"
            />
          ) : (
            <SmallTextIconButton
              func={() => setOpenInput(false)}
              icon="mood_bad"
              text="입력상자 감추기"
            />
          )}
          <span className="flex gap-2"></span>
        </div>
      </div> */}
      {/* {openInput && <InputText openInput={openInput} />} */}
      {/* {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <CommentsDetail note={note} onClose={() => setOpenModal(false)} />
          </PostModal>
        </ModalPortal>
      )} */}
    </article>
  );
}
