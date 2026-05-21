const About = () => {
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-4xl rounded-3xl border border-base-300 bg-base-200/70 px-6 py-16 text-center shadow-sm sm:px-10">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-x-6">
          <h1 className="text-4xl font-black leading-none tracking-tight sm:text-6xl">
            We love
          </h1>

          <div className="rounded-3xl bg-primary px-6 py-3 shadow-xl transition duration-300 hover:scale-105 sm:px-8">
            <span className="text-4xl font-black tracking-widest text-primary-content sm:text-6xl">
              comfy
            </span>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-base-content/70">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic veniam
          odit, officiis eos mollitia alias, doloremque, aspernatur ratione
          asperiores voluptas labore minus dolores reprehenderit corporis quos.
          Assumenda molestias harum dignissimos?
        </p>
      </div>
    </section>
  );
};
export default About;
