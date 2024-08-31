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

type Props = {
  note: any;
};

export default function Article({ note }: Props) {
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
  console.log(note);
  return (
    <article className="py-8 border-t border-gray-300">
      <h2
        // onClick={handleClick}
        className="leading-snug font-semibold text-black/80 grow break-keep text-lg mb-0.5"
      >
        {username ?? "이름 없는 친구"}
      </h2>
      <p className="text-neutral-600 break-keep">{things}</p>
      {/* <div className="flex justify-between items-center py-0.5">
        <time className="text-black/60 text-sm flex items-center">
          <span className="mr-1">
            {createdAt == updatedAt ? "작성일 :" : "최근 수정일 :"}
          </span>
          {getDate(createdAt.toLocaleString())}
          <Dot />
        </time>
      </div> */}

      <div className="flex justify-between items-center my-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {/* <RoundIcon name="favorite" /> */}
            <span
              className="font-semibold text-black/70 text-sm" //
            >
              12
              {/* {likes} */}
            </span>
          </div>
          <span className="bg-slate-100 active:bg-slate-200 px-2 h-7 flex items-center font-medium rounded text-slate-600 text-xs select-none cursor-pointer">
            구독하기
          </span>
          <span className="bg-slate-100 active:bg-slate-200 px-2 h-7 flex items-center font-medium rounded text-slate-600 text-xs select-none cursor-pointer">
            차단하기
          </span>
        </div>
        <div className="flex items-center gap-6 px-2">
          {/* <RoundIcon name="bookmark" /> */}
        </div>
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
