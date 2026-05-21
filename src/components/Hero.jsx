import { Link } from "react-router";

import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import hero4 from "../assets/hero4.webp";

const carouselImages = [hero1, hero2, hero3, hero4];

const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-base-200 via-base-100 to-primary/10 px-6 py-16 sm:px-10 lg:px-16">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            New arrivals are here
          </div>

          <h1 className="text-4xl font-black tracking-tight text-base-content sm:text-6xl lg:text-7xl">
            We are changing the way people shop.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-base-content/70">
            Discover fresh styles, everyday essentials, and unique finds curated
            to make shopping easier, faster, and more enjoyable.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="products" className="btn btn-primary btn-lg shadow-lg">
              Shop Products
            </Link>

            <Link to="products" className="btn btn-outline btn-lg">
              Explore Collection
            </Link>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className=" h-112 lg:carousel carousel-center p-4 space-x-4 bg-base-100/70 rounded-box ">
            {carouselImages.map((img) => {
              return (
                <div className="carousel-item" key={img}>
                  <div>
                    <img
                      src={img}
                      className="rounded-box h-full w-80 object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
