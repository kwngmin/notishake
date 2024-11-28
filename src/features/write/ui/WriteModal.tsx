import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { postThings } from "../model/post_things";
import { redirect, useRouter } from "next/navigation";
import { THIRTY_SECONDS } from "@/shared/config/time";
import { revalidateTag } from "next/cache";

const initialState = {
  success: false,
  error: false,
};

const WriteModal = ({
  onOpenChange,
}: {
  onOpenChange: (isOpen: boolean) => void;
}) => {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [state, dispatch] = useFormState(postThings, initialState);

  // if (state.success) {
  //   console.log(state);
  //   onOpenChange(false);
  //   redirect("/main");
  // }

  useEffect(() => {
    if (state.success) {
      onOpenChange(false);
      router.push("/main");
      // revalidateTag("notes");
      router.refresh(); // 클라이언트 새로고침
    }
  }, [state.success, onOpenChange, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, THIRTY_SECONDS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal
      isOpen
      size="2xl"
      backdrop="blur"
      placement="top"
      hideCloseButton
      classNames={{
        backdrop: "bg-white/20",
      }}
    >
      <ModalContent>
        <form action={dispatch}>
          <ModalBody className="flex flex-col gap-0 p-0">
            {/* <Input
              name="title"
              size="lg"
              radius="none"
              placeholder="제목을 입력해주세요."
              classNames={{
                input: "border-none focus:!border-0 focus:!ring-0",
                inputWrapper:
                  "bg-white data-[hover=true]:bg-white group-data-[focus=true]:bg-white shadow-none",
              }}
              className="py-1 border-b border-neutral-200"
            /> */}
            <Textarea
              ref={textareaRef}
              name="things"
              size="lg"
              radius="none"
              fullWidth
              placeholder="내용을 입력해주세요."
              variant="flat"
              className="focus:border-none focus:ring-none no-highlight"
              classNames={{
                input:
                  "border-none focus:!border-0 focus:!ring-0 px-6 py-5 rounded-2xl leading-loose !outline-none focus-visible:!outline-none no-highlight",
                inputWrapper:
                  "bg-white data-[hover=true]:bg-white group-data-[focus=true]:bg-white shadow-none p-0 no-highlight",
              }}
              minRows={10}
              maxRows={15}
            />
          </ModalBody>
          <ModalFooter className="border-t border-neutral-200 py-3 px-4">
            <Button
              type="button"
              radius="full"
              size="lg"
              variant="light"
              disableRipple
              onClick={() => onOpenChange(false)}
              className="border-none h-11"
            >
              취소
            </Button>
            <Button
              type="submit"
              radius="full"
              size="lg"
              variant="solid"
              disableRipple
              color="primary"
              className="h-11"
            >
              저장
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default WriteModal;
