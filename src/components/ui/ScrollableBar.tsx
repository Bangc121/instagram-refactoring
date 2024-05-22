import "react-multi-carousel/lib/styles.css";

import Carousel from "react-multi-carousel";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 5,
  },
};

export default function ScrollableBar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Carousel containerClass="flex w-full gap-2" responsive={responsive}>
      {children}
    </Carousel>
  );
}
