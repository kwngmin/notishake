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

const WriteModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  //   const [state, dispatch] = useFormState(postThings, null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 30);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      // onOpenChange={onOpenChange}
      size="2xl"
      backdrop="blur"
      placement="top"
      hideCloseButton
      classNames={{
        backdrop: "bg-white/20",
      }}
    >
      <ModalContent>
        <form>
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
          className="py-4 border-b border-neutral-200"
        /> */}
            <Textarea
              ref={textareaRef}
              name="content"
              size="lg"
              radius="none"
              fullWidth
              placeholder="내용을 입력해주세요."
              variant="flat"
              className="focus:border-none focus:ring-none no-highlight"
              classNames={{
                input:
                  "border-none focus:!border-0 focus:!ring-0 p-6 rounded-2xl leading-loose !outline-none focus-visible:!outline-none no-highlight",
                inputWrapper:
                  "bg-white data-[hover=true]:bg-white group-data-[focus=true]:bg-white shadow-none p-0 no-highlight",
              }}
              minRows={10}
              maxRows={15}
            />
          </ModalBody>
          <ModalFooter className="border-t border-neutral-200">
            <Button
              type="button"
              radius="full"
              size="lg"
              variant="faded"
              disableRipple
              onClick={onOpenChange}
              className="border-none"
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
              // className="font-medium border-none"
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
