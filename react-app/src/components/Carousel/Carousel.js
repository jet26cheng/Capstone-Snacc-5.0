import Carousel from 'react-bootstrap/Carousel';

function SnackCarousel() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://cdn.vox-cdn.com/thumbor/lwidWz0XRqbt7ZYxsHlUdxFLuco=/0x0:4032x3024/1200x675/filters:focal(1694x1190:2338x1834)/cdn.vox-cdn.com/uploads/chorus_image/image/67402757/group_shot_all.0.jpg"
          alt="First slide"
        />
        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://blog.trazy.com/wp-content/uploads/2016/05/snack-thumbnail-scaled.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i0.wp.com/tokyotreatblog.wpcomstaging.com/wp-content/uploads/2021/05/82cbb004f0ae709924aaba8dab5681e44ce040f6_img_0029.jpg?fit=1600%2C1067&ssl=1"
          alt="Third slide"
        />

        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default SnackCarousel;
