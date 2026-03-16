import { useEffect, useRef } from "react";

type InfiniteScrollProps = {
  onReachBottom: () => void;
};

export default function InfiniteScroll({ onReachBottom }: InfiniteScrollProps) {
  const divRef = useRef<HTMLDivElement>(null);
  // guarda la funcion mas reciente a ejecutar
  const onReachBottomRef = useRef(onReachBottom);

  // actualiza la referencia cada vez que la funcion a ejecutar cambie
  useEffect(() => {
    onReachBottomRef.current = onReachBottom;
  }, [onReachBottom]);

  useEffect(() => {
    const element = divRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // utiliza la funcion mas actual si hay un cambio
          onReachBottomRef.current();
        }
      },
      { threshold: 0 },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, []);

  return <div className="w-full h-px" ref={divRef}></div>;
}
