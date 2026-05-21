const SectionTitle = ({ text }) => {
  return (
    <div className="mb-10 flex items-center justify-between border-b border-base-300 pb-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-primary">
          shop now
        </p>
        <p className="mt-3 text-3xl font-black capitalize tracking-tight sm:text-4xl">
          {text}
        </p>
      </div>
    </div>
  );
};
export default SectionTitle;
