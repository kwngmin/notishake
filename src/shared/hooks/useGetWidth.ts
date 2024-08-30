import { useEffect, useState } from "react";

export const useGetWindowWidth = () => {
  // 가로폭을 상태로 관리
  const [width, setWidth] = useState<number>(0);

  // 가로폭을 구하는 함수
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때와 리사이즈될 때 가로폭 업데이트
    handleResize(); // 초기 가로폭 설정
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
};
