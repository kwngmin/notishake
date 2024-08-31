const Modal = ({
  variant = "content",
  backgroundWhite = true,
  overflowHidden = true,
  widthFull = true,
  isFlex = true,
  isShadow = true,
  children,
}: {
  variant?: "content" | "content-fit" | "alert" | "confirm" | "side-nav";
  children: React.ReactNode;
  backgroundWhite?: boolean;
  overflowHidden?: boolean;
  widthFull?: boolean;
  isFlex?: boolean;
  isShadow?: boolean;
}) => {
  const getModalType = () => {
    switch (variant) {
      case "side-nav":
        return "modal-side-nav";
      case "content-fit":
        return "modal-content-fit";
      case "content":
        return "modal-content";
      case "alert":
        return "modal-alert";
      case "confirm":
        return "modal-confirm";
      default:
        return "modal-content";
    }
  };

  const backgroundColor = backgroundWhite ? "bg-white" : "bg-transparent";
  const overflow = overflowHidden ? "overflow-hidden" : "overflow-auto";
  const width = widthFull ? "w-full" : "w-fit";
  const flexCol = isFlex ? "flex flex-col" : "";
  const shadow = isShadow ? "shadow-lg" : "";
  const modalStyle = `${backgroundColor} ${shadow} ${overflow} ${width} ${flexCol} ${getModalType()}`;

  return (
    <div
      className={modalStyle}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      {children}
    </div>
  );
};

export default Modal;
